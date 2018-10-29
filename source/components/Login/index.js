// Core
import React, { Component } from 'react';

// Instruments
import Styles from './styles.m.css';
import { func } from "prop-types";

export default class Login extends Component {
    static propTypes = {
        _login: func.isRequired,
    };

    _login = () => {
        const { _login } = this.props;

        _login();
    };

    render () {
        return (
            <section className = { Styles.login }>
                <button onClick = { this._login }>Login</button>
            </section>
        );
    }
}
