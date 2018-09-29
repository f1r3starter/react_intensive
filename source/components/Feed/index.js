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
        posts:   [{ id: 123, comment: '1123', created: 1538233989 }],
        spinner: { isSpinning: false },
    };
    render () {
        const { posts, spinner } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner { ...spinner } />
                <StatusBar />
                <Composer />
                { postsJSX }
            </section>
        );
    }
}
