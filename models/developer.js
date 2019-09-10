let mongoose = require('mongoose');
let developerSchema = mongoose.Schema({
    name:{
        firstname : {
            type: String,
            required: true
        },
        lastname: String      
    },
    level: {
        type: String,
        required: true,
        validate: {
            validator: function (levelValue) {
                return levelValue =="BEGINNER" || levelValue == "EXPERT";
            },
            message: 'Level should be BEGINNER or EXPERT'
        }
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String

    }
})
module.exports = mongoose.model('Developer', developerSchema);