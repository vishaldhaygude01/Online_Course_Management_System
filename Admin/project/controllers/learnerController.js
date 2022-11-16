const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Learner = mongoose.model('Learner');

router.get('/', (req, res) => {
    res.render("learner/addOrEdit", {
        viewTitle: "Insert Learner Details"
    });
});


router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var learner = new Learner();
    learner.fullName = req.body.fullName;
    learner.email = req.body.email;
    learner.mobile = req.body.mobile;
    learner.address = req.body.address;
    learner.qualification = req.body.qualification
    learner.save((err, doc) => {
        if (!err)
            res.redirect('learner/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("learner/addOrEdit", {
                    viewTitle: "Insert Learner Details",
                    learner: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}


function updateRecord(req, res) {
    Learner.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('learner/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("learner/addOrEdit", {
                    viewTitle: 'Update Learner',
                    learner: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}




router.get('/list', (req, res) => {
    Learner.find((err, docs) => {
        if (!err) {
            res.render("learner/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving learner list :' + err);
        }
    });
});



function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            case 'mobile':
                body['mobileError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Learner.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("learner/addOrEdit", {
                viewTitle: "Update Learner",
                learner: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Learner.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/learner/list');
        }
        else { console.log('Error in Learner delete :' + err); }
    });
});

module.exports = router;