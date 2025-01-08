import { DB } from "./connect.js";

import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

app.get("/api/tasks", (req, res) => {
  res.set("content-type", "application/json");

  const { status, keyword } = req.query;

  let sql = `
    SELECT * 
    FROM tasks
    WHERE task_is_completed = ?
  `;

  let params = [status];

  if (keyword) {
    sql += `
      AND (task_title LIKE '%' || ? || '%' OR task_description LIKE '%' || ? || '%')
    `;
    params.push(keyword, keyword);
  }

  let data = { tasks: [] };

  try {
    DB.all(
      sql,
      [req.query.status, req.query.keyword, req.query.keyword],
      (err, rows) => {
        if (err) {
          throw err;
        }

        rows.forEach((row) => {
          data.tasks.push({
            id: row.task_id,
            title: row.task_title,
            description: row.task_description,
            isCompleted: Boolean(row.task_is_completed),
          });
        });

        let content = JSON.stringify(data);
        res.send(content);
      }
    );
  } catch (error) {
    console.log(err.message);
    res.status(467);
    res.send(`{ "code":467, "status":"${err.message}" }`);
  }
});

app.post("/api/tasks", (req, res) => {
  res.set("content-type", "application/json");

  const sql = `INSERT INTO tasks(task_title, task_description, task_is_completed) VALUES(?, ?, ?)`;

  let newId;

  try {
    DB.run(sql, [req.body.title, req.body.description, 0], function (err) {
      if (err) throw err;

      newId = this.lastID;

      res.status(201);

      let data = {
        status: 201,
        message: `Task ${newId} was created successfully`,
      };

      let content = JSON.stringify(data);
      res.send(content);
    });
  } catch (error) {
    console.log(err.message);
    res.status(468);
    res.send(`{ "code":468, "status":"${err.message}" }`);
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Error", err.message);
  }

  console.log("LISTENING on port 3000");
});
