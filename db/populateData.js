import { Client } from "pg";

const SQL = `
INSERT INTO category (name)
VALUES ('Keyboard'), ('Mouse'), ('Microphone'), ('Scanner'), ('Touchscreen');

INSERT INTO item (name, category_id, quantity)
VALUES ('CORSAIR K70 CORE RGB USB GAMING KEYBOARD, Gray', 1, 10),
('NuPhy Field75 HE', 1, 5),
('Razer Viper V3 Pro', 2, 15),
('Razer DeathAdder V3 Pro', 2, 3),
('Shure SM7B', 3, 1),
('Epson Perfection V39 II', 4, 0),
('Asus Eee Top', 5, 1);
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
