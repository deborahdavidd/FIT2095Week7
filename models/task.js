let mongoose = require('mongoose');
let taskSchema = mongoose.Schema({
     taskName: {
            type: String,
            required: true
     },
     assignTo: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'developer'
     },
     dueDate: {
         type: Date
     },
     status: {
         type: String
     },
     description: {
         type: String
     }


});
let taskModel = mongoose.model('Task', taskSchema);
module.exports=taskModel;