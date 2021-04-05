import React from 'react';
import {Link} from 'react-router-dom';
import {User} from "../models/user";
import axios from "axios";
import {connect} from "react-redux";

const Nav = (props: { user: User | null }) => {
    return (
        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Company name</a>

            <ul className="my-2 my-md-0 mr-md-3">
                <Link to={'/profile'}
                      className="p-2 text-white text-decoration-none">{props.user?.first_name} {props.user?.last_name}</Link>
                <Link to={'/login'} className="p-2 text-white text-decoration-none"
                      onClick={async () => await axios.post('logout')}
                >Sign out</Link>
            </ul>
        </header>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    })
)(Nav);
