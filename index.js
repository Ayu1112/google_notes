const express = require("express");
const { connection } = require("./db");
const { noteRouter } = require("./routes/notes.routes");
const {userRouter}=require('./routes/user.routes');
const cors=require("cors")

const app = express();
app.use(cors())
app.use(express.json());
require("dotenv").config()
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(process.env.port, async () => {
  try {
    await connection
    console.log(`listening at port ${process.env.port}`);
    console.log("connected to db");
  } catch (err) {
    console.log(err);
    console.log("something went wrong!!");
  }
});
