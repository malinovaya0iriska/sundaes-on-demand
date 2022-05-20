import { ENDPOINTS } from '../../mocks/api';
import { Options } from './Options';
import { useOrderDetails } from './../../context/OrderDetailes';

export const OrderEntry = () => {
  const [orderDetails] = useOrderDetails();

  return (
    <>
      <Options optionType={ENDPOINTS.SCOOPS} />
      <Options optionType={ENDPOINTS.TOPPINGS} />
      <h2>Grand total: {orderDetails.totals.grandTotal}</h2>
    </>
  );
};
