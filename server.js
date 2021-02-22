var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "employees"
});

connection.connect(function(err) {
  if (err) throw err;
  startUp();
});

function startUp() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Departments",
        "View All Roles",
        "Add Employees",
        "Add Departments",
        "Add Roles",
        "exit",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View All Employees":
          empAllSearch();
          break;
        case "View All Departments":
          deptSearch();
          break;
        case "View All Roles":
          roleSearch();
          break;
        case "Add Employees":
          addEmp();
          break;
        case "Add Departments":
          addDept();
          break;
        case "Add Roles":
          addRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
};

function empAllSearch() {
  connection.query(
        "SELECT  employees.id, employees.first_name, employees.last_name, roles.title, departments.dep_name AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.department_id LEFT JOIN employees manager on manager.manager_id = employees.manager_id;",
    function(err, res) {
      if (err) throw err;
      console.table(res);
      startUp();
    }
  );
};

function deptSearch() {
  connection.query("SELECT * from departments", function(err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
};

function roleSearch() {
  connection.query("SELECT * from roles", function(err, res) {
    if (err) throw err;
    console.table(res);
    startUp();
  });
};

function updateEmpManager (roleID, empID){
connection.query("UPDATE employees SET role_id = ? WHERE employees.id = ?", [roleID, empID])
};

function addEmp() {
  var questions = [
    {
      type: "input",
      message: "What's the employee's first name?",
      name: "first_name"
    },
    {
      type: "input",
      message: "What's the employee's last name?",
      name: "last_name"
    },
    {
      type: "input",
      message: "What's the employee's title (role_id)?",
      name: "titleID"
    },
    {
      type: "input",
      message: "Who's the employee's manager (employees_id)?",
      name: "managerID"
    }
  ];
  inquirer.prompt(questions).then(function(answer) {
    connection.query(
      "INSERT INTO employees SET ?",
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.titleID,
        manager_id: answer.managerID,
      },
      function(error) {
        if (error) throw error;
        updateEmpManager(answer.titleID, answer.managerID);
        empAllSearch();
      }
    );
  });
};

function addDept() {
  inquirer
    .prompt({
      type: "input",
      message: "What would you like to name the new department?",
      name: "departments"
    })
    .then(function(answer) {
        console.log(answer.departments);
      connection.query("INSERT INTO departments SET ?",
        {
          dep_name: answer.departments,
        },
        function(err, res) {
          if (err) throw err;
          startUp();
        });
    });
};

function addRole() {
  var questions = [
    {
      type: "input",
      message: "What type of role would you like to add?",
      name: "title"
    },
    {
      type: "input",
      message: "In what department is the new role?",
      name: "id"
    },
    {
      type: "input",
      message: "What is the salary for this role?",
      name: "salary"
    }
  ];
  inquirer.prompt(questions).then(function(answer) {
    connection.query(
      "INSERT INTO roles SET ?",
      {
        title: answer.title,
        department_id: answer.id,
        salary: answer.salary
      },
      function(error, res) {
        if (error) throw error;
        startUp();
      }
    );
  });
};