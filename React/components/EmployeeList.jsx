import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class EmployeeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            searchName: "",
        };

        this.getBirthday = this.getBirthday.bind(this);
        this.addEmployee = this.addEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.changeSearchName = this.changeSearchName.bind(this);
        this.searchName = this.searchName.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((response) => {
            this.setState({ employees: response.data });
        });
    }

    changeSearchName(event) {
        this.setState({ searchName: event.target.value });
    }

    searchName() {
        window.location.href = `/search-employee/${this.state.searchName}`;
    }

    addEmployee() {
        window.location.href = "/add-employee";
    }

    getBirthday() {
        window.location.href = "/birthday";
    }

    updateEmployee(id) {
        this.props.navigate(`/update-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then((response) => {
            this.setState({
                employees: this.state.employees.filter(
                    (employee) => employee.id !== id
                ),
            });
        });
    }

    render() {
        return (
            <div>
                <h2 className="text-center">EMPLOYEE LIST</h2>
                <div className="row">
                    <div className="col-md-3">
                        <button
                            className="btn btn-primary"
                            onClick={this.addEmployee}
                        >
                            Add an Employee
                        </button>
                    </div>

                    <div className="col-md-3">
                        <button
                            className="btn btn-primary"
                            onClick={this.getBirthday}
                        >
                            Display today's birthday list
                        </button>
                    </div>

                    <div className="col-md-6">
                        <div className="input-group">
                            <input
                                type="search"
                                className="form-control rounded"
                                placeholder="Enter the name of the employee"
                                autoComplete="off"
                                name="searchName"
                                aria-label="Search"
                                aria-describedby="search-addon"
                                value={this.state.searchName}
                                onChange={this.changeSearchName}
                            />
                            <button
                                className="btn btn-outline-primary"
                                onClick={this.searchName}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>NAME</th>
                                <th>ADDRESS</th>
                                <th>DATE OF BIRTH</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.name}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.dob}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning btn-info"
                                            onClick={() =>
                                                this.updateEmployee(employee.id)
                                            }
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger btn-info"
                                            onClick={() =>
                                                this.deleteEmployee(employee.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EmployeeList;
