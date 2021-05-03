import {Card} from 'react-bootstrap';

export default function MovieCard(props){

  return (
    <Card>
      <Card.Header as="h5">Results for "{props.movieTitle}"</Card.Header>
      <Card.Header as="h5">Results for "{props.movieTitle}"</Card.Header>
      <Card.Body>
        <Card.Text>
          <ul>
            {props.moviesList}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}