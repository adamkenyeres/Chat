import React from 'react';
import { shallow } from 'enzyme';
import OnlineUsers from './OnlineUsers';


describe('Online Users', () => {
    it('should render correctly with no user', () => {
        const users = [''];
        const component = shallow(<OnlineUsers users={users} />);

        expect(component).toMatchSnapshot();
    });
    
    it('should render correctly with one user', () => {
        const users = ['Adam'];
        const component = shallow(<OnlineUsers users={users} />);

        expect(component).toMatchSnapshot();
    });

    it('should render correctly with multiple users', () => {
        const users = ['Adam', 'John', 'Josh'];
        const component = shallow(<OnlineUsers users={users} />);

        expect(component).toMatchSnapshot();
    });
});