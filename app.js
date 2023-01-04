var createError = require("http-errors");
require("./Config");

var express = require("express");
var logger = require("morgan");
const path = require("path");
const cors = require("cors");
const connect = require("./configuration/conctionDb");
const { Router } = require("express");
const app = express();
// ipmort Routing 
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/course");
const facultyRouter = require("./routes/faculty");
const departmentRouter = require("./routes/department");
const researchRouter = require("./routes/research");

connect();

app.use(logger("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())
// app.use('/', indexRouter);
app.use("/users", usersRouter);
app.use("/course", courseRouter);
app.use("/faculty", facultyRouter);
app.use("/department", departmentRouter);
app.use("/research", researchRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error message
  res.status(err.status || 500);
  res.json({
    message: err.message,
  });
});
module.exports=Router()
module.exports = app;
