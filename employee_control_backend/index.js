const bodyParser = require('body-parser');
const express = require('express');
const mongoose  = require('mongoose');
const app = express();
const router = express.Router();
const empModel = require("./employeeModel");
const PORT = 9090;
const cors = require("cors");


function inputEval(_employee) {
    const regex = /^([a-zA-z0-9\._]+)@([a-zA-z0-9])+.([a-z]+)(.[a-z]+)?$/
    const errors = {
        found: false,
        list : {
            "id" : 0,
            "firstName" : null,
            "lastName" : null,
            "email" : null
        }
    };
    
    if (_employee.id == null || _employee.id < 1) {
        found = true;
        errors.list.id = 'Invalid Employee ID Number';
    }
    if (_employee.firstName == null || _employee.firstName == '') {
        found = true;
        errors.list.firstName = 'Invalid First Name';
    }
    if (_employee.lastName == null || _employee.lastName == '') {
        found = true;
        errors.list.lastName = 'Invalid Last Name';
    }
    if (_employee.emailid === null || _employee.emailid === '') {
        found = true;
        errors.list.emailid = 'Invalid Email Address';
    }
    if(regex.test(_employee.emailId)){
        found = false;
    }
    return errors;
}

const DB_URL = 'mongodb+srv://Camp518:matthew007@cluster0.av8da.mongodb.net/101289518_assignment2?retryWrites=true&w=majority';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

router.get('/api/v1/employees', (req, res) => {
    empModel.find()
    .then(employees => res.send(employees))
    .then(() => res.status(200).send('All Employee resources are fetched'))
    .catch(err => res.status(500).send({ error: err }));
});

router.post('/api/v1/employees', (req, res) => {
    const employee = empModel(req.body);
    const inputErrors = inputEval(employee);
    
    if (inputErrors.found == true) {
        res.status(400).send({ error: inputErrors.list });
    } else {
        employee.save()
        .then(() => res.status(201).send({ message: 'A New Employee is created' }))
        .catch(err => res.status(400).send({ error: err }));
    }
});

router.get('/api/v1/employees/:id', (req, res) => {
    empModel.find({id: {$eq: req.params.id}})
    .then(employee => res.send(employee))
    .then(() => res.status(200).send({ message: 'Employee Found!'}))
    .catch(err => res.status(500).send({error: err}));
});

router.put('/api/v1/employees/:id', (req, res) => {
    const employeeId = req.params.id;
    const _employee = req.body;
    const inputErrors = inputEval(_employee);
    console.log(inputErrors.found);
    
    if (inputErrors.found == true) {
        res.status(400).send({ error: errorsFound.list });
    } else {
        empModel.updateOne({ id: parseInt(req.params.id) }, req.body)
            .then(() => res.send({ message: 'Employee Updated Successfully' }))
            .catch(err => res.status(500).send({ error: err }));
    }
});

router.delete('/api/v1/employees/:id', (req, res) => {
    empModel.deleteOne({ id: req.params.id })
    .then(() => res.send({ message: 'Employe deleted Succesfully.' }))
    .catch(err => res.status(500).send({ error: err }));
});

app.use('/', router);
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));