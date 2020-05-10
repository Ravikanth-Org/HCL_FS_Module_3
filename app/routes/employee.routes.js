module.exports = (app) => {
    const employees = require('../controllers/employee.controller.js');

    // Enter data for a new Employee 
    app.post('/employee', employees.createEmployee);

    // Retrieve data for all Employees
    app.get('/employees', employees.findAll);

    // Retrieve data of an Employee by Name
    app.get('/employees/:name', employees.findByName);

    // Update data of an Employee with Employee Id
    app.put('/employees/:employeeId', employees.update);

    // Delete a Employee with Employee Id
    app.delete('/employees/:employeeId', employees.deleteByEmployeeId);
}