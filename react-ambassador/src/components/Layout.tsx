import React, {Dispatch, useEffect, useState} from 'react';
import Nav from "./Nav";
import Header from "./Header";
import axios from "axios";
import {Redirect, useLocation} from "react-router-dom";
import {User} from "../models/user";
import {setUser} from "../redux/actions/setUserAction";
import {connect} from "react-redux";

const Layout = (props: any) => {
    const location = useLocation();

    useEffect(() => {
        (
            async () => {
                try {
                    const {data} = await axios.get('user');

                    props.setUser(data);
                } catch (e) {
                    console.log(e);
                }
            }
        )();
    }, []);

    let header;

    if (location.pathname === '/' || location.pathname === '/backend') {
        header = <Header/>;
    }

    return (
        <div>
            <Nav/>

            <main>

                {header}

                <div className="album py-5 bg-light">
                    <div className="container">

                        {props.children}

                    </div>
                </div>
            </main>
        </div>
    );
};

const mapStateToProps = (state: { user: User }) => ({
    user: state.user
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    setUser: (user: User) => dispatch(setUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
