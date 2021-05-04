import {Card, Alert} from 'react-bootstrap';
import {useState} from 'react';
// import nominationLimitAlert from '../MovieBox'

export default function MovieCard(props){
  const [show, setShow] = useState(false);

  return (
    <Card>
      <Card.Header as="h5"> {props.header} {props.cardTitle}</Card.Header>
      <Card.Body>
        <Card.Text>
          <ul>
            {props.list}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}