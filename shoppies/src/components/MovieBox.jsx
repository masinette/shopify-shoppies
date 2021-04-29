import { Form, Card, Button, CardDeck } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MovieBox() {
  const movieTitle = "Jumanji"
  const omdbUrl = `http://www.omdbapi.com/?apikey=91c918d&t=${movieTitle}`;
  const [movieInfo, setMovieInfo] = useState();

//query the omdB api for movie title, refresh on url changes
  useEffect(() =>{
    axios({
      method: "GET",
      url: omdbUrl,
    })
    .then(res =>{
      setMovieInfo(res.data)
    })
    console.log("MOVIEINFO",movieInfo)
  }, [omdbUrl])



  return (
    <div>
        <Card>
          {/* <Card.Header as="h5">Nominations</Card.Header> */}
          <Card.Body>
            {/* <Card.Title>Special title treatment</Card.Title> */}
            <Card.Text>
              <Form>
                <Form.Group>
                  <Form.Label>Movie Title</Form.Label>
                  <Form.Control type="text" placeholder= " Enter movie title here..." />
                </Form.Group>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>

      <CardDeck>
        <Card>
          <Card.Header as="h5">Results for:</Card.Header>
          <Card.Body>
            <Card.Title>""</Card.Title>
            <Card.Text>
              <ul>
                <li><p>Movie Title<Button variant="primary">Nominate</Button></p></li>
                <li><p>Movie Title<Button variant="primary">Nominate</Button></p></li>
                <li><p>Movie Title<Button variant="primary">Nominate</Button></p></li>
                {/* <MoviesList /> */}
              </ul>
            </Card.Text>
            
          </Card.Body>
        </Card>

        <Card>
          <Card.Header as="h5">Nominations</Card.Header>
          <Card.Body>
            {/* <Card.Title>Special title treatment</Card.Title> */}
            <Card.Text>
              <ul>
                <li><p>Movie Title<Button variant="primary">Remove</Button></p></li>
                <li><p>Movie Title<Button variant="primary">Remove</Button></p></li>
                <li><p>Movie Title<Button variant="primary">Remove</Button></p></li>
                {/* <NomsList /> */}
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>


    </div>
  );
}