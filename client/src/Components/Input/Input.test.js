import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import Input from './Input';


describe('Input', () => {
    it('Should render correctly', function(){
        const onSubmitFn = jest.fn();
        const component = renderer.create(<Input onSendMessage={onSubmitFn} placeholder={"Enter username"} buttonText={"Save"} name="username" />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it('calls onSubmit prop function when form is submitted', () => {
        const onSubmitFn = jest.fn();
        const wrapper = mount(<Input onSendMessage={onSubmitFn} placeholder={"Enter username"} buttonText={"Save"} name="username"/>);
        const form = wrapper.find('form');
        form.simulate('submit');
        expect(onSubmitFn).toHaveBeenCalledTimes(1);
      });
});
