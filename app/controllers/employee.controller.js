const Employee = require('../models/employee')

// Create new employee
exports.createEmployee = async (req, res) => {
    // Validate request
    if(!req || !req.body.name || !req.body.dob) {
        return res.status(400).send({
            message: "Bad Data"
        });
    }

    // Enter data of a new employee
    const emp = new Employee({
        id : Math.floor(Math.random() * 100000) + 1, 
        name : req.body.name,
        dob : req.body.dob,
        dept: req.body.dept,
        phoneNo: req.body.phoneNo,
        joiningDate: new Date()
    });

    // Save Employee data in the database
    try{
        result = await emp.save()
    if(result){ res.status(200).send({message:"Employee data saved !"})}
    }catch(err){
        res.status(500).send({ message: "Error : "+err})
    }
}


// Retrieve and return the data of all the employees from the database.
exports.findAll = async function(req, res){
    try{
    const employees = await Employee.find()
    if(!employees || employees.length===0){res(500).send({message:"Could not find employees!"})}
    res.status(200).send(employees)
    }catch(err){
        res.status(500).send({message:"Could not find employees! "+err})
    }
}

// Find an employee with Employee Id
exports.findByName = async (req, res) => {
    try{
        let name = req.params.name
        let cond = {name: name}
        const result = await Employee.find(cond)
        if(!result || result.length===0){res(500).send({message:"Could not find employee/s!"})}
        res.status(200).send(result)
    }catch(err){
        res.status(500).send({message:"Could not find employees! "+err})
    }
}

// Update data of an employee identified by the Employee Id in the request
exports.update = async (req, res) => {
    // Validate Request
    if(!req.body || !req.body.name) {res.status(400).send({message: "Bad Request"})}
    try{
        let updated = await Employee.findOneAndUpdate(
            {id: req.params.employeeId},
            { $set: {
                name: req.body.name,
                dept: req.body.dept,
                phoneNo: req.body.phoneNo
                }
            },
            {new: true})
            if(!updated || updated.length === 0){res.status(500).send({message: "Error updating"})}
            res.status(200).send(updated)
    }catch(err){
        {res.status(500).send({message: "Error" + err})}
    }
};


// Delete data of an employee with the specified Employee Id in the request
exports.deleteByEmployeeId = async (req, res) => {
    if(!req.params || !req.params.employeeId){res.status(400).send({message: "Bad Request"})}

    try{
        let id = req.params.employeeId
        let cond = {id: id}
        const result = await Employee.findOneAndDelete(cond)
        if(!result || result.length===0){res(500).send({message:"Could not find employee/s!"})}
        res.status(200).send({deleted: true, object: result})
    }catch(err){
        res.status(500).send({message:"Could not delete employees! "+err})
    }
};