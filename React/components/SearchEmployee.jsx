import React, { Component } from "react";
import DatePicker from "react-datepicker";
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
            initialDob: "",
        };
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDobHandler = this.changeDobHandler.bind(this);
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
                initialDob: employee.dob,
            });
        });
    }

    changeNameHandler(event) {
        this.setState({ name: event.target.value });
    }

    changeAddressHandler(event) {
        this.setState({ address: event.target.value });
    }

    changeDobHandler(date) {
        this.setState({ dob: date });
    }

    updateBtn(event) {
        event.preventDefault();
        let employee = {
            name: this.state.name,
            address: this.state.address,
            date: this.state.dob,
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
            dob: this.state.initialDob,
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
                                        <label>ADDRESS</label>
                                        <input
                                            placeholder="enter the address"
                                            autoComplete="off"
                                            name="address"
                                            className="form-control"
                                            value={this.state.address}
                                            onChange={this.changeAddressHandler}
                                        />
                                        <label>DATE OF BIRTH</label>
                                        <br />
                                        <DatePicker
                                            className="form-control"
                                            onChange={this.changeDobHandler}
                                            value={this.state.dob}
                                            dateFormat="dd/MM/yyyy"
                                            showYearDropdown
                                            showMonthDropdown
                                            scrollableYearDropdown
                                            scrollableMonthDropdown
                                            maxDate={new Date()}
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
