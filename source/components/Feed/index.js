// Core
import React, { Component } from 'react';
import moment from 'moment';

// Components
import { withProfile } from "../HOC/withProfile";
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from "../../instruments";

@withProfile
export default class Feed extends Component {

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
        isSpinning: false,
    };

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment().unix(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:      [post, ...posts],
            isSpinning: false,
        }));
    };

    _likePost = async (id) => {
        const { currentUserFirstName, currentUserLastName } = this.props;
        const { posts } = this.state;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = posts.map((post) => {
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
            posts:      newPosts,
            isSpinning: false,
        });
    };

    _removePost = async (id) => {
        const { posts } = this.state;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = posts.filter((post) => post.id !== id);

        this.setState({
            posts:      newPosts,
            isSpinning: false,
        });
    };

    render () {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isSpinning } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                {postsJSX}
            </section>
        );
    }
}
