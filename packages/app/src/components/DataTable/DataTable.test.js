import React from 'react';
import {
  render,
} from '@testing-library/react';
import DataTable from './DataTable';

describe('<DataTable />', () => {
  let container;
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
    container = render(
      <DataTable
        data={data}
        columns={columns}
        onView={mockView}
        onEdit={mockEdit}
        onDelete={mockDelete}
      />,
    );
  });

  describe('Render', () => {
    it('renders correctly', () => {
      expect(container).toMatchSnapshot();
    });

    it('DEBUG', () => {
      const { debug } = container;
      debug();
    });

    it.todo('renders headers correctly');
    it.todo('renders rows number correctly');
  });
  
  describe('Behaviour', () => {
    describe('onClick of view button', () => {
      it.todo('should call onView action');
    });

    describe('onClick of edit button', () => {
      it.todo('should call onEdit action');
    });

    describe('onClick of delete button', () => {
      it.todo('should call onDelete action');
    });
  });
});
