
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("connect to database"))
    .catch((err) => console.log(err))