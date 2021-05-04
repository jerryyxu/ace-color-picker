import React from 'react';
import ReactDOM from 'react-dom';
// import renderer from 'react-test-renderer';

import ColorPanel from './index';

// test('ColorPanel renders correctly', () => {
//   const panel = renderer.create(<ColorPanel />).toJSON();

//   expect(panel).toMatchSnapshot();
// });

test('Pick Color correctly', () => {
  const container = document.createElement('div');
  ReactDOM.render(<ColorPanel />, container);

  expect(container.querySelector('.picker-panel__point')).toBeNull();

  container
    .querySelector('.picker-panel')
    .dispatchEvent(new window.MouseEvent('mousedown'));

  // expect(container.querySelector('.picker-panel__point')).not.toBeNull();
});
