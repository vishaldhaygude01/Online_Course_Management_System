const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Course = mongoose.model('Course');

router.get('/', (req, res) => {
    res.render("course/addOrEdit1", {
        viewTitle: "Insert Courses Details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var course = new Course();
    course.courseName = req.body.courseName;
    course.language = req.body.language;
    course.ratings = req.body.ratings;
    course.fees = req.body.fees;
    course.duration = req.body.duration;
    course.fullName = req.body.fullName;
    course.save((err, doc) => {
        if (!err)
            res.redirect('course/list1');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit1", {
                    viewTitle: "Insert Course Details",
                    course: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    Course.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('course/list1'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("course/addOrEdit1", {
                    viewTitle: 'Update Course',
                    course: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}




router.get('/list1', (req, res) => {
    Course.find((err, docs) => {
        if (!err) {
            res.render("course/list1", {
                list1: docs
            });
        }
        else {
            console.log('Error in retrieving course list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'courseName':
                body['courseNameError'] = err.errors[field].message;
                break;
            case 'language':
                body['languageError'] = err.errors[field].message;
                break;
            case 'ratings':
                body['ratingsError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Course.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("course/addOrEdit1", {
                viewTitle: "Update Course",
                course: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Course.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/course/list1');
        }
        else { console.log('Error in Courses delete :' + err); }
    });
});

module.exports = router;