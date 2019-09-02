import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import OrderNote from './OrderNote';

const sampleNote = `Lorem ipsum dolor sit amet consectetur adipisicing
  elit. Temporibus quibusdam consequuntur quas voluptate quidem provident,
  recusandae aut officiis saepe eaque? Labore fugiat et eveniet pariatur
  sunt asperiores, est unde sed.`;

describe('<OrderNote />', () => {
  afterEach(cleanup);

  it('should render with textbox input', () => {
    const mockOnChange = jest.fn();
    const {
      getByLabelText,
    } = render(
      <OrderNote
        note={sampleNote}
        onChange={mockOnChange}
      />,
    );
    // expect(getByLabelText('label-order-type')).toHaveTextContent('Table');

    const note = getByLabelText('Note');
    expect(note.value).toEqual(sampleNote);

    fireEvent.change(note, { target: { value: 'new note' } });
    expect(mockOnChange).toHaveBeenCalled();
  });
});
