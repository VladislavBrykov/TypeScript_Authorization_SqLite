import express from 'express';
import router from './Api-Router/routers';

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');

const upload = multer({ dest: 'upload/' });

const PORT = process.env.PORT || 3000;

app.use(upload.array());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use('/', router);
app.listen(PORT);
