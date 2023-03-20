const path = require("path");
const express = require("express");
var { expressjwt: jwt } = require("express-jwt");
const cors = require("cors");
const morgan = require("morgan");
const { raiserRouter } = require("./routers/raiser.router");
const { resolverRouter } = require("./routers/resolver.router");
const { authRouter } = require("./routers/auth.router");

const app = express();

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(morgan("dev"));

app.use(express.json());
// app.use("/api/v1", jwt({ secret: process.env.SECRET, algorithms: ["HS256"] }));
app.use("/api/v1/raiser", raiserRouter);
app.use("/api/v1/resolver", resolverRouter);
app.use("/api/v1/auth", authRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
