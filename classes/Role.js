const Department = require('./Department');

class Role extends Department {
    constructor (role_id, title, salary, department_id) {
        super(department_id)
        this.role_id = role_id;
        this.title = title;
        this.salary = salary;

    }

getRoleId() {
    return this.role_id 
};

getTitle() {
    return this.title
};

getSalary() {
    return this.salary
};

}

module.exports = Role;