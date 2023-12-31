import { Button } from '@mui/material';
import styled from '@emotion/styled';

export const FormButton = styled(Button)`
  background-color: rgb(0, 119, 255);
  padding: 6px 14px;
  min-height: 40px;
  outline: none;
  border: 1px solid transparent;
  margin: 0px;

  line-height: inherit;
  font-weight: 700;
  font-family: 'Questrial', sans-serif;
  cursor: pointer;
  transition-duration: 0.1s;
  transition-property: background-color, color, border-color, opacity,
    box-shadow;
  transition-timing-function: ease-out;
  color: white;
  border-radius: 4px;
  font-size: 20px;
`;
