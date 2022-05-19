import { OrderDetailsProvider } from './context/OrderDetailes';
import { Container } from 'react-bootstrap';
import { OrderEntry } from './pages/entry/OrderEntry';

function App() {
  return (
    <Container>
      <OrderDetailsProvider>
        <OrderEntry />
      </OrderDetailsProvider>
    </Container>
  );
}

export default App;
