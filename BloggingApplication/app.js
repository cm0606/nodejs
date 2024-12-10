const path = require("path");
const { connectMongoDb } = require('./connections.js');

const cookieParser = require('cookie-parser');
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
//Routes
const staticRoute = require('./routes/staticRoute.js');
const userRoute = require('./routes/user.js');
const blogRoute = require('./routes/blog.js');
//middlewares
const { checkForAuthentication, restrictTo } = require('./middlewares/auth.js');
//database connection
if (process.env.MONGO_URL) {
    connectMongoDb(process.env.MONGO_URL);
}
else {
    connectMongoDb("mongodb://localhost:27017/bloggingdb");
}
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(checkForAuthentication);
app.use(express.static(path.resolve('./public')))
app.use("/", staticRoute)
app.use('/user', userRoute)
app.use('/blog', blogRoute)
app.listen(PORT, () => console.log(`Server Start on Port: ${PORT}`));