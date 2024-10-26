import express from 'express';
import {createPost, readAllPost, likeAPost, editAPost, deleteAPost} from '../controller/post-controller.js';

const Router = express.Router();

Router.post('/post/create', createPost);
Router.get('/post/all', readAllPost);
Router.put('/post/:id/like', likeAPost);
Router.put('/post/:id/edit', editAPost);
Router.delete('/post/:id/delete', deleteAPost);

export {Router};