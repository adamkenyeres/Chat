import React from 'react';
import { shallow } from 'enzyme';
import Messages from './Messages';


describe('Messages', () => {
    it('should render correctly with one message', () => {
        const messages = [ { text: 'Hi How are you?', user: 'Adam' }];
        const component = shallow(<Messages messages = {messages} />);
          
          expect(component).toMatchSnapshot();
        });

    it('should render correctly', () => {
        const messages = [ { text: 'Hi', user: 'Adam' }, { text: 'Hi How are you?', user: 'John' } ];
        const component = shallow(<Messages messages = {messages} />);
          
          expect(component).toMatchSnapshot();
        });
  });