// const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];
let id = 1;

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());
// si vamos a trabajar con req.body no nos podemos olvidar del middleware de express.json();
// TODO: your code to handle requests

server.post('/posts', (req, res)=>{
    let { author, title, contents } = req.body;
    if (!author || !title || !contents){
        return res.status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    const post = {
        author,
        title,
        contents,
        id: id++
    }
    posts.push(post);
    res.status(200).json(post);
    res.send("done");
});

server.post('/posts/author/:author', (req, res)=>{
    let { author } = req.params;
    let { title, contents } = req.body;
    if (!author || !title || !contents){
        return res.status(STATUS_USER_ERROR)
        .json({error: "No se recibieron los parámetros necesarios para crear el Post"})
    }

    const post = {
        author,
        title,
        contents,
        id: id++
    }

    posts.push(post);
    res.status(200).json(post);
    res.send("done");
});

server.get('/posts', (req, res)=>{
    let { term } = req.query; 
    if (term){
        let term_posts = posts.filter ((post) => post.title.includes(term) || post.contents.includes(term));
        return res.json(term_posts);
    }
    res.json(posts);
});

server.get('/posts/:author', (req, res)=>{
    let { author } = req.params;  
    let posts_author = posts.filter((post) => post.author === author);
    if (posts_author.length > 0){
        res.json(posts_author);
    } else {
        return res.status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post del autor indicado"});
    }
});

server.get('/posts/:author/:title', (req, res)=>{
    let { author, title } = req.params;
    let posts_author = posts.filter((post) => post.author === author && post.title === title);
    if (posts_author.length > 0){
        res.json(posts_author);
    } else {
        return res.status(STATUS_USER_ERROR)
        .json({error: "No existe ningun post del autor indicado"});
    }
});

module.exports = { posts, server };
