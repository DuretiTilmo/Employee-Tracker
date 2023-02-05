class Department {
    constructor (department_id, name) {
        this.department_id = department_id;
        this.name = name;
    }

getDepartId() {
    return this.department_id 
};

getName() {
    return this.name
};

}

module.exports = Department;