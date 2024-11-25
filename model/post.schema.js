import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    username: {type: String, required: true},
    image: [{type: String}],
    caption: String,
    location: String,
    like: Number,
    date: {type: Date, default: Date.now},
});

const postModel = mongoose.model("Posts", postSchema);
export default postModel;