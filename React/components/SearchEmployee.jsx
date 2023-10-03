import React, { Component } from "react";
import EmployeeService from "../services/EmployeeService";

class SearchEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: this.props.name,
            address: "",
            initialName: "",
            initialAddress: "",
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.updateBtn = this.updateBtn.bind(this);
        this.resetBtn = this.resetBtn.bind(this);
    }

    componentDidMount() {
        EmployeeService.searchEmployee(this.state.name).then((response) => {
            console.log(this.state);
            let employee = response.data;
            this.setState({
                id: employee.id,
                name: employee.name,
                address: employee.address,
                initialName: employee.name,
                initialAddress: employee.address,
            });
        });
    }

    changeNameHandler(event) {
        this.setState({ name: event.target.value });
    }

    changeAddressHandler(event) {
        this.setState({ address: event.target.value });
    }

    updateBtn(event) {
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

    resetBtn(event) {
        event.preventDefault();
        this.setState({
            name: this.state.initialName,
            address: this.state.initialAddress,
        });
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-10 offset-md-1 offset-md-1">
                            <h3 className="text-center">EMPLOYEE INFO</h3>
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
                                            onClick={this.updateBtn}
                                        >
                                            Update
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

export default SearchEmployee;
