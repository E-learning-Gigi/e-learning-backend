import express from "express";
export default express;
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
import { verifyAccessJWT } from "./middleware/verifyAccessJWT";
import credentials from "./middleware/credentials";

const app = express();

app.use(credentials);

app.use(cors(corsOptions));

// Express parser
app.use(express.json());

// Cookies handler
app.use(cookieParser());

// LOGIN AND REGISTRATION LOGIC
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/refresh", require("./routes/refresh"));

// API ROUTES
app.use(verifyAccessJWT);
app.use("/api/students", require("./routes/api/students"));
app.use("/api/books", require("./routes/api/books"));

app.listen(3000, () =>
  console.log("REST API server running at: http://localhost:3000")
);
