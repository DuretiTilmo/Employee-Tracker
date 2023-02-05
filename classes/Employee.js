const Role = require('./Role');

class Employee extends Role {
    constructor (id, first_name, last_name, role_id, manager_id) {
        super(role_id)
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.manager_id = manager_id;

    }

getId() {
    return this.id 
};

getFirstName() {
    return this.first_name
};

getLastName() {
    return this.last_name
};

getManagerId() {
    return this.manager_id
};

}

module.exports = Employee;