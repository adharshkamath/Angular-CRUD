const express = require("express");
const applicationController = express.Router();

let Employee = require("../models/Employee");

applicationController.route("/applications").get((req, res) => {
	Employee.find({ appliedForAppraisal: true }, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		}
	});
});

applicationController.route("/approve/:id").put((req, res) => {
  console.log(req.body.raise);
  Employee.findByIdAndUpdate(req.params.id, {
    $inc: { salary: req.body.raise },
    $set: { appliedForAppraisal: false, requestedAppraisal: 0}
  }, function (err, post) {
    if (err) console.log(err);
    res.json(post);} 
  )
});

applicationController.route("/reject/:id").put((req, res) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: { appliedForAppraisal: false, requestedAppraisal: 0}
  }, function (err, post) {
    if (err) return next(err);
    res.json(post);} 
  )
});

module.exports = applicationController;
