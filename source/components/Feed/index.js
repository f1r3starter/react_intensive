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
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
        this._removePost = this._removePost.bind(this);
    }

    state = {
        posts: [
            {
                id:      '123',
                comment: 'Test 1',
                created: 1538233989,
                likes:   [],
            },
            {
                id:      '789',
                comment: 'Test 2',
                created: 1538232989,
                likes:   [],
            }],
        isPostsFetching: false,
    };

    _setPostsFetchingState (state) {
        this.setState({
            isPostsFetching: state,
        });
    }

    async _createPost (comment) {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment().unix(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:           [post, ...posts],
            isPostsFetching: false,
        }));
    }

    async _likePost (id) {
        const { currentUserFirstName, currentUserLastName } = this.props;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        }
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    }

    async _removePost (id) {
        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = this.state.posts.filter((post) => post.id !== id);

        this.setState({
            posts:           newPosts,
            isPostsFetching: false,
        });
    }

    render () {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post } _likePost = { this._likePost } _removePost = { this._removePost } />;
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostsFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
