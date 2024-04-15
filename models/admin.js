const sqlite3 = require("sqlite3").verbose();
const sqlite = require("sqlite");

async function init() {
  try {
    db = await sqlite.open({
      filename: 'database.db',
      driver: sqlite3.Database
    });
  } catch (err) {
    console.error(err);
  }
}

init();


// select all the realtors, call the callback with them as a parameter
function getAllUsers() {
  return db.all("SELECT rowid, * FROM user")
}

async function getUser(id){

  let results;
  try {
    results = await db.all("SELECT * FROM user WHERE user_id = ?", id);
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
  return results;
}

// Return the user
// async function createUser(username, password) {


//   if (username.length > 1 && password.length > 1) {

//     try {

//       await db.run("INSERT INTO Users (username, password, level) VALUES (?,?,?)", [username, password, 'member']);
//       console.log("username length: "+username.length+ " | password length: "+ password.length);

//     } catch (error) {

//       console.error("Database error:", error);
//       return null;

//     }

//     return true;

//   } else {

//     return null;
//   }
// }

//delete user
async function deleteUser(id)
{
  try{
    await db.run("DELETE FROM user WHERE user_id=?", id);
  }catch(error){
    console.error("Database error:", error);
    return null;
}
return true;
}

module.exports = {  getAllUsers, getUser, deleteUser};
