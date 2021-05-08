import React from 'react';
import ReactDOM from 'react-dom';
import ColorHuePicker from './index';
import { mount } from 'enzyme';

// test('defaultValue', () => {
//   const container = document.createElement('div');
//   ReactDOM.render(<ColorHuePicker defaultValue="#22c1c3" />, container);

//   expect(container.querySelector('.color-slider').style.backgroundColor).toBe(
//     'rgb(0, 252, 255)',
//   );
// });

// test('value', () => {
//   const picker = shallow(<ColorHuePicker value="#22c1c3" />);
//   const sliderEl = picker.find('.color-slider');

//   [
//     (['backgroundColor', 'rgb(0, 252, 255)'], ['left', '50.20703933747411%']),
//   ].map(([prop, expectVal]) => {
//     expect(sliderEl.style[prop]).toBe(expectVal);
//   });

//   console.log(sliderEl);
// });

describe('props', () => {
  let wrapper;

  function _mount(node) {
    return mount(node, document.body);
  }

  afterEach(() => {
    wrapper && wrapper.unmount();
    wrapper = null;
  });

  test('value', () => {
    let changed = false;
    wrapper = _mount(
      <ColorHuePicker value="#22c1c3" onChange={() => (changed = true)} />,
    );

    const sliderEl = wrapper.find('.color-slider').getDOMNode();

    [
      ['backgroundColor', 'rgb(0, 252, 255)'],
      ['left', '50.20703933747411%'],
    ].map(([prop, expectVal]) => {
      expect(sliderEl.style[prop]).toBe(expectVal);
    });

    wrapper.setProps({ value: '#252988' });

    // [
    //   ['backgroundColor', 'rgb(0, 252, 255)'],
    //   ['left', '50.20703933747411%'],
    // ].map(([prop, expectVal]) => {
    //   expect(sliderEl.style[prop]).toBe(expectVal);
    // });
  });
});
