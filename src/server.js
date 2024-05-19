const express = require("express");
const routes = require('./routes')


const app = express();

app.use(routes)

const PORT = 5432;
app.listen(PORT, console.log('Server is running on Port: ', PORT))