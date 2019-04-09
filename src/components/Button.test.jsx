import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';

configure({ adapter: new Adapter() });

describe('<Button />', () => {
  it('renders', () => {
    const mockFn = jest.fn();

    shallow(<Button text="Button Text" onClick={mockFn} />);
  });

  it('matches the snapshot', () => {
    const mockFn = jest.fn();
    const wrapper = mount(<Button text="Button Text" onClick={mockFn} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('updates via props', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<Button text="Button Text" onClick={mockFn} />);

    expect(toJSON(wrapper)).toMatchSnapshot();
    wrapper.setProps({ text: 'New Button Text' });
    expect(toJSON(wrapper)).toMatchSnapshot();
  });

  it('should call mock function when button is clicked', () => {
    const mockFn = jest.fn();
    const wrapper = shallow(<Button text="Button Text" onClick={mockFn} />);

    wrapper.simulate('click');
    expect(mockFn).toHaveBeenCalled();
  });
});
