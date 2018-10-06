// Core
import React, { Component } from 'react';

// Components
import { withProfile } from "../HOC/withProfile";
import { Consumer } from 'components/HOC/withProfile';

// Instruments
import Styles from './styles.m.css';

@withProfile
export default class StatusBar extends Component {
    render () {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <Consumer>
                {() => (
                    <section className = { Styles.statusBar } >
                        <button>
                            <img src = { avatar } />
                            <span> { currentUserFirstName } </span>
                            &nbsp;
                            <span> { currentUserLastName } </span>
                        </button>
                    </section>
                )}
            </Consumer>
        );
    }
}
