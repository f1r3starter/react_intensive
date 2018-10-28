// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Switch, Redirect, Route } from 'react-router-dom';

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

const localStorageIsLogged = 'isLogged';

@hot(module)
export default class App extends Component {
    state = {
        isLogged: false,
    };

    componentDidMount () {
        this.setState({
            isLogged: localStorage.getItem(localStorageIsLogged),
        });
    }

    _getPage = () => {
        const { isLogged } = this.state;

        return isLogged ? (
            <Switch>
                <Route component = { Feed } path = '/feed' />
                <Route component = { Profile } path = '/profile' />
                <Redirect to = '/feed' />
            </Switch>
        ) : <Profile />;
    };

    render () {
        const page = this._getPage();

        return (
            <Catcher>
                <Provider value = { options } >
                    <StatusBar />
                    { page }
                </Provider>
            </Catcher>
        );
    }
}
