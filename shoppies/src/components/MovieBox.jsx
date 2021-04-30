import { Form, Card, Button, CardDeck, InputGroup, FormControl, Col } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MovieBox() {
  const [movieTitle, setMovieTitle] = useState("");
  const omdbUrl = `http://www.omdbapi.com/?apikey=91c918d&s=${movieTitle}`;
  const [movieInfo, setMovieInfo] = useState([{ Search: "", Year: "", Title: ""}]);

//query the omdB api for movie title, refresh on url changes
  useEffect(() =>{
    axios({
      method: "GET",
      url: omdbUrl,
    })
    .then(res =>{
      if(res.data.Search) {
        setMovieInfo(res.data.Search)
      } else {
        setMovieInfo(["Nothing"])
      }
    })
    // .catch()
  }, [omdbUrl])
  
  //map through movies from user input and add to results list
  const moviesList = movieInfo.map((movie)=>{
    return (
      <li>{movie.Title} ({movie.Year})<Button variant="info">Nominate</Button></li> 
    )
  });



  return (
    <div>
        <Card>
          <Card.Body>
            <Card.Text>
              <Col>
                <Form onSubmit={(event)=> event.preventDefault()} >
                  <Form.Group>
                    <Form.Label>Movie Title</Form.Label>

                    <InputGroup className="mb-2">
                      <InputGroup.Prepend>
                        <InputGroup.Text>&#128269;</InputGroup.Text>
                      </InputGroup.Prepend>
                        <Form.Control 
                          type="text" 
                          placeholder= "Enter movie title here..." 
                          onChange={(event)=> setMovieTitle(event.target.value)}
                        />
                    </InputGroup>
                    
                  </Form.Group>
                </Form>
              </Col>
            </Card.Text>
          </Card.Body>
        </Card>

      <CardDeck>

        <Card>
          <Card.Header as="h5">Results for:</Card.Header>
          <Card.Body>
            <Card.Title>{movieTitle}</Card.Title>
            <Card.Text>
              <ul>
                { moviesList }
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