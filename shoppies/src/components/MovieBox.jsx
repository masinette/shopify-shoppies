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
  function handleNominate(title, year, id){
      //append selected nomination to list,with movie title and year
      setNominationList(nominationList => [...nominationList, {title: title, year: year, id: id}])
    // console.log("INSIDE NOM HANDLER", nominationList)
  }



// useEffect(()=>{
//   console.log("Nomination changes")
//   nominationsListView(nominationList)
//   // setNominationList(nominationList)
// }, [nominationList])



  const handleRemoveNomination = (index, title) => {
    //remove movie from nomination list
    const newList = nominationList.filter(nom => nom.title !== title)
    //replace nominations list with NEW filtered list. Do not splice as it changes list in state
    setNominationList(newList)
    console.log("REMOVE", index.index, newList)
  }





  //map through movies from user input and add to results list
  const moviesList = movieInfo.map((movie, index)=>{
    // let key = 0
    return (
      <li>
      <form onSubmit={(event)=> event.preventDefault()}>
        {movie.Title} ({movie.Year})
        <Button 
          // id={(key+1)}
          variant="info" 
          type="submit" 
          onClick={(event) => 
          handleNominate( movie.Title, movie.Year)
          }
        >
          Nominate
        </Button>
       </form> 
      </li> 
    )
  });

  function nominationsListView(nominationList){
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
                handleRemoveNomination( {index}, movie.title )
                }
              }
            >
            Remove
          </Button>
          </form>
        </li>
      )
    }) 
    return nominationListView
  } 

const renderedNoms = nominationsListView(nominationList)


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
              { renderedNoms }
              </ul>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
    </div>
  );
}