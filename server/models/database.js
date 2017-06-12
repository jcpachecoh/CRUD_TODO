var pg = require('pg');

var database = require('../config/database.js');
var conString = database.conString;

const client = new pg.Client(conString);
client.connect();
const query = client.query(
  'DROP TABLE IF EXISTS todos;CREATE TABLE todos(id SERIAL PRIMARY KEY, text VARCHAR(400) not null, done BOOLEAN,id_user numeric not null)');
query.on('end', () => { client.end(); });

const query1 = client.query(
  'DROP TABLE IF EXISTS users;CREATE TABLE users(id SERIAL PRIMARY KEY, name VARCHAR(100),username VARCHAR(40) not null, password VARCHAR(40));')
query1.on('end', () => { client.end(); });

