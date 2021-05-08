import React from 'react';
import ReactDOM from 'react-dom';
import SliderControl from './index';

test('defaultValue', () => {
  const container = document.createElement('div');
  ReactDOM.render(<SliderControl defaultValue={50} />, container);

  expect(container.querySelector('.color-slider').style.left).toBe('50%');
});

test('value', () => {
  const container = document.createElement('div');
  ReactDOM.render(<SliderControl value={50} />, container);

  expect(container.querySelector('.color-slider').style.left).toBe('50%');
});
