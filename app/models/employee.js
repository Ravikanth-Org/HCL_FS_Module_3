const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    id: Number,
    name: String,
    dob: Date,
    dept: String,
    phoneNo: Number,
    joiningDate: Date
}, {
    timestamps: true
});

const Employee = module.exports = mongoose.model('employees', EmployeeSchema);
