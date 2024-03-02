const express = require("express");
const cors = require("cors");
const UserRoute = require("./routes/UserRoute.js");
const PortfolioRoute = require("./routes/PortfolioRoute.js");
const ExpRoute = require("./routes/ExpRoute.js");


const app = express();
app.use(cors());
app.use(express.json());
app.use(UserRoute);
app.use(PortfolioRoute);
app.use(ExpRoute);

app.listen(5000, ()=> console.log('Server up and running...'));