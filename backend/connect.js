import sqlite3 from "sqlite3";

const sql3 = sqlite3.verbose();

const DB = new sql3.Database(":memory:", sqlite3.OPEN_READWRITE, connected);

function connected(err) {
  if (err) {
    console.log(err.message);
    return;
  }

  console.log("Created the DB or SQLite DB does already exist");
}

let sql = `CREATE TABLE IF NOT EXISTS tasks(
    task_id INTEGER PRIMARY KEY,
    task_title TEXT NOT NULL,
    task_description TEXT NOT NULL,
    task_is_completed BOOLEAN NOT NULL
)`;

DB.run(sql, [], (err) => {
  if (err) {
    console.log("error creating tasks table");
    return;
  }
  console.log("tasks table created successfully");
});

export { DB };
