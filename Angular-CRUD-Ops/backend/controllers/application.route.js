const express = require("express");
const applicationController = express.Router();

let Employee = require("../models/Employee");

applicationController.route("/applications").get((req, res) => {
	Employee.find({ review: { $exists: true, $ne: null } }, (error, data) => {
		if (error) {
			return next(error);
		} else {
			console.log(data);
			res.json(data);
		}
	});
});


applicationController.route("/review/:id").put((req, res) => {
  console.log(req.body.reviewText);
  Employee.findByIdAndUpdate(req.params.id, {
    $set: { review: req.body.review }
  }, function (err, post) {
    if (err) console.log(err);
    res.json(post);} 
  )
});

applicationController.route("/reviewd/:id").delete((req, res) => {
  Employee.findByIdAndUpdate(req.params.id, {
    $set: { review: null }
  }, function (err, post) {
    if (err) return next(err);
    res.json(post);} 
  )
});

module.exports = applicationController;
