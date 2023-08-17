require('dotenv').config();
const express = require('express');
const path = require('path');
const sequelize = require('./db');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(fileUpload({}));

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`server started on port: ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();