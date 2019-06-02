import React from 'react';
import Fetch from '../../../../components/Fetch';

const Menus = ({
  category,
}) => {
  console.log('TEST', 'test');
  return (
    <div style={{ padding: '10px' }}>
      <Fetch url="/api/menus">
        {({ loading, data }) => {
          if (loading) {
            return 'Loading......';
          }
          return data
            .filter(({ category: { _id: categoryId } }) => (category ? categoryId === category : true))
            .map(({ _id: id, name, price }) => (
              <button
                type="button"
                key={id}
              >
                {name}
                (£
                {price}
                )
              </button>
            ));
        }}
      </Fetch>
    </div>
  );
};

export default Menus;
