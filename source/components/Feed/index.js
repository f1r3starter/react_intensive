// Core
import React, { Component } from 'react';

// Components
import { withProfile } from "../HOC/withProfile";
import Catcher from 'components/Catcher';
import Composer from 'components/Composer';
import Post from 'components/Post';
import StatusBar from 'components/StatusBar';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { api, TOKEN } from '../../config/api';

@withProfile
export default class Feed extends Component {

    state = {
        posts:      [],
        isSpinning: false,
    };

    componentDidMount () {
        this._fetchPosts();
        this.refetch = setInterval(this._fetchPosts, 1000);
    }

    componentWillUnmount () {
        clearInterval(this.refetch);
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const { data: posts } = await response.json();

        this.setState({
            posts,
            isSpinning: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({ comment }),
        });

        const { data: post } = await response.json();

        this.setState(({ posts }) => ({
            posts:      [post, ...posts],
            isSpinning: false,
        }));
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${api}/${id}`, {
            method:  'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { data: likedPost } = await response.json();

        this.setState(({ posts }) => ({
            posts: posts.map(
                (post) => post.id === likedPost.id ? likedPost : post,
            ),
            isPostsFetching: false,
        }));
    };

    _removePost = async (id) => {
        const { posts } = this.state;

        this._setPostsFetchingState(true);

        this._setPostsFetchingState(true);

        await fetch(`${api}/${id}`, {
            method:  'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

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
