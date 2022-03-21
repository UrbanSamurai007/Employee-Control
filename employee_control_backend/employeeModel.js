const mongoose = require('mongoose');

let empSchema = mongoose.Schema({
    id: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true }
});

module.exports = mongoose.model('employee', empSchema, 'employee');
