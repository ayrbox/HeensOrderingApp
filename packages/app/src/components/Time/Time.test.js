import React from 'react';
import moment from 'moment';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import Time from './Time';

describe('<Header />', () => {
  it('<Header />', () => {
    const now = new Date();
    const expected = moment().format('LT');
    const { getByTestId } = render(<Time date={now} />);
    const timeLabel = getByTestId('time-label');
    expect(timeLabel).toHaveTextContent(expected);
  });
});
