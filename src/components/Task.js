import React from 'react';

const Task = ({ store, task, rootIndex }) => (
  <div key={task.realIndex}>
    {task.realIndex} {task.title} . {task.status}
    <input
      value={task.title}
      onChange={event =>
        store.updateToDoTask(rootIndex, task.realIndex, {
          title: event.target.value
        })
      }
    />
    <button onClick={() => store.deleteToDoTask(rootIndex, task.realIndex)}>
      Delete
    </button>
    <button
      onClick={() => store.toggleToDoTaskStatus(rootIndex, task.realIndex)}
    >
      Toggle
    </button>
  </div>
);

export default Task;
