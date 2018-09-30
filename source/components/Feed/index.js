// Core
import React, { Component } from 'react';

// Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts:     [{ id: 123, comment: 'Test 1', created: 1538233989 }, { id: 789, comment: 'Test 2', created: 1538232989 }],
        isLoading: false,
    };
    render () {
        const { posts, isLoading } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isLoading } />
                <StatusBar />
                <Composer />
                { postsJSX }
            </section>
        );
    }
}
