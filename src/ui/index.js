import styled from 'styled-components';

const Button = styled.button`
  border: 1px solid #ccc;
  border-radius: 0.2em;
  padding: 0.5em;
  background: white;
  color: black;
  font-size: medium;
  transition: all 0.2s ease;
  margin-right: 0.5em;
  cursor: pointer;
  :hover {
    background: #eee;
  }
`;

Button.displayName = 'Button';

const SmallButton = styled(Button)`
  font-size: small;
  padding: 0.2em 0.4em;
`;

SmallButton.displayName = 'SmallButton';

export { Button, SmallButton };
