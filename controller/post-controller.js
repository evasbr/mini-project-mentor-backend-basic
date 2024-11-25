import mongoose from 'mongoose';
import postModel from '../model/post.schema.js';

async function createPost (req, res){
    try {
        const newPost = req.body;

        // Memeriksa apakah username ada dan tidak kosong
        if (!newPost.username || newPost.username.trim() === "") {
            throw new Error("Username harus ada dan tidak boleh kosong.")
        }

        // Memeriksa apakah image adalah array dan memiliki minimal 1 elemen
        if (!Array.isArray(newPost.image) || newPost.image.length < 1) {
            throw new Error("Image harus dikirim dam bentuk array dan memiliki minimal 1 elemen")
        }

        let like = 0;
        const newerPost = {...newPost, like};
        const post = new postModel(newerPost);
        await post.save();

        return res.status(201).json({
            message : "Postingan berhasil dibuat",
            post: newerPost
        });
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: error.message
        })
    }
}

async function readAllPost(req, res){
    try {
        const posts = await postModel.find();

        if(posts.length > 0){
            res.status(200).json({
                data: posts
            });
        } else {
            res.status(404).json({
                message: "Tidak ada postingan"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Gagal memuat post"
        });
    }
}

async function likeAPost(req, res){
    try {
        let postId = req.params.id;

        let post = await postModel.findOne({_id: postId});

        if(post !== null){
            await postModel.updateOne({_id: postId}, {$inc: {like: 1}});
            return res.status(200).json({
                message: "Postingan berhasil dilike",
                post
            });
        } else {
            throw new Error("Postingan tidak ditemukan");
        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        });
    }
    
}

async function editAPost(req, res){
    try {
        const postId = req.params.id;
        const { caption, image, location } = req.body;

        // Mempersiapkan objek pembaruan
        const updateData = {};

        if (caption !== undefined) {
            updateData.caption = caption;
        }
        if (image !== undefined) {
            updateData.image = image;
        }
        if (location !== undefined) {
            updateData.location = location;
        }

        // Menggunakan findByIdAndUpdate untuk memperbarui postingan
        const updatedPost = await postModel.findByIdAndUpdate(postId, updateData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({
                message: "Postingan yang ingin diperbarui tidak ditemukan"
            });
        }

        return res.status(200).json({
            message: "Postingan berhasil diperbarui",
            post: updatedPost
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

async function deleteAPost(req, res){
    try {
        let postId = req.params.id;
        let deletedPost = await postModel.findByIdAndDelete(postId);

        if(!deletedPost){
            return res.status(404).json({
                message: "Postingan yang ingin dihapus tidak ditemukan"
            })
        }

        return res.status(200).json({
            message: "Postingan berhasil dihapus"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message
        })
    }
}

export {createPost, readAllPost, likeAPost, editAPost, deleteAPost};