import React from 'react';
import axios from 'axios';
import { render, waitForElement } from '@testing-library/react';
import Fetch from './Fetch';
import '@testing-library/jest-dom/extend-expect';

jest.mock('axios');

describe('<Fetch />', () => {
  it('renders loading, fetch and renders resolved data', async () => {
    axios.get.mockResolvedValueOnce({
      data: {
        "foo": "bar"
      },
    });
    const { getByTestId } = render(<Fetch url="http://mockurl.com/endpoint/">
      {({ loading, data }) => {
        if (loading) {
          return (<div data-testid="el-loading">Loading...</div>);
        }
        return (<div data-testid="el-data">{JSON.stringify(data)}</div>);
      }}
    </Fetch>);

    expect(getByTestId('el-loading')).toHaveTextContent('Loading...');
    const resolvedData = await waitForElement(() => getByTestId("el-data"));
    expect(resolvedData).toHaveTextContent(/{"foo":"bar"}/);
  });

  it('renders loading, fetch and renders errors', async () => {
    axios.get.mockRejectedValueOnce({
      response: {
        error: 'Testing Error'
      }
    });

    const { getByTestId } = render(<Fetch url="http://mockurl.com/endpoint/">
      {({ loading, data, error }) => {
        if (loading) {
          return (<div data-testid="el-loading">Loading...</div>);
        }
        if(error) {
          return (<div data-testid="el-error">{JSON.stringify(error)}</div>)
        }
        return (<div data-testid="el-data">{JSON.stringify(data)}</div>);
      }}
    </Fetch>);

    expect(getByTestId('el-loading')).toHaveTextContent('Loading...');
    const err = await waitForElement(() => getByTestId("el-error"));
    expect(err).toHaveTextContent(/{"response":{"error":"Testing Error"}}/);
  });
});