import { Form, Card, ToggleButton, Button, CardDeck, InputGroup, Col, Alert, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './MovieBox.css';
import './buttons/Clickable';
import Clickable from './buttons/Clickable';
import NotClickable from './buttons/NotClickable';
import MovieCard from './cards/MovieCard';


export default function MovieBox() {
  const [movieTitle, setMovieTitle] = useState("");
  const omdbUrl = `http://www.omdbapi.com/?apikey=91c918d&s=${movieTitle}&type=movie`;
  const [movieInfo, setMovieInfo] = useState([{ Search: "", Year: "", Title: ""}]);
  const [nominationList, setNominationList] = useState([]);
  // const [disabled, setDisabled] = useState(false)
  const [show, setShow] = useState(false);
  const [titles, setTitles] = useState([]);
  // const [checked, setChecked] = useState(false, disabled);

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
  
//update titlelist any time niominationlist is changed 
//updates 'nominate' button click, to disable button on click
  useEffect(()=>{
    const titlesList = nominationList.map((movie)=> movie.title + movie.year)
    setTitles(titlesList)
  }, [nominationList])

  //handle selection of 'nominate' button, add selected movie to nominations list
  const handleNominate = (title, year, index) =>{
    //limit nomination list to five entries
    if (nominationList.length < 5){
      //append selected nomination to list,with movie title and year
      setNominationList(nominationList => [...nominationList, {title: title, year: year, id: index, nominated: true}])
    }
    //when nomination list is full, alert user
    if (nominationList.length === 4){
      setShow(true)
    }
  }

  function NominationLimitAlert() {
    if (show) {
      return (
        <Alert variant="info" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Congratulations, you've chosen <b>5</b> films!</Alert.Heading>
          <p>
            Please note: 
            If you'd like to change your current nominations, you may remove titles 
            from your list and add new ones.
          </p>
        </Alert>
      );
    }
    return "";
  }

  const handleRemoveNomination = (index, title, year) => {
    //remove movie from nomination list
    const newList = nominationList.filter(nom => nom.title+nom.year !== title+year)
    //replace nominations list with NEW filtered list. Do not splice as it changes list in state
      setNominationList(newList)
      // setTitles(newList.map((movie)=> movie.title + movie.year))
  }

  const findNominated = (movieTitle, movieYear) => {
    //check if clicked title is in nomination list
    const found = titles.find(title => title === movieTitle+movieYear)
    if (found) {
      return true;
    } else {
      return false;
    }
  }


//hold movieList in state to eliminate empty button?
  const moviesList = movieInfo.map((movie, index)=>{
  //map through movies from user input and add to results list
    return (
      <li>
        {/* prevent default to stop page refresh on form submission */}
        <form onSubmit={(event)=> event.preventDefault()}>
          {movie.Title} ({movie.Year})

          {/* if movie is already nominated, disable to nominate button */}
          {findNominated(movie.Title, movie.Year) ? <NotClickable/> : <Clickable 
            handleNominate={handleNominate} 
            title={movie.Title} 
            year={movie.Year} 
            />}
        </form> 
      </li> 
    )
  });

  function nominationsListView(nominationList){
    const nominationListView = nominationList.map((movie, index)=>{

      return (
        <li>
          <form onSubmit={(event)=> event.preventDefault()}>
            {movie.title} ({movie.year})
            <Button 
              id={movie.index}
              variant="info" 
              type="submit" 
              onClick={(event) => {
                event.preventDefault()
                handleRemoveNomination( {index}, movie.title, movie.year )
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
    <div class="wrapper">
      <Card>
        <Card.Body>
          <Card.Text>
            {/* <Col> */}
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
            {/* </Col> */}
          </Card.Text>
        </Card.Body>
      </Card>

      {nominationList.length>4 && <NominationLimitAlert />}

      <CardDeck>
        <MovieCard header= "Results for: " cardTitle={movieTitle} list={moviesList}/>
        <MovieCard header= "Nominations" list={renderedNoms}/>
      </CardDeck>
    </div>
  );
}