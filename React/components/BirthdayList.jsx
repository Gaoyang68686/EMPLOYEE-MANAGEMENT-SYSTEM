import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class EmployeeList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employees: [],
            searchName: "",
        };

        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.changeSearchName = this.changeSearchName.bind(this);
    }

    componentDidMount() {
        EmployeeService.getBirthday().then((response) => {
            this.setState({ employees: response.data });
        });
    }

    changeSearchName(event) {
        this.setState({ searchName: event.target.value });
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
                <h2 className="text-center">BIRTHDAY LIST</h2>

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
