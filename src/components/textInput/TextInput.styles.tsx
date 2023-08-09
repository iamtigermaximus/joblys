import styled from '@emotion/styled';

export const QuestionContainer = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Container = styled('div')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid white;
  margin: 30px;
`;

export const ContainerQuestion = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

export const Input = styled('input')`
  margin-top: 32px;
  color: white;
  border: none;
  font-size: 20px;
  padding: 0px 0px 8px;
  border-bottom: 1px solid white;
  background: transparent;
  width: 400px;
  height: 80px;
  padding: 20px;
`;

export const InputContainer = styled('div')`
  width: 100%;
`;

export const QuestionText = styled('label')`
  color: white;
  border: none;
  font-size: 20px;
  padding: 0px 0px 8px;
  border-bottom: 1px solid white;
  padding: 32px;
  border: 1px solid green;
`;

export const QuestionSubtitle = styled('div')`
  font-size: 20px;
  line-height: 28px;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 8px;
`;
