import { FormButton } from './Button.styles';

interface ButtonProps {
  buttonText: string;
  handleButtonClick: () => void;
}

const Button = ({ buttonText, handleButtonClick }: ButtonProps) => {
  return <FormButton onClick={handleButtonClick}>{buttonText}</FormButton>;
};

export default Button;
