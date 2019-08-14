import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import DataTable from './DataTable';
import '@testing-library/jest-dom/extend-expect';
import { getByTestId as hasTestId, getByText } from '@testing-library/dom'

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

  afterEach(() => {
    cleanup();
    mockView.mockClear();
    mockEdit.mockClear();
    mockDelete.mockClear();
  });

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
      it('should call onView action', () => {
        const { getByTestId } = wrapper;
        const tableBody = getByTestId('data-table-body');
        const firstRow = tableBody.querySelector('tr'); // get first match
        hasTestId(firstRow, 'button-view').click();

        expect(mockView).toHaveBeenCalledWith(data[0].id); // onView is to be called with id of first data
      });
    });

    describe('onClick of edit button', () => {
      it('should call onEdit action', () => {
        const { getByTestId } = wrapper;
        const tableBody = getByTestId('data-table-body');
        const firstRow = tableBody.querySelector('tr'); // get first match
        hasTestId(firstRow, 'button-edit').click();

        expect(mockEdit).toHaveBeenCalledWith(data[0].id); // onEdit is to be called with id of first data
      });
    });

    describe('onClick of button', () => {
      it('should call onDelete action', () => {
        const { getByTestId, debug } = wrapper;
        const tableBody = getByTestId('data-table-body');
        const firstRow = tableBody.querySelector('tr'); // get first match
        hasTestId(firstRow, 'button-delete').click();
        
        // wait for confirmation modal
        getByTestId('confirm-modal');
        const modalMessageLabel = getByTestId('message-label');
        expect(modalMessageLabel).toHaveTextContent('Are you sure you want to delete ?');
        getByTestId('yes-button').click();

        // onDelete is to be called with id of first data
        expect(mockDelete).toHaveBeenCalledWith(data[0].id); 
      });

      it('should not call onDelete action when no button is clicked', () => {
        const { getByTestId } = wrapper;
        const tableBody = getByTestId('data-table-body');
        const firstRow = tableBody.querySelector('tr'); // get first match
        hasTestId(firstRow, 'button-delete').click();
        
        // wait for confirmation modal
        getByTestId('confirm-modal');
        const modalMessageLabel = getByTestId('message-label');
        expect(modalMessageLabel).toHaveTextContent('Are you sure you want to delete ?');
        getByTestId('no-button').click();

        // onDelete is not to be called with if no button is clicked 
        expect(mockDelete).not.toHaveBeenCalled();
      });
    });
  });
});

/*
 * TODO: Further test to be done on different data set
 * Test numbers of buttons being render depending on method
 * Test no action column is rendered if no methods are supplied
 * Test no hidden columns are rendered is specified as hidden 
 */
