#! /usr/bin/env node

import { Client } from "pg";

const SQL = `
DROP TABLE IF EXISTS item;
DROP TABLE IF EXISTS category;

CREATE TABLE IF NOT EXISTS category (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS item (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) UNIQUE,
  category_id INTEGER REFERENCES category(id) ON DELETE CASCADE,
  quantity INTEGER
);
`;

async function main() {
  const client = new Client({
    connectionString: process.env.CONNECTIONSTRING,
  });
  console.log("Connecting to database...");
  await client.connect();
  console.log("Connected to database");
  console.log("Executing SQL...");
  await client.query(SQL);
  console.log("SQL executed");
  console.log("Disconnecting from database...");
  await client.end();
  console.log("Disconnected from database");
}

main();
