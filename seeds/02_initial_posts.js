/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('posts').del()
  await knex('posts').insert([
    {
      user_id: '1',
      title: 'Pranking Dwight',
      content: 'Put all his office supplies in Jello'
    },
    
    {
      user_id: '3',
      title: 'Photo of Office Bldg',
      content: 'Drew a pic of The Office'
    },
    
    {
      user_id: '2',
      title: 'Assistant Regional Manager',
      content: 'Picked health care plan today'
    }
  ])
  ;
};
