import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import DataTable from './DataTable';

describe('<DataTable />', () => {
  let wrapper;
  let debug;
  const mockView = jest.fn();
  const mockEdit = jest.fn();
  const mockDelete = jest.fn();
  const data = [{
    id: '2093482038',
    name: 'Test1',
    description: 'Test1 Description',
  },
  {
    id: '23947829374',
    name: 'Test2',
    description: 'Test2 Description',
  }];
  const columns = [{
    name: 'id',
    label: 'Id column',
    key: true,
    hidden: true,
  }, {
    name: 'name',
    label: 'Name',
  }, {
    name: 'description',
    label: 'Description',
  }];

  beforeEach(() => {
    wrapper = render(
      <DataTable
        data={data}
        columns={columns}
        onView={mockView}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />,
    );
    debug = wrapper.debug;
  });

  afterEach(cleanup);

  describe('Render', () => {
    it.skip('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('renders headers correctly', () => {
      const { getByTestId } = wrapper;
      getByTestId('data-table-headers');
      const row = getByTestId('data-table-headers-row');
      expect(row.children.length).toBe(3); // 1 hidden columne, 2 data colums, 1 action column
    });

    it('renders rows number correctly', () => {
      const { getByTestId } = wrapper;
      const body = getByTestId('data-table-body');
      expect(body.children.length).toBe(data.length); 
    });
  });
  
  describe('Behaviour', () => {
    describe('onClick of view button', () => {
      it.todo('should call onView action');
    });

    describe('onClick of edit button', () => {
      it.todo('should call onEdit action');
    });

    describe('onClick of button', () => {
      it.todo('should call onDelete action');
    });
  });
});
