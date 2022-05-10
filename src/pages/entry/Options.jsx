import axios from 'axios';
import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import { ScoopOption } from './ScoopOption';
import { mockAPI } from './../../mocks/api';

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);

  //TODO: replace null with ToppingOption
  const ItemComponent = optionType === 'scoop' ? ScoopOption : ScoopOption;

  const optionItems = items.map(({ name, imagePath }) => (
    <ItemComponent key={name} name={name} imagePath={imagePath} />
  ));

  useEffect(() => {
    axios
      .get(`${mockAPI}/${optionType}`)
      .then((response) => setItems(response.data))
      .catch((error) => {
        // TODO: handle error response
      });
  }, [optionType]);

  return <Row>{optionItems}</Row>;
};
