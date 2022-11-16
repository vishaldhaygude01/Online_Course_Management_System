const express = require('express');
const mongoose = require('mongoose');
const app = express();
const ejs = require('ejs');
const { kStringMaxLength } = require('buffer');

app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/LearnerDB');

const courseSchema = {
    courseName: String,
    language: String,
    ratings:String,
    fees:String,
    duration:String
    
}

const course = mongoose.model('course', courseSchema);

app.get('/', (req, res) => {
    course.find({}, function(err, course) {
        res.render('index', {
            courseList: course
        })
    })
})

app.listen(3007, function() {
    console.log('server is running 3007');
})