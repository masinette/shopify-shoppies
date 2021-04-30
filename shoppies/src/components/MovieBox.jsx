import { Form, Card, Button, CardDeck, InputGroup, Col } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function MovieBox() {
  const [movieTitle, setMovieTitle] = useState("");
  const omdbUrl = `http://www.omdbapi.com/?apikey=91c918d&s=${movieTitle}&type=movie`;
  const [movieInfo, setMovieInfo] = useState([{ Search: "", Year: "", Title: ""}]);
  const [nominationList, setNominationList] = useState([]);

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
  
  //handle selection of 'nominate' button, add selected movie to nominations list
  function handleNominate(title, year){
      //append selected nomination to list,with movie title and year
      setNominationList(nominationList => [...nominationList, {title: title, year: year}])
  }




  function handleRemoveNomination(index){


    //remove movie from nomination list
    nominationList.splice(index.index, 1)
    //reset nominations list, without removed movie title
  // setNominationList(nominationList)
    console.log("REMOVE", index.index, nominationList)
  }





  //map through movies from user input and add to results list
  const moviesList = movieInfo.map((movie)=>{
    return (
      <li>
      <form onSubmit={(event)=> event.preventDefault()}>
        {movie.Title} ({movie.Year})
        <Button 
          id="nominate"
          variant="info" 
          type="submit" 
          onClick={(event) => 
          handleNominate( movie.Title, movie.Year )
          }
        >
          Nominate
        </Button>
       </form> 
      </li> 
    )
  });





useEffect(()=>{

}, [nominationList])

  // function nominationListView(nominationList){
    const nominationListView = nominationList.map((movie, index)=>{
      // const index = nominationList.indexOf(movie.title)
      return (
        <li>
          <form onSubmit={(event)=> event.preventDefault()}>
            {movie.title} ({movie.year})
            <Button 
              id={index}
              variant="info" 
              type="submit" 
              onClick={(event) => {
                event.preventDefault()
                handleRemoveNomination( {index} )
                }
              }
            >
            Remove
          </Button>
          </form>
        </li>
      )
    }) 
  // } 




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
              { nominationListView }
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}