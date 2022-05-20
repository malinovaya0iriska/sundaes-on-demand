import Col from 'react-bootstrap/Col';
import { mockURL } from './../../mocks/api';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export const ScoopOption = ({ name, imagePath, updateItemCount }) => {
  const handleChange = (event) => {
    updateItemCount(name, event.target.value);
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ texalign: 'center' }}>
      <img
        style={{ width: '75%' }}
        src={`${mockURL}${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group
        controlId={`${name}-count`}
        as={Row}
        style={{ marginTop: '10px' }}
      >
        <Form.Label xs='6' style={{ textAlign: 'right' }}>
          {name}
        </Form.Label>
        <Col xs='5' style={{ textAlign: 'left' }}>
          <Form.Control
            type='number'
            defaultValue={0}
            onChange={handleChange}
          ></Form.Control>
        </Col>
      </Form.Group>
    </Col>
  );
};
