import {posts} from '../posts.js';

function createPost(req, res){
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

        let id = posts.length;
        let like = 0;
        const newerPost = {id, ...newPost, like};
        posts.push(newerPost);

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

function readAllPost(req, res){
    try {
        if(posts.length > 0){
            res.status(200).json({
                data: posts
            })
        } else {
            res.status(204).json({
                message: "Tidak ada postingan",
                post : posts
            })
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Gagal memuat post"
        });
    }
}

function likeAPost(req, res){
    try {
        let id = req.params.id;

        let index = posts.findIndex(post => post.id==id);
        console.log(id);
        if(index != -1){
            posts[index].like++;
            return res.status(200).json({
                message: "Postingan berhasil dilike",
                post: posts[index]
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

function editAPost(req, res){
    try {
        let {caption, image, location} = req.body;
        let id = req.params.id;

        let index = posts.findIndex(post => post.id==id);

        if(index != -1){
            if(caption != undefined){
                posts[index].caption = caption;
            }
            if(image != undefined){
                posts[index].image = image;
            }
            if(caption != undefined){
                posts[index].location = location;
            }

            return res.status(200).json({
                message: "Post berhasil diperbarui",
                post: posts[index]
            });
        } else {
            throw new Error("Postingan tidak ditemukan. Gagal mengedit post");
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

function deleteAPost(req, res){
    try {
        let id = req.params.id;
        let index = posts.findIndex(post => post.id == id);

        if(index != -1){
            posts.splice(index, 1);
            return res.status(200).json({
                message: "Postingan berhasil dihapus"
            })
        } else {
            throw new Error("Postingan tidak ditemukan. Gagal menghapus post");
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

export {createPost, readAllPost, likeAPost, editAPost, deleteAPost};