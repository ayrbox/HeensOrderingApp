import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import DataTable from './DataTable';
import '@testing-library/jest-dom/extend-expect';
import { getByTestId as hasTestId } from '@testing-library/dom'

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
      expect(row.children.length).toBe(3); // 1 hidden column, 2 data colums, 1 action column
    });

    it('renders rows number correctly', () => {
      const { getByTestId } = wrapper;
      const tableBody = getByTestId('data-table-body');

      const rows = Array.from(tableBody.children);
      expect(rows.length).toBe(data.length);
      rows.forEach((row, idx) => {
        // test if visible data are rendered correctly
        const cells = Array.from(row.children);
        expect(cells[0]).toHaveTextContent(data[idx]['name']); 
        expect(cells[1]).toHaveTextContent(data[idx]['description']);

        // test if all buttons are present
        const actionCell = cells[2];
        hasTestId(actionCell, 'button-view');
        hasTestId(actionCell, 'button-edit');
        hasTestId(actionCell, 'button-delete')
      });
    });
  });
  
  describe('Behaviour', () => {
    describe('onClick of view button', () => {
      it.skip('should call onView action', () => {
        const { getByTestId } = wrapper;
        const tableBody = getByTestId('data-table-body');
        // const row = tableBody.firstChild();
        console.log(tableBody.children);
      });
    });

    describe('onClick of edit button', () => {
      it.todo('should call onEdit action');
    });

    describe('onClick of button', () => {
      it.todo('should call onDelete action');
    });
  });
});
