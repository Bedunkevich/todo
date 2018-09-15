import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SmallButton } from '../ui';

const StyledItem = styled.li`
  input {
    padding: 8px;
    outline: none;
    margin-right: 8px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: medium;

    :focus {
      border-bottom: 1px solid #111;
    }
  }
`;

const List = ({ store, index, list, handleClick }) => (
  <StyledItem>
    <input
      value={list.title}
      onClick={handleClick}
      onChange={event =>
        store.updateToDoList(index, { title: event.target.value })
      }
    />
    <SmallButton onClick={() => store.moveToDoListUp(index)}>Up</SmallButton>
    <SmallButton onClick={() => store.moveToDoListDown(index)}>
      Down
    </SmallButton>
    {` tasks ${list.tasks.length}`}
  </StyledItem>
);

List.propTypes = {
  store: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  list: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default List;
