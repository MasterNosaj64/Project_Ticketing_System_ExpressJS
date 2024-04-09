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


// select all the clients
async function getAllClients() {

    try {
        results = await db.all("SELECT * FROM client");
        return results;
    } catch (error) {
        console.error("Database error:", error);
        return null;
    }


}


// Return specific company by id
async function getClient(callback, id) {
    let results;

    try {
        results = await db.all("SELECT * FROM client WHERE client_id = ?", id);
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


async function createClient(client, userid) {
    try {

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();

        await db.run(`
                    INSERT INTO client (name,
                                        website,
                                        address_street,
                                        address_city,
                                        address_province,
                                        address_postalcode,
                                        address_country,
                                        description,
                                        company_email,
                                        date_created,
                                        date_modified,
                                        created_by)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                client.name,
                client.website,
                client.address_street,
                client.address_city,
                client.address_province,
                client.address_postalcode,
                client.address_country,
                client.description,
                client.type,
                client.client_email,
                year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds,
                year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds,
                userid
            ]
        );


    } catch (error) {

        console.error("Database error:", error);
        return null;

    }

    return true;

//use this.lastID to return the last insert id for the return

}

//delete articles
async function deleteClient(id) {
    await db.run("DELETE FROM client WHERE client_id=?", id);
}

module.exports = {getAllClients, getClient, createClient, deleteClient};
