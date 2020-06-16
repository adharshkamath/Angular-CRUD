const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Employee = new Schema({
   name: {
      type: String
   },
   email: {
      type: String
   },
   department: {
      type: String
   },
   designation: {
      type: String
   },
   phoneNumber: {
      type: Number
   },
   salary: {
      type: Number
   },
   appliedForAppraisal: {
      type: Boolean
   },
   requestedAppraisal: {
      type: Number
   },
}, {
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)
