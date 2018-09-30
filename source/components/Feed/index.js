// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from "../../instruments";

export default class Feed extends Component {
    constructor () {
        super();

        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts:     [{ id: 123, comment: 'Test 1', created: 1538233989 }, { id: 789, comment: 'Test 2', created: 1538232989 }],
        isLoading: false,
    };

    async _createPost (comment) {
        const post = {
            id:      getUniqueID(),
            created: moment().unix(),
            comment,
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts: [post, ...posts],
        }));
    }

    render () {
        const { posts, isLoading } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isLoading } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
