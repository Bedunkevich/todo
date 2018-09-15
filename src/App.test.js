import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import DecoratedStore from './store';
import { STATUS } from './const';
import { configure, mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-localstorage-mock';

configure({ adapter: new Adapter() });
const store = new DecoratedStore();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App store={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('ToDo tests', () => {
  const wrapper = mount(<App store={store} />);

  it('Should add new ToDo list', async () => {
    const AddNewListButton = shallow(wrapper.find('#add-new-list').get(0));
    AddNewListButton.simulate('click');
    expect(store.toDoList.length).toEqual(1);

    wrapper.update();
  });

  it('Should changes title of ToDo list', async () => {
    const List = shallow(wrapper.find('List').get(0));
    const input = List.find('input');
    input.simulate('change', { target: { value: 'My List' } });
    expect(store.toDoList[0].title).toBe('My List');

    input.simulate('click');
    wrapper.update();
  });

  it('Should add new task', async () => {
    const AddButton = shallow(wrapper.find('#add-new-task').get(0));
    AddButton.simulate('click');
    expect(store.toDoList[0].tasks.length).toEqual(1);

    wrapper.update();
  });

  it('Should change task title', async () => {
    const Task = shallow(wrapper.find('Task').get(0));
    const input = Task.find('input');
    input.simulate('change', { target: { value: 'My Task' } });
    expect(store.toDoList[0].tasks[0].title).toBe('My Task');

    wrapper.update();
  });

  it('Should change task state to complete', async () => {
    const Task = shallow(wrapper.find('Task').get(0));
    const DeleteButton = shallow(Task.find('SmallButton').get(1));
    DeleteButton.simulate('click');

    expect(store.toDoList[0].tasks[0].status).toBe(STATUS.COMPLETED);

    wrapper.update();
  });

  it('Should delete task', async () => {
    const Task = shallow(wrapper.find('Task').get(0));
    const DeleteButton = shallow(Task.find('SmallButton').get(0));
    DeleteButton.simulate('click');

    expect(store.toDoList[0].tasks.length).toEqual(0);

    wrapper.update();
  });
});
