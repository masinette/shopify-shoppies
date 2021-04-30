import { Form, Card, Button, CardDeck } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MovieBox() {
  const [movieTitle, setMovieTitle] = useState("Jumanji");
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
  // console.log("MOVIEINFO",movieInfo)
  
  const moviesList = movieInfo.map((movie)=>{

    return (
    <li>{movie.Title} ({movie.Year})<Button variant="info">Nominate</Button></li> 

    )
    // console.log(movie.Title)
  });



  return (
    <div>
        <Card>
          {/* <Card.Header as="h5">Nominations</Card.Header> */}
          <Card.Body>
            {/* <Card.Title>Special title treatment</Card.Title> */}
            <Card.Text>
              <Form 
                onSubmit={(event)=> event.preventDefault()} 
              >
                <Form.Group>
                  <Form.Label>Movie Title</Form.Label>
                  <Form.Control 
                  type="text" 
                  placeholder= " Enter movie title here..." 
                  onChange={(event)=> setMovieTitle(event.target.value)}
                  />
                </Form.Group>
                {/* <Button type="submit" onClick={(event)=> 
                  console.log("USERINPUT", event.target.value)
                }>Submit</Button> */}
              </Form>
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
                {/* <li><p>{movieInfo.Search[0].Title} ({movieInfo.Search[0].Year})<Button variant="info">Nominate</Button></p></li>
                <li><p>{movieInfo.Search[1].Title} ({movieInfo.Search[1].Year})<Button variant="info">Nominate</Button></p></li>
                <li><p>{movieInfo.Search[2].Title} ({movieInfo.Search[2].Year})<Button variant="info">Nominate</Button></p></li> */}
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