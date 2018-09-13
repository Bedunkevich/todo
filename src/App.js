import React, { Component } from 'react';
import { observer } from 'mobx-react';
import logo from './logo.svg';
import './App.css';
import List from './components/List';
import Task from './components/Task';
import { STATUS } from './const';
import { isEmpty as _isEmpty } from 'lodash';

class App extends Component {
  state = {
    selectedList: undefined,
    filterBy: STATUS.ALL,
    filterString: undefined
  };

  createToDoList = () => {
    const { store } = this.props;

    store.createToDoList({ title: 'new list' });
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
      <div>
        <button
          onClick={() =>
            store.createToDoTask(rootIndex, {
              title: 'new task',
              status: STATUS.PENDING
            })
          }
        >
          Add New
        </button>

        <select
          onChange={event => this.setState({ filterBy: event.target.value })}
        >
          <option value={STATUS.ALL}>All</option>
          <option value={STATUS.PENDING}>Pending</option>
          <option value={STATUS.COMPLETED}>Completed</option>
        </select>

        <input
          placeholder="search"
          onChange={event =>
            this.setState({ filterString: event.target.value })
          }
        />

        {tasks.map(task => (
          <Task
            key={task.realIndex}
            store={store}
            task={task}
            rootIndex={rootIndex}
          />
        ))}
      </div>
    );
  };

  render() {
    const { store } = this.props;
    const { selectedList } = this.state;
    const { toDoList } = store;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React ToDo</h1>
        </header>

        <button onClick={this.createToDoList}>New</button>

        {toDoList.map((list, index) => (
          <List
            key={index}
            list={list}
            index={index}
            store={store}
            handleClick={this.selectTask(index)}
          />
        ))}
        <hr />
        {selectedList !== undefined && this.renderTasks(selectedList)}
      </div>
    );
  }
}

export default observer(App);
