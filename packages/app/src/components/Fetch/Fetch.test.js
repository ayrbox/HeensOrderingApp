import React from 'react';
import mockAxios from 'axios';
import { render, waitForElement } from '@testing-library/react';
import Fetch from './Fetch';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

const makeFetch = () => render(
  <Fetch url="http://mockurl.com/endpoint/">
    {({ loading, data, error }) => {
      if (loading) {
        return (<div data-testid="el-loading">Loading...</div>);
      }
      if (error) {
        return (
          <div data-testid="el-error">{JSON.stringify(error)}</div>
        );
      }
      return (<div data-testid="el-data">{JSON.stringify(data)}</div>);
    }}
  </Fetch>,
);

describe('<Fetch />', () => {
  it('renders loading, fetch and renders resolved data', async () => {
    const testData = {
      data: {
        foo: 'bar',
      },
    };

    mockAxios.get.mockResolvedValueOnce(testData);
    const { getByTestId } = makeFetch();

    expect(getByTestId('el-loading')).toHaveTextContent('Loading...');

    const resolvedData = await waitForElement(() => getByTestId('el-data'));
    expect(resolvedData).toHaveTextContent(JSON.stringify(testData.data));
  });

  it('renders loading, fetch and renders errors', async () => {
    const errResponse = {
      response: {
        error: 'Testing Error',
      },
    };

    mockAxios.get.mockRejectedValueOnce(errResponse);

    const { getByTestId } = makeFetch();
    expect(getByTestId('el-loading')).toHaveTextContent('Loading...');

    const err = await waitForElement(() => getByTestId('el-error'));
    expect(err).toHaveTextContent(JSON.stringify(errResponse));
  });
});
