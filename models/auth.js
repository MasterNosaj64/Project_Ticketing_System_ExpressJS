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

// Return the user
async function login(username, password) {
  let results;

  try {
    results = await db.all("SELECT * FROM user WHERE username = ?", username);
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }

  if (results.length === 0) {
    return null;
  }

  const user = results[0];

  if (user.password === password) {

    return user;

  }

  return null;
}

module.exports = {login};
