import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

import {connect} from 'react-redux';

class Header extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      };

    selection = () => {
        this.setState({
          isOpen: false
        });
    };

    render() {
        let navbarClasses = ["navbar-collapse", "collapse"];
        if (this.state.isOpen) {
            navbarClasses.push('show');
        }

        let links = <NavLink className="nav-item nav-link" onClick={this.selection} to="/" exact>Home</NavLink>;
        let userSection = <NavLink className="nav-item nav-link" onClick={this.selection} to="/login" >Login</NavLink>;
        if(this.props.isAuth){
            links = <React.Fragment>
                    <NavLink className="nav-item nav-link" onClick={this.selection} to="/dashboard" exact>Home</NavLink>
                    <NavLink className="nav-item nav-link" onClick={this.selection} to="/quizzes">Quizzes</NavLink>
                    <NavLink className="nav-item nav-link" onClick={this.selection} to="/skills">Skills</NavLink>
                    <NavLink className="nav-item nav-link" onClick={this.selection} to="/reports" >Reports</NavLink>
                </React.Fragment>;

            userSection = <React.Fragment>
                <NavLink className="nav-item nav-link" onClick={this.selection} to="/" >Hi {this.props.username}!</NavLink>
                <NavLink className="nav-item nav-link" onClick={this.selection} to="/logout" >Logout</NavLink>
            </React.Fragment>;
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link className="navbar-brand" to="/">Awesome Quizzer</Link>
                    <button className="navbar-toggler" 
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#headerNavbar" 
                            aria-controls="headerNavbar" 
                            aria-expanded={this.state.isOpen ? "true" : "false"} 
                            aria-label="Toggle navigation"
                            onClick={this.toggle}>
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={navbarClasses.join(' ')} id="headerNavbar">
                        <div className="navbar-nav mr-auto">
                            {links}
                        </div>
                        <div className="navbar-nav">
                            {userSection}
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.username,
        isAuth: state.token !== null
    };
};

export default connect(mapStateToProps)(Header);