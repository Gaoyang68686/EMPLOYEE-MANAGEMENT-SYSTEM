import React, { Component } from "react";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div>
                            <a
                                href="https://github.com/Gaoyang68686"
                                className="navbar-brand"
                            >
                                EMPLOYEE MANAGEMENT SYSTEM
                            </a>
                        </div>
                    </nav>
                </header>
            </div>
        );
    }
}

export default Header;
