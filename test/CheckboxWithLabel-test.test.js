// import {cleanup, fireEvent, render} from '@testing-library/react';
// import React from 'react';
// // import App from '../src/App.jsx';
// import CheckboxWithLabel from '../client/src/components/CheckboxWithLabel.jsx';

// // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// // unmount and cleanup DOM after the test is finished.
// afterEach(cleanup);

// it('CheckboxWithLabel changes the text after click', () => {
//   const {queryByLabelText, getByLabelText} = render(
//     <CheckboxWithLabel labelOn="On" labelOff="Off" />,
//   );

//   expect(queryByLabelText(/off/i)).toBeTruthy();

//   fireEvent.click(getByLabelText(/off/i));

//   expect(queryByLabelText(/on/i)).toBeTruthy();
// });

test('test', () => {
  expect(true).toBe(true);
});