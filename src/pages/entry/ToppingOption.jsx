import { Col } from 'react-bootstrap';
import { mockURL } from './../../mocks/api';

export const ToppingOption = ({ name, imagePath, updateItemCont }) => (
  <Col xs={12} sm={6} md={4} lg={3} style={{ texalign: 'center' }}>
    <img
      style={{ width: '75%' }}
      src={`${mockURL}${imagePath}`}
      alt={`${name} topping`}
    />
  </Col>
);
