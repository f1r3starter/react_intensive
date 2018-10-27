// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route } from 'react-router-dom';

// Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';
import Profile from 'components/Profile';
import StatusBar from 'components/StatusBar';

//Instruments
import avatar from 'theme/assets/lisa';

const options = {
    avatar,
    currentUserFirstName: 'Андрей',
    currentUserLastName:  'Филенко',
};

@hot(module)
export default class App extends Component {
    render () {
        return (
            <Catcher>
                <Provider value = { options } >
                    <StatusBar />
                    <Route component = { Feed } path = '/feed' />
                    <Route component = { Profile } path = '/profile' />
                </Provider>
            </Catcher>
        );
    }
}
