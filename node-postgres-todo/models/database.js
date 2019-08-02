const {Client} = require('pg');
//const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';
const fs = require('fs');

const databaseConfig = JSON.parse(fs.readFileSync('./models/config.json'));

const client = new Client(databaseConfig.development);
client.connect();

const query = client.query(
    "CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)");
query.on('end', () => { client.end(); });



