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
    return knex('posts').insert({user_id: u_id, title: postTitle, content: postContent})
}

  //READ

function getSpecificItem(table, i_id) {
    return knex.select('*').from(table).where({id: i_id})
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


  module.exports = { addUser, addPost, getSpecificItem,
                     updateItem, deleteItem, getAll 
                   };
 