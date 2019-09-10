var express = require('express');
var mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);

var app = new express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("img"));
app.use(express.static(__dirname + "/css"));
var filePath = __dirname + "/views/";

//require models
var task = require('./models/task');
var developer = require('./models/developer');

//open db connection
mongoose.connect("mongodb://localhost:27017/week7DB", function(err){
    if (err){
        console.log(err);
        throw err;
    }
    else{
        console.log("Connected Sucessfully");
    }
});

//index page
app.get("/", function(req, res){
    let fileName = filePath + "index.html";
    res.sendFile(fileName);
});

//get API -> adding a new developer page
app.get('/addDeveloper', function(req,res){
    let fileName = filePath + "addDeveloper.html";
    res.sendFile(fileName);
});

//post API -> adding a new developer
app.post('/addNewDeveloper', function(req, res){
    let developerDetails = req.body;
    console.log(developerDetails);
    developer.create({
        name: {firstname: developerDetails.firstname,
            lastname: developerDetails.lastname},
        level: developerDetails.level,
        address: {
            state: developerDetails.state,
            suburb: developerDetails.suburb,
            street: developerDetails.street,
            unit: developerDetails.unit }
    }, function(err){
        if(err){
            console.log(err);
            throw err;
        }else{
            res.redirect('/allDeveloper');
        }
    });
});

//get API -> all developers page
app.get("/allDeveloper", function(req, res){
    developer.find(function(err, data){
        res.render('listDevelopers.html', {database:data})
    });
});

//get API -> add task page
app.get('/addTask', function(req,res){
    let fileName = filePath + "addTask.html";
    res.sendFile(fileName);
});

//post API -> adding a new task
app.post('/addNewTask', function(req, res){
    let taskDetails = req.body;
    console.log(taskDetails);
    task.create({
        taskName: taskDetails.taskname,
        assignTo: taskDetails.assignto,
        dueDate: taskDetails.duedate,
        status: taskDetails.status,
        description: taskDetails.desc
    }, function(err){
        if(err){
            console.log(err);
            throw err;
        }else{
            console.log("Task Created!")
            res.redirect('/allTasks')
        }
    });
});

//get API -> all tasks page
app.get('/allTasks', function(req,res){
    task.find(function(err, data){
        res.render('listTasks.html', {database:data})
    });
});


//get API -> delete by ID page
app.get('/deleteById', function(req,res){
    let fileName = filePath + "deleteTask.html";
    res.sendFile(fileName);
});

//post API -> delete task by ID
app.post('/deleteSpecifiedTask', function(req, res){
    let taskDetails = req.body;
    task.deleteOne({"_id": taskDetails.ID}, function(err, doc){
        console.log(doc);
        res.redirect('/allTasks');
    });

});

//get API -> delete all completed tasks
app.get('/deleteAllCompletedTasks', function(req, res){
    task.deleteMany({"status": "Completed"}, function(err, doc){
        console.log(doc);
        res.redirect('/allTasks');
    });
});

//get API -> update task status page
app.get('/update', function(req, res){
    let fileName = filePath + "update.html";
    res.sendFile(fileName);
});

//post API -> update task status by ID
app.post('/updateStatus', function(req, res){
    let taskDetails = req.body;
    console.log(taskDetails.ID + "HEHE"  + taskDetails.status );
    task.updateOne({"_id": taskDetails.ID}, {$set: {"status": taskDetails.status}}, function(err, doc){
        console.log(doc);
        res.redirect('/allTasks');
    });

});


app.listen(8080);