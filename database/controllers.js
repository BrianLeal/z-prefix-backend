const knex = require("./dbConnection");

// CREATE

function addUser(firstNameToAdd, lastNameToAdd, userName, hashedPassword) {
    return knex('users').insert(
        {
        first_name: firstNameToAdd, last_name: lastNameToAdd, 
        username: userName, password_encrypted: hashedPassword
        })
}
  
function addPost(u_id, postTitle, postContent) {
    console.log('addPost log', postTitle)
    return knex('posts').insert({user_id: u_id, title: postTitle, content: postContent})
}

  //READ

function getSpecificItem(table, i_id) {
    return knex.select('*').from(table).where({id: i_id})
}

function getUser(userName){
    return knex.select('*').from('users').where({username: userName})
}  

  //UPDATE

function updateItem(table, i_id, params) {
    return knex(table).where({id: i_id}).update(params)
}
  //DELETE
  
function deleteItem(table, i_id) {
    return knex(table).where({id: i_id}).del()
}

  // LIST

function getAll(input) {
    return knex.select("*").from(input)
}

//PASSWORD HASH

function getPasswordHash(userName){
    return ( 
    knex('users').where({username: userName}).select('password_encrypted')
    .then(data=>data[0].password_encrypted) //confused about this
    )}
   


  module.exports = { addUser, addPost, getUser, getSpecificItem,
                     updateItem, deleteItem, getAll, getPasswordHash
                   };
 