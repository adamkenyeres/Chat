import React from 'react';
import { shallow } from 'enzyme';
import User from './User';


describe('User name', () => {

    it('should render correctly', () => {
        const user = 'Adam';
        const component = shallow(<User user={user} />);

        expect(component).toMatchSnapshot();
    });
});