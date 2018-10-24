// Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const avatar = 'test.png';

const currentUserFirstName = 'Test User Name';

const comment = 'Test comment';

const props = {
    _createPost: jest.fn(),
    avatar,
    currentUserFirstName,
};

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');

describe('Composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('textarea placeholder should have proper value', () => {
        expect(result.find('textarea').prop('placeholder')).toBe(`What's on your mind, ${currentUserFirstName}?`);
    });

    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('image src should be equal to avatar', () => {
        expect(result.find('img').prop('src')).toBe(avatar);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('textarea initial value should be empty', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('_updateComment should be invoked once after "textarea" change', () => {
        expect(_updateCommentSpy).toHaveBeenCalledTimes(1);
    });

    test('should handle form "submit" event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost should be invoked once after form submitted', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit should be invoked once after form submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('should handle form "submit" event on "Enter" key press', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });
        result.find('textarea').simulate('keyPress', { key: 'Enter' });

        expect(result.state()).toEqual(initialState);
    });

    test('_submitOnEnter should be invoked once after "Enter" key press', () => {
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
    });
});
