const mongoose = require('mongoose');

var courseSchema = new mongoose.Schema({

    courseName: {
        type: String,
        required: 'This field is required.'
    },
    language: {
        type: String,
        required: 'This field is required.'
    },
    ratings: {
        type: String,
        required: 'This field is required.'
    },
    fees: {
        type: String,
        required: 'This field is required.'
    },
    duration: {
        type: String,
        required: 'This field is required.'
    }
});
// Custom validation for email


mongoose.model('Course', courseSchema);
