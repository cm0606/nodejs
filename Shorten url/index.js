const express = require('express');
const path = require('path');
const { connectMongoDb } = require('./connection');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;
//middlewares
const { checkForAuthentication, restrictTo } = require('./middlewares/auth');
//Routes
const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');
//database connection
connectMongoDb("mongodb://localhost:27017/urldb");
// app run
app.set("view engine", "ejs");
app.set('views', path.resolve('./views'))
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication);
app.use('/user', userRoute);
app.use('/', staticRoute);
app.use('/url', restrictTo(["Normaal", "ADMIN"]), urlRoute);
app.listen(PORT, () => console.log("Application Started at Port 8080"));