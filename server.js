require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const passport = require("passport");
require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const modalRoutes = require("./routes/modalRoutes");
const userRoutes = require("./routes/userRoutes");
const session = require("express-session");

const app = express();

connectDB();
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes, userRoutes);
app.use("/api/modals", modalRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
