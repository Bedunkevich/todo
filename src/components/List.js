import React from 'react';

const List = ({ store, index, list, handleClick }) => (
  <div>
    {index}
    <input
      value={list.title}
      onClick={handleClick}
      onChange={event =>
        store.updateToDoList(index, { title: event.target.value })
      }
    />
    <button onClick={() => store.moveToDoListUp(index)}>Up</button>
    <button onClick={() => store.moveToDoListDown(index)}>Down</button>
    {` tasks ${list.tasks.length}`}
  </div>
);

export default List;
