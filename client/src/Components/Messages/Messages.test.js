import React from 'react';
import { shallow } from 'enzyme';
import Messages from './Messages';


describe('Messages', () => {
    it('should render correctly', () => {
        const messages = [ {'Adam' : 'Hi' }, { 'John' : 'How are you?' }];
        const component = shallow(<Messages messages = {messages} />);
          
          expect(component).toMatchSnapshot();
        });
  });