import e from 'express';
import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import router from '../routes/posts.js';

export const getPosts = async (req, res) => {
    const { page } = req.query;

    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT;
        const total = await PostMessage.countDocuments({});

        const posts = await PostMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await PostMessage.findById(id);

        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getPostsBySearch = async (req, res) => {
    const { searchQuery, tags } = req.query;

    try {
        const title = new RegExp(searchQuery, 'i'); //i = ignore letter casing (test = Test = TEST)

        const posts = await PostMessage.find({ $or: [{ title }, { tags: { $in: tags.split(",") } }] });

        res.json({ data: posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage({...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post With That ID'); 

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post With That ID'); 

    await PostMessage.findByIdAndDelete(_id);

    res.json({ message: 'Post Successfully Deleted' });
}

export const likePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!req.userId) return res.json({ message: "Unauthenticated" });

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No Post With That ID'); 

    const post = await PostMessage.findById(_id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

export const commentPost = async (req, res) => {
    const { id: _id } = req.params;
    const { comment } = req.body;

    //Getting post from db
    const post = await PostMessage.findById(_id);

    //Adding comment to post
    post.comments.push(comment);

    //Updating the db so the new post has that new comment and storing in updatedPost
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, { new: true });

    res.json(updatedPost);
}

