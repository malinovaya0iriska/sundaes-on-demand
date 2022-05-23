import Button from 'react-bootstrap/Button';
import { ENDPOINTS } from '../../mocks/api';
import { Options } from './Options';
import { useOrderDetails } from './../../context/OrderDetailes';
import { ORDER_PHASE } from '../../constants';

export const OrderEntry = ({ setOrderPhase }) => {
  const [orderDetails] = useOrderDetails();
  const isDisabled = orderDetails.totals.scoops === '$0.00';

  return (
    <>
      <Options optionType={ENDPOINTS.SCOOPS} />
      <Options optionType={ENDPOINTS.TOPPINGS} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
      <Button
        onClick={() => setOrderPhase(ORDER_PHASE.REVIEW)}
        disabled={isDisabled}
      >
        Order!
      </Button>
    </>
  );
};
