const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dbConfig = require("./database/db");
const app = express();
const port = process.env.PORT || 4000;

mongoose.Promise = global.Promise;
mongoose
	.connect(dbConfig.db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false 
	})
	.then(
		() => {
			console.log("Database sucessfully connected");
		},
		(error) => {
			console.log("Database could not connected: " + error);
		}
	);

const employeeController = require("./controllers/employee.route");
const applicationController = require("./controllers/application.route");
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: false,
	})
);
app.use(cors());
app.use(express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/", express.static(path.join(__dirname, "dist/mean-stack-crud-app")));
app.use("/api", employeeController);
app.use("/api", applicationController);

const server = app.listen(port, () => {
	console.log("Connected to port " + port);
});

app.use((req, res, next) => {
	console.log("404 error");
	next(createError(404));
});

app.use(function (err, req, res, next) {
	console.log("------");
	console.error(err.message);
	if (!err.statusCode) err.statusCode = 500;		// If no specified error code, default to 'Internal Server Error (500)'
	res.status(err.statusCode).send(err.message);
});
