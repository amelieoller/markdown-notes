import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Search from './Search';

configure({ adapter: new Adapter() });

describe('<Search />', () => {
  it('renders', () => {
    const mockFn = jest.fn();

    shallow(<Search setSearchFilter={mockFn} />);
  });

  it('matches the snapshot', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Search setSearchFilter={mockFn} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});
