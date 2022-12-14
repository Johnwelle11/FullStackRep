import express from "express";
import pg from "pg";
import cors from "cors";
import morgan from "morgan";
// import fs from "fs/promises";
import { readFile } from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// const PORT = process.env.PORT;  gives an undefined PORT

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(morgan("combined"));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ...(process.env.NODE_ENV === "production"
    ? {
        ssl: {
          rejectUnauthorized: false,
        },
      }
    : {}),
});

// app.get("/", (req, res) => {
//   readFile("public/index/html", "utf-8").then((string) => {
//     res.type("javascript");
//     res.send(string);
//   });
// });

app.get("/cars", (req, res) => {
  pool.query("SELECT * FROM cars").then((data) => {
    res.send(data.rows);
  });
});

app.get("/cars/:id", (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM cars WHERE id = $1;`, [id]).then((data) => {
    const car = data.rows[0];
    if (car) {
      res.send(car);
    } else {
      res.sendStatus(404);
    }
  });
});

app.get("/car_owners", (req, res) => {
  pool.query("SELECT * FROM car_owners").then((data) => {
    res.send(data.rows);
  });
});

app.get("/car_owners/:id", (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM car_owners WHERE id = $1;`, [id]).then((data) => {
    const owners = data.rows[0];
    if (owners) {
      res.send(owners);
    } else {
      res.sendStatus(404);
    }
  });
});

app.post("/car_owners", (req, res) => {
  const { name, phone_number, email } = req.body;
  pool
    .query(
      "INSERT INTO car_owners (name, phone_number, email) VALUES ($1, $2, $3) RETURNING *",
      [name, phone_number, email]
    )
    .then((result) => {
      res.send(result.rows[0]);
    });
});

// app.get("/cars/:type", (req, res) => {
//   const id = req.params.type;
//   pool.query(`SELECT * FROM cars WHERE id = $1;`, [type]).then((data) => {
//     const car = data.rows[0];
//     if (car) {
//       res.send(car);
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

// app.get("/cars/:name", (req, res) => {
//   const id = req.params.name;
//   pool.query(`SELECT * FROM cars WHERE id = $1;`, [name]).then((data) => {
//     const car = data.rows[0];
//     if (car) {
//       res.send(car);
//     } else {
//       res.sendStatus(404);
//     }
//   });
// });

app.delete("/cars/:id", (req, res) => {
  const id = req.params.id;
  pool
    .query("DELETE FROM cars WHERE id = $1 RETURNING *;", [id])
    .then((data) => {
      if (data.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    });
});

app.patch("/cars/:id", (req, res) => {
  const id = Number(req.params.id);
  const { name, type, model, address } = req.body;
  if (Number.isNaN(id)) {
    res.status(400).send(`invalid id given "${req.params.id}"`);
  }

  pool
    .query(
      `
      UPDATE cars
      SET name = COALESCE($1, name),
          type = COALESCE($2, type),
          model = COALESCE($3, model)
        address = COALESCE($4, address)

      WHERE id = $5
      RETURNING *;
      `,
      [name, type, model, address, id]
    )
    .then((result) => {
      if (result.rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(result.rows[0]);
      }
    });
});

app.post("/cars", (req, res) => {
  const { name, type, model, address } = req.body;
  pool
    .query(
      "INSERT INTO cars (name, type, model, address) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, type, model, address]
    )
    .then((result) => {
      res.send(result.rows[0]);
    });
});
app.use((err, req, res, next) => {
  res.sendStatus(500);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
