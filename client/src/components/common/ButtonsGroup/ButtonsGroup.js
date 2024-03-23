import { ButtonGroup,Button } from "react-bootstrap";

const ButtonsGroup = ({ quantity, handleDecrement, handleIncrement }) => (
    <ButtonGroup size="lg" aria-label="Quantity" className="mx-3">
      <Button variant="outline-secondary" onClick={handleDecrement}>-</Button>
      <Button variant="outline-secondary">{quantity}</Button>
      <Button variant="outline-secondary" onClick={handleIncrement}>+</Button>
    </ButtonGroup>
);
  
export default ButtonsGroup;