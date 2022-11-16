const mongoose = require('mongoose');

var learnerSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: 'This field is required.'
    },
    email: {
        type: String,
        required: 'This field is required.'
    },
    mobile: {
        type: String,
        required: 'This field is required.'
    },
    address: {
        type: String,
        required: 'This field is required.'
    },
    qualification: {
        type: String,
        required: 'This field is required.'
    }
});
// Custom validation for email
learnerSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail. e-mail Format Should be : adcd@gmail.com');
learnerSchema.path('mobile').validate((val)=>{
    mobileRegex = /^[1-9]{1}[0-9]{9}$/;
    return mobileRegex.test(val);
},'Invalid mobile. Mobile No. should contain 10 digit');

mongoose.model('Learner', learnerSchema);
