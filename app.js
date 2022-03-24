const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require('cors');

const { addUser, addPost, getUser, getSpecificItem,
    updateItem, deleteItem, getAll, getPasswordHash } = require("./database/controllers");

//middleware
app.use(morgan("tiny"));
app.use(express.json());


//HASHING

const { hash, compare } = require("bcrypt");
const saltRounds = 12;

//CORS

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });

//EVERYTHING WORKING BUT PATCH

//CREATE (POST)

app.post("/users", function(req, res) {
    let {first_name, last_name, username, password} = req.body;
    
    if(!first_name) res.status(401).send('first name required for signup')
    if(!last_name) res.status(401).send('last name required for signup')
    if(!username) res.status(401).send('username required for signup')
    if(!password) res.status(401).send('password required for signup')
 
      else {
        hash(password, saltRounds).then(hashedPassword=>{
          addUser(first_name, last_name, username, hashedPassword)
          .then(data=> res.status(201).json("USER CREATED SUCCESFULLY"))
          .catch(err => rescape.status(500).json(err));
          });
        }
    });
    
    // app.post("/login",  (req,res)=> {
    //     res.status(200).send({taco: "bell"})
    // })
    //login as a user- validates users credentials
    app.post("/login", (req,res)=> {
      //compare password to passwordHash
      let {username, password} = req.body;
      if (!username) res.status(401).send("username required for login");
      else if (!password) res.status(401).send("password required for login");
      else {
        getPasswordHash(username)
          .then((hashedPassword) => {
    
            compare(password, hashedPassword)
              .then((isMatch) => {
                
                if (isMatch){
                    getUser(username)
                    .then(data=> {
                        res.status(202).send(data[0]);
                    })

                } 
                else
                  res.status(401).json("incorrect username or password supplied");
              })
              .catch((err) => {
                console.log('catch 1', err)  
                res.status(500).json(err);
              });
          })
          .catch((err) => {
            console.log('catch 2')
            res.status(500).json(err);
          });
      }
    });

app.post("/posts", (req, res) => {
    const u_id = req.body.user_id ? req.body.user_id : '';
    const postTitle = req.body.title ? req.body.title : '';
    const postContent = req.body.content ? req.body.content : '';
    console.log('post log', req.body)
    
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
        res.status(200).json({message: `Blog Post has been deleted successfully`})
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
            // res.status(404).json({ message: `${req.params.table} does not exist.` })
            res.status(404).json({message: `Failure to post data. ERROR: ${err}`})       
            );
});

module.exports = app;