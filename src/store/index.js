import {
  decorate,
  observable,
  action,
  configure,
  // computed,
  autorun,
  runInAction
} from 'mobx';
import { pullAt as _pullAt } from 'lodash';
import { LOCAL_STORAGE_STATE, STATUS } from '../const';

configure({ isolateGlobalState: true, enforceActions: 'never' });

class Store {
  initialData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_STATE)) || {
    toDoList: []
  };

  toDoList = this.initialData.toDoList;
  lastId = this.initialData.lastId;

  // Create new ToDo list
  createToDoList = ({ title }) => {
    runInAction(() => {
      this.toDoList.push({ title, tasks: [] });
    });
  };

  // Update ToDo list element
  updateToDoList = (index, object) => {
    const newObject = { ...this.toDoList[index], ...object };
    runInAction(() => {
      this.toDoList[index] = newObject;
    });
  };

  // Switch ToDo list positions
  moveToDoListBetweenTwoIndex = (index, index2) => {
    let newObject = [...this.toDoList];
    newObject[index] = [
      newObject[index2],
      (newObject[index2] = newObject[index])
    ][0];
    runInAction(() => {
      this.toDoList = newObject;
    });
  };

  // Move TodoList up
  moveToDoListUp = index => {
    if (!index) return;
    this.moveToDoListBetweenTwoIndex(index, index - 1);
  };

  // Move TodoList down
  moveToDoListDown = index => {
    if (index >= this.toDoList.length - 1) return;
    this.moveToDoListBetweenTwoIndex(index, index + 1);
  };

  // Update ToDo list Task element
  updateToDoTask = (rootIndex, index, object) => {
    const newObject = { ...this.toDoList[rootIndex].tasks[index], ...object };
    runInAction(() => {
      this.toDoList[rootIndex].tasks[index] = newObject;
    });
  };

  // Toggle ToDo list Task status
  toggleToDoTaskStatus = (rootIndex, index) => {
    this.updateToDoTask(rootIndex, index, {
      status:
        this.toDoList[rootIndex].tasks[index].status === STATUS.PENDING
          ? STATUS.COMPLETED
          : STATUS.PENDING
    });
  };

  // Delete ToDo task
  deleteToDoTask = (rootIndex, index) => {
    runInAction(() => {
      _pullAt(this.toDoList[rootIndex].tasks, index);
    });
  };

  // Create ToDo Task
  createToDoTask = (index, object) => {
    runInAction(() => {
      this.toDoList[index].tasks.push(object);
    });
  };

  reaction = autorun(() => {
    const data = {
      toDoList: this.toDoList,
      lastId: this.lastId
    };
    localStorage.setItem(LOCAL_STORAGE_STATE, JSON.stringify(data));
  });
}

const DecoratedStore = decorate(Store, {
  toDoList: observable,
  createToDoList: action,
  createToDoTask: action,
  updateToDoList: action,
  deleteToDoTask: action,
  moveToDoListUp: action,
  moveToDoListDown: action,
  toggleToDoTaskStatus: action
});

export default DecoratedStore;
