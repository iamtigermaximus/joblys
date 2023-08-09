import { Container, ErrorText } from './ErrorContainer.styles';

interface ErrorContainerProps {
  error: string;
}

const ErrorContainer = ({ error }: ErrorContainerProps) => {
  return (
    <Container>
      {/* <img src={alertSvg} alt="alert" className="alert" /> */}
      <ErrorText>{error}</ErrorText>
    </Container>
  );
};

export default ErrorContainer;
