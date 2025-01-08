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

app.put("/api/tasks/:id", (req, res) => {
  res.set("content-type", "application/json");

  const { title, description, isCompleted } = req.body;
  const taskId = req.params.id;

  const sql = `
    UPDATE tasks
    SET task_title = ?, task_description = ?, task_is_completed = ?
    WHERE task_id = ?
  `;

  const params = [title, description, isCompleted, taskId];

  try {
    DB.run(sql, params, function (err) {
      if (err) {
        console.err("Error updating task:", err.message);
        res.status(468);
        res.send(`{ "code":468, "status":"${err.message}" }`);
      }

      if (this.changes === 0) {
        res.status(404);
        const data = { status: 404, status: "Task not found" };
        const content = JSON.stringify(data);
        res.send(content);
      }

      res.status(200);

      const data = {
        status: 200,
        message: `Task ${taskId} updated successfully`,
      };

      let content = JSON.stringify(data);
      res.send(content);
    });
  } catch (error) {
    console.error(error.message);

    res.status(467);
    res.send(`{ "code":467, "status":"${error.message}" }`);
  }
});

app.delete("/api/tasks", (req, res) => {
  res.set("content-type", "application/json");

  const { id, status } = req.query;

  let sql = ``;
  let params = [];

  if (id) {
    sql = `DELETE FROM tasks WHERE task_id=?`;
    params.push(id);
  } else if (status === "0" || status === "1") {
    sql = `DELETE FROM tasks WHERE task_is_completed = ?`;
    params.push(Boolean(parseInt(status)));
  } else {
    res.status(400);
    res.send("Please provide either an id or a status");
  }

  try {
    DB.run(sql, params, function (err) {
      if (err) {
        console.error("error deleting task(s):", err.message);
        res.status(468);
        res.send(`{ "code":468, "status":"${err.message}" }`);
      }

      const deletedCount = this.changes;

      if (deletedCount === 0) {
        res.status(404);
        res.send(`{ "code":404, "status":"No tasks found to delete" }`);
      }

      res.status(200);
      const data = {
        status: 200,
        message: `${deletedCount} task(s) deleted successfully`,
      };

      const content = JSON.stringify(data);
      res.send(content);
    });
  } catch (error) {
    console.error(error.message);
    res.status(467);
    res.send(`{ "code":467, "status":"${error.message}" }`);
  }
});

app.listen(3000, (err) => {
  if (err) {
    console.log("Error", err.message);
  }

  console.log("LISTENING on port 3000");
});
