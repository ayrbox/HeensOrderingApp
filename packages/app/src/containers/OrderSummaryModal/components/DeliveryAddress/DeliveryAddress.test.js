import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import DeliveryAddress from './DeliveryAddress';
import { ORDER_TYPES } from '../../../../constants';

const sampleDeliveryAddress = {
  name: 'Mr. Customer',
  address: 'Customer Road',
  postCode: 'T3ST 1DD',
  contactNo: '020 1234 5678',
};

describe('<DeliveryAdress />', () => {
  afterEach(cleanup);

  it('should not render if not delivery', () => {
    const { container } = render(
      <DeliveryAddress
        type="table"
        deliveryAddress={sampleDeliveryAddress}
        onChange={jest.fn()}
      />,
    );
    expect(container).toBeEmpty();
  });

  it('should render correctly', () => {
    const mockOnChange = jest.fn();
    const { getByTestId, getByLabelText } = render(
      <DeliveryAddress
        type="delivery"
        deliveryAddress={sampleDeliveryAddress}
        onChange={mockOnChange}
      />,
    );

    expect(getByTestId('delivery-title')).toHaveTextContent(ORDER_TYPES.delivery);

    const inputName = getByLabelText(/Name/);
    expect(inputName.value).toEqual(sampleDeliveryAddress.name);

    const inputAddress = getByLabelText(/Address/);
    expect(inputAddress.value).toEqual(sampleDeliveryAddress.address);

    const inputPostcode = getByLabelText(/Post code/);
    expect(inputPostcode.value).toEqual(sampleDeliveryAddress.postCode);

    const inputContactNo = getByLabelText(/Contact no/);
    expect(inputContactNo.value).toEqual(sampleDeliveryAddress.contactNo);

    // test on change of values
    fireEvent.change(inputName, { target: { value: 'Mr. Hello' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...sampleDeliveryAddress,
      name: 'Mr. Hello',
    });

    fireEvent.change(inputAddress, { target: { value: 'Hello Road' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...sampleDeliveryAddress,
      address: 'Hello Road',
    });

    fireEvent.change(inputPostcode, { target: { value: 'P001' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...sampleDeliveryAddress,
      postCode: 'P001',
    });

    fireEvent.change(inputContactNo, { target: { value: '020 9876 5432' } });
    expect(mockOnChange).toHaveBeenCalledWith({
      ...sampleDeliveryAddress,
      contactNo: '020 9876 5432',
    });
  });
});
