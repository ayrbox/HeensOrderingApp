import React from 'react';
import {
  render,
  cleanup,
} from '@testing-library/react';
import DataTable from './DataTable';
import '@testing-library/jest-dom/extend-expect';

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
      const tableBody = getByTestId('data-table-body');

      const rows = Array.from(tableBody.children);
      expect(rows.length).toBe(data.length);
      rows.forEach((row, idx) => {
        const cells = Array.from(row.children);
        expect(cells[0]).toHaveTextContent(data[idx]['name']); 
        expect(cells[1]).toHaveTextContent(data[idx]['description']);

        const buttons = Array.from(cells[2].children);
        expect(buttons.length).toBe(3);

        // const b = wrapper.container.querySelectorAll('[data-testid=button-view]')
        // console.log('B>>>>>>>>>>>', b)
        // buttons.find(b => {
        //   console.log(b['data-testid'], '\n\n>>>>', b);
        //   return true;
        // })

        // expect(buttons)
        // ('button-view');
        // getByTestId('button-edit');
        // getByTestId('button-delete');
        
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
