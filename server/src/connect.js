const { MongoClient } = require('mongodb');

async function main() {
    const uri = 'mongodb+srv://dbUser:passfordb71@team10.pgu1m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    const client = new MongoClient(uri);

    try {
       await client.connect(); 
       await listDatabases(client);
    } catch(e) {
        console.error(e);
    } finally {
        await client.close();
    }
} 

main().catch(console.error);

async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
}

