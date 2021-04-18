const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors()); 
app.use(express.json()); 


//routes

//async allows to use await
app.post("/todos", async (req, res) => {
  // try/catch to help error handling
  try {
    const { description } = req.body;
    const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *",
    [description]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
})


//server setup
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})