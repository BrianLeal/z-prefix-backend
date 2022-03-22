const express = require("express");
const morgan = require("morgan");
const app = express();


const { addUser, addPost, getSpecificItem,
    updateItem, deleteItem, getAll } = require("./database/controllers");

//middleware
app.use(morgan("tiny"));
app.use(express.json());

//NEED TO MAKE UPDATES ON PATCH & DELETE

//CREATE (POST)

app.post("/users", (req, res) => {
    const firstNameToAdd = req.body.first_name ? req.body.first_name : '';
    const lastNameToAdd = req.body.last_name ? req.body.last_name : '';
    const userName = req.body.username ? req.body.username : '';
    const hashedPassword = req.body.password_encrypted ? req.body.password_encrypted : '';

    addUser(firstNameToAdd, lastNameToAdd, userName, hashedPassword)
        .then((data) => 
            res.status(200).json({message: `The following data was posted successfully`})
        )
        .catch((err) => 
            res.status(422).json({message: `Failure to post data. ERROR: ${err}`})
        )   
})

app.post("/posts", (req, res) => {
    const u_id = req.body.user_id ? req.body.user_id : '';
    const postTitle = req.body.title ? req.body.title : '';
    const postContent = req.body.content ? req.body.content : '';
    
    addPost(u_id, postTitle, postContent)
        .then((data) => 
            res.status(200).json({message: `The following data was posted successfully`})
            )
        .catch((err) => 
            res.status(422).json({message: `Failure to post data. ERROR: ${err}`})
        )
})

// READ (GET)

app.get("/:table/:id", (req, res) => {
    getSpecificItem(req.params.table, req.params.id)
        .then((data) => res.send(data))
        .catch((err) => 
            res.status(404).json({message: `${req.params.table} does not exist.`})
        )
})

//UPDATE (PUT, PATCH)

app.patch("/:table/:id", (req, res) => {
    updateItem(req.params.table, req.params.id, req.query)
        .then((data) => 
            res.status(200).json({message: `Blog Post: ${req.params.id} has been updated successfully`})
        )
        .catch((err) =>
            res.status(404).json({message: `${req.params.table} does not exist.`})
        )
})

//DELETE
app.delete("/:table/:id", (req, res) => {
    deleteItem(req.params.table, req.params.id)
    .then((data) => 
        res.status(200).json({message: `Blog Post: ${req.params.id} has been deleted successfully`})
    )
    .catch((err) =>
        res.status(404).json({message: `${req.params.table} does not exist.`})
    )   
})

// LIST (GET)

app.get("/:table", (req, res) => {
    getAll(req.params.table)
        .then((data) => res.send(data))
        .catch((err) =>
            res.status(404).json({ message: `${req.params.table} does not exist.` })
        );
});

module.exports = app;