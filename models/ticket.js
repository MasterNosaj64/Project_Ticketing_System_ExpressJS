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


// select all the tickets
async function getAllTickets() {

    try {
        results = await db.all("SELECT * FROM ticket");
        return results;
    } catch (error) {
        console.error("Database error:", error);
        return null;
    }


}


// Return specific ticket by id
async function getTicket(callback, id) {
    let results;

    try {
        results = await db.all("SELECT * FROM ticket WHERE ticket_id = ?", id);
    } catch (error) {
        console.error("Database error:", error);
        return;
    }
    console.log(results);
    if (results.length === 0) {
        return;
    }

    const client = results[0];
    callback(client);
}


async function createTicket(client, userid) {
    try {

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();


    } catch (error) {

        console.error("Database error:", error);
        return null;

    }

    return true;

//use this.lastID to return the last insert id for the return

}

module.exports = {getAllTickets, getTicket, createTicket, };
