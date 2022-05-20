import { useState } from 'react';
import { OrderDetailsProvider } from './context/OrderDetailes';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages/entry/OrderEntry';
import { OrderConfirmation } from './pages/confirmation/OrderConfirmation';
import { OrderSummary } from './pages/summary/OrderSummary';
import { ORDER_PHASE } from './constants';

function App() {
  const [orderPhase, setOrderPhase] = useState(ORDER_PHASE.IN_PROGRESS);

  let Component = OrderEntry;

  switch (orderPhase) {
    case ORDER_PHASE.IN_PROGRESS:
      Component = OrderEntry;
      break;
    case ORDER_PHASE.REVIEW:
      Component = OrderSummary;
      break;
    case ORDER_PHASE.COMPLETED:
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <OrderDetailsProvider>
      <Container>{<Component setOrderPhase={setOrderPhase} />}</Container>
    </OrderDetailsProvider>
  );
}

export default App;
