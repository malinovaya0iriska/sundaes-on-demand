import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { ScoopOption } from './ScoopOption';
import { ToppingOption } from './ToppingOption';
import { ENDPOINTS, mockURL } from './../../mocks/api';

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  const ItemComponent =
    optionType === ENDPOINTS.SCOOPS ? ScoopOption : ToppingOption;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  useEffect(() => {
    axios
      .get(`${mockURL}${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  return <Row>{optionItems}</Row>;
};
