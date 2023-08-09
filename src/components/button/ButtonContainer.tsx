import Button from './Button';
import { ContainerButton, PressEnter } from './ButtonContainer.styles';

interface ButtonContainerProps {
  buttonText: string;
  showPressEnter: boolean;
  handleButtonClick: () => void;
  showPressEnterText: string;
}

const ButtonContainer = ({
  buttonText,
  showPressEnter,
  handleButtonClick,
  showPressEnterText,
}: ButtonContainerProps) => {
  return (
    <ContainerButton>
      <Button buttonText={buttonText} handleButtonClick={handleButtonClick} />
      {showPressEnter && (
        <PressEnter>
          press <strong>{showPressEnterText} ↵</strong>
        </PressEnter>
      )}
    </ContainerButton>
  );
};

export default ButtonContainer;
