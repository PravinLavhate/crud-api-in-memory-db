const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const app = express();

const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());

app.use("/api/users", userRoutes);

app.listen(PORT);
