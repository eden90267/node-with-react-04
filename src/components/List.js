import React from 'react';

const List = (props) => {
  let todos = Array.from(props.list.todos);
  return (
    <div>
      {
        todos.map(i =>
          <p
            key={i.id}
            onClick={() => props.itemClick(i.id)}
            style={{
              textDecoration: i.completed ? 'line-through' : 'none'
            }}
          >
            {i.text}
          </p>
        )
      }
    </div>
  )
};

export default List;