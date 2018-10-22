// Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const props = {
    _createPost:          jest.fn(),
    avatar:               '',
    currentUserFirstName: '',
};

const comment = 'Test comment';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');

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

    test('should have 1 "input" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
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
});
