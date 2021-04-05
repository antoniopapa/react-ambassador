import React, {Dispatch, useState} from 'react';
import {connect} from "react-redux";
import {Link, NavLink, Redirect} from 'react-router-dom';
import {User} from "../models/user";
import axios from "axios";
import {setUser} from "../redux/actions/setUserAction";

const Nav = (props: any) => {
    const logout = async () => {
        await axios.post('logout');
        props.setUser(null);
    }

    let menu;

    if (props.user?.id) {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={'/rankings'} className="btn me-2">Rankings</Link>
                <Link to={'/stats'} className="btn me-2">Stats</Link>
                <a href="#" className="btn btn-outline-primary me-2"
                   onClick={logout}
                >Logout</a>
                <Link to={'/profile'} className="btn btn-primary">{props.user.first_name} {props.user.last_name}</Link>
            </div>
        )
    } else {
        menu = (
            <div className="col-md-3 text-end">
                <Link to={'/login'} className="btn btn-outline-primary me-2">Login</Link>
                <Link to={'/register'} className="btn btn-primary">Sign-up</Link>
            </div>
        )
    }

    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li>
                        <NavLink to='/' activeClassName='link-dark' exact
                                 className="nav-link px-2 link-secondary">Frontend</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/backend'} activeClassName='link-dark'
                                 className="nav-link px-2 link-secondary ">Backend</NavLink>
                    </li>
                </ul>

                {menu}
            </header>
        </div>
    );
};

export default connect(
    (state: { user: User }) => ({
        user: state.user
    }),
    (dispatch: Dispatch<any>) => ({
        setUser: (user: User) => dispatch(setUser(user))
    })
)(Nav);
