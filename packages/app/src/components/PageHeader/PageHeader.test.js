import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import PageHeader from './PageHeader';
import '@testing-library/jest-dom/extend-expect';

describe('<PageHeader />', () => {
  const mockAdd = jest.fn();

  const makePageHeader = (
    title = 'Page Title',
    subtitle = 'Sub Title',
    onAdd = mockAdd,
  ) => render(
    <PageHeader
      title={title}
      subTitle={subtitle}
      onAddClicked={onAdd}
    />,
  );

  afterEach(() => {
    cleanup();
    mockAdd.mockClear();
  });

  it('renders correctly', () => {
    const { container } = makePageHeader();
    expect(container).toMatchSnapshot();
  });

  it('renders title and sub title', () => {
    const { getByTestId } = makePageHeader();
    const h1 = getByTestId('mainTitle');
    expect(h1).toHaveTextContent('Page Title');

    expect(getByTestId('sub-title')).toHaveTextContent('Sub Title');
  });

  it('fires click methods', () => {
    const { getByTestId } = makePageHeader();
    fireEvent.click(getByTestId('btn-add'));

    expect(mockAdd).toHaveBeenCalled();
  });

  describe('when subtitle and add func not supplied', () => {
    it('should not content subtitle and add button', () => {
      const { queryByTestId } = render(
        <PageHeader title="here is a title" />,
      );

      expect(queryByTestId('sub-title')).toBeNull();
      expect(queryByTestId('btn-add')).toBeNull();
    });
  });
});
