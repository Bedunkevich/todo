import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import List from './components/List';
import Task from './components/Task';
import { Button } from './ui';
import { STATUS } from './const';
import { isEmpty as _isEmpty } from 'lodash';

const MainContainer = styled.div`
  display: flex;
  margin: 1em;
`;

const ListsContainer = styled.ul`
  margin: 1em 0;
  padding: 0;
  list-style: none;
  line-height: 200%;
`;

const TaskListContainer = styled(ListsContainer)``;

const TasksContainer = styled.ul`
  margin-left: 16px;
  flex: 1;

  select {
    font-size: medium;
    margin-right: 1em;
  }

  input[type="topsearch"] {
    font-size: medium;
    padding: 0.5em;
    outline: none;
    border: 1px solid blue;
    border-radius: 1em;
  }
`;

class App extends Component {
  state = {
    selectedList: undefined,
    filterBy: STATUS.ALL,
    filterString: undefined
  };

  createToDoList = () => {
    const { store } = this.props;

    store.createToDoList({ title: '' });
  };

  selectTask = index => () => {
    this.setState({ selectedList: index });
  };

  renderList = (list, index) => {
    const { title } = list;
    const { store } = this.props;
    return (
      <div key={index}>
        {index}.
        <input
          value={title}
          onClick={this.selectTask(index)}
          onChange={event =>
            store.updateToDoList(index, { title: event.target.value })
          }
        />
        <button onClick={() => store.moveToDoListUp(index)}>Up</button>
        <button onClick={() => store.moveToDoListDown(index)}>Down</button>
      </div>
    );
  };

  renderTasks = rootIndex => {
    const { store } = this.props;
    const { filterBy, filterString } = this.state;
    let tasks = store.toDoList[rootIndex].tasks.map((task, index) => ({
      ...task,
      realIndex: index
    }));

    const escapeString =
      filterString && filterString.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

    if (filterBy !== STATUS.ALL) {
      if (!_isEmpty(escapeString)) {
        tasks = tasks.filter(
          task =>
            task.status === filterBy && task.title.search(escapeString) !== -1
        );
      } else {
        tasks = tasks.filter(task => task.status === filterBy);
      }
    } else if (!_isEmpty(escapeString)) {
      tasks = tasks.filter(task => task.title.search(escapeString) !== -1);
    }

    return (
      <TasksContainer>
        <Button
          id="add-new-task"
          onClick={() =>
            store.createToDoTask(rootIndex, {
              title: '',
              status: STATUS.PENDING
            })
          }
        >
          Add new task
        </Button>

        <select
          onChange={event => this.setState({ filterBy: event.target.value })}
        >
          <option value={STATUS.ALL}>All</option>
          <option value={STATUS.PENDING}>Pending</option>
          <option value={STATUS.COMPLETED}>Completed</option>
        </select>

        <input
          placeholder="search"
          type="topsearch"
          onChange={event =>
            this.setState({ filterString: event.target.value })
          }
        />

        <TaskListContainer>
          {tasks.map(task => (
            <Task
              key={task.realIndex}
              store={store}
              task={task}
              rootIndex={rootIndex}
            />
          ))}
        </TaskListContainer>
      </TasksContainer>
    );
  };

  render() {
    const { store } = this.props;
    const { selectedList } = this.state;
    const { toDoList } = store;

    return (
      <MainContainer>
        <div>
          <Button id="add-new-list" onClick={this.createToDoList}>
            Add new list
          </Button>

          <ListsContainer>
            {toDoList.map((list, index) => (
              <List
                key={index}
                list={list}
                index={index}
                store={store}
                handleClick={this.selectTask(index)}
              />
            ))}
          </ListsContainer>
        </div>
        {selectedList !== undefined && this.renderTasks(selectedList)}
      </MainContainer>
    );
  }
}

export default observer(App);
