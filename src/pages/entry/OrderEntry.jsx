import { ENDPOINTS } from '../../mocks/api';
import { Options } from './Options';

export const OrderEntry = () => (
  <>
    <Options optionType={ENDPOINTS.SCOOPS} />
    <Options optionType={ENDPOINTS.TOPPINGS} />
  </>
);
