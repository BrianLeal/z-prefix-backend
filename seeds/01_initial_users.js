/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
     {
      first_name: "Jim", 
      last_name: "Halpert", 
      username: "sportsguy123", 
      password_encrypted: "default"
     },
     
     {
      first_name: "Dwight", 
      last_name: "Schrute", 
      username: "beetstreet11", 
      password_encrypted: "frodo"
     },
     
     {
      first_name: "Pam", 
      last_name: "Beasley", 
      username: "artschool22", 
      password_encrypted: "password"
     }

  ]);
};
