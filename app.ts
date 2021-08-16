const express = require('express');
const path = require('path');
const routes = require('./Api-Router/Users/user.routers');
const app = express();
let cors = require('cors');

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use('/', routes);
app.listen(PORT);
