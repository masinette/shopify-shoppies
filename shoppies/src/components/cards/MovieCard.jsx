import {Card} from 'react-bootstrap';

export default function MovieCard(props){

  return (
    <Card>
      {/* <Card.Header as="h5">Results for "{props.cardTitle}"</Card.Header> */}
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