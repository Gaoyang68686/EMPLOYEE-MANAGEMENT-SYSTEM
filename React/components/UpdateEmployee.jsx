import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class UpdateEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            name: "",
            address: "",
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.submitBtn = this.submitBtn.bind(this);
        this.cancelBtn = this.cancelBtn.bind(this);
        this.resetBtn = this.resetBtn.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((response) => {
            let employee = response.data;
            this.setState({ name: employee.name, address: employee.address });
        });
    }

    changeNameHandler(event) {
        this.setState({ name: event.target.value });
    }

    changeAddressHandler(event) {
        this.setState({ address: event.target.value });
    }

    submitBtn(event) {
        event.preventDefault();
        let employee = {
            name: this.state.name,
            address: this.state.address,
        };
        EmployeeService.updateEmployee(this.state.id, employee).then(
            (response) => {
                window.location.href = "/employees";
            }
        );
    }

    cancelBtn(event) {
        event.preventDefault();
        window.location.href = "./employees";
    }

    resetBtn(event) {
        event.preventDefault();
        this.setState({ name: "", address: "" });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-10 offset-md-1 offset-md-1">
                            <h3 className="text-center">UPDATE EMPLOYEE</h3>
                            <div className="card-body">
                                <form>
                                    <div className="card-body">
                                        <label>NAME</label>
                                        <input
                                            placeholder="enter the name"
                                            autoComplete="off"
                                            name="name"
                                            className="form-control"
                                            value={this.state.name}
                                            onChange={this.changeNameHandler}
                                        />
                                        <label>EMAIL</label>
                                        <input
                                            placeholder="enter the address"
                                            autoComplete="off"
                                            name="address"
                                            className="form-control"
                                            value={this.state.address}
                                            onChange={this.changeAddressHandler}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <button
                                            className="btn btn-success"
                                            onClick={this.submitBtn}
                                        >
                                            Submit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={this.cancelBtn}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={this.resetBtn}
                                        >
                                            Reset
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UpdateEmployee;
