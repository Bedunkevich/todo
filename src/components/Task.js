import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { STATUS } from '../const';
import { SmallButton } from '../ui';

const StyledItem = styled.li`
  input {
    padding: 8px;
    outline: none;
    margin-right: 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: medium;

    ${props =>
    props.isCompeleted &&
      'color: #777; text-decoration: line-through;'} :focus {
      border-bottom: 1px solid #111;
    }
  }
`;

const Task = ({ store, task, rootIndex }) => (
  <StyledItem isCompeleted={task.status === STATUS.COMPLETED}>
    <input
      value={task.title}
      onChange={event =>
        store.updateToDoTask(rootIndex, task.realIndex, {
          title: event.target.value
        })
      }
    />
    <SmallButton
      onClick={() => store.deleteToDoTask(rootIndex, task.realIndex)}
    >
      Delete
    </SmallButton>
    <SmallButton
      onClick={() => store.toggleToDoTaskStatus(rootIndex, task.realIndex)}
    >
      Toggle status
    </SmallButton>
  </StyledItem>
);

Task.propTypes = {
  store: PropTypes.object.isRequired,
  rootIndex: PropTypes.number.isRequired,
  task: PropTypes.object.isRequired
};

export default Task;
