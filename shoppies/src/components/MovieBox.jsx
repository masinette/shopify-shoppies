import { Form, Card, ToggleButton, Button, CardDeck, InputGroup, Col, Alert, ButtonGroup } from 'react-bootstrap';
import axios from 'axios';
import { useEffect, useState } from 'react';
import './MovieBox.css';
import './buttons/Clickable';
import Clickable from './buttons/Clickable';
import NotClickable from './buttons/NotClickable';


export default function MovieBox() {
  const [movieTitle, setMovieTitle] = useState("");
  const omdbUrl = `http://www.omdbapi.com/?apikey=91c918d&s=${movieTitle}&type=movie`;
  const [movieInfo, setMovieInfo] = useState([{ Search: "", Year: "", Title: ""}]);
  const [nominationList, setNominationList] = useState([]);
  const [disabled, setDisabled] = useState(false)
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
  
  //handle selection of 'nominate' button, add selected movie to nominations list
  function handleNominate(title, year, index){
    // setNominated(true) [DISABLES ALL THE BUTTONS]
    // console.log("INDEX", index)
    //limit nomination list to five entries

    if (nominationList.length < 5){
      //append selected nomination to list,with movie title and year
      setNominationList(nominationList => [...nominationList, {title: title, year: year, id: index, nominated: true}])
    console.log("NOMS", nominationList)

    // setTitles(nominationList.map((movie)=> movie.title))
    console.log("NTITLES", titles);
    // return titles;
    }
    if (nominationList.length === 4){
      //when nomination list is full, alert user
      setShow(true)
    }
setTitles(nominationList.map((movie)=> movie.title))
    // if (nominationList.id === id){
    //   setDisabled(true)
    // }
  }


  function AlertDismissibleExample() {
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

  const handleRemoveNomination = (index, title) => {
    //remove movie from nomination list
    const newList = nominationList.filter(nom => nom.title !== title)
    //replace nominations list with NEW filtered list. Do not splice as it changes list in state
      setNominationList(newList)
    console.log("REMOVE", index.index, newList.length)
  }

  // const disableClick = (movie) => {
  //   console.log("DISABLED",disabled, movie)
  //   // if (disabled === false) { setDisabled(true)} 
  //   setDisabled(movie);

  //   return setDisabled(true)
  // }


  // const clickable = (title, year, index) => {
  //   return (
  //   <button 
  //     variant="primary" 
  //     type="submit" 
  //     disabled={false} 
  //     onClick={(event) => {
  //       // event.preventDefault()
  //       handleNominate( title, year, index )

  //       }
  //     }
  //   >
  //     Nominate
  //   </button>
  //   )}

  //   const unclickable = (title, year, index) => {
  //     return (
  //     <button 
  //       variant="primary" 
  //       type="submit" 
  //       disabled={true} 
  //       // onClick={(event) => {
  //       //   // event.preventDefault()
  //       //   handleNominate( title, year, index )
  
  //       //   }
  //       // }
  //     >
  //       Nominate
  //     </button>
  //     )}




  const findNominated = (mtitle) => {
    const found = titles.find(title => title === mtitle)
    if (found) {
      return true;
    } else {
      return false;
    }
    console.log("FOUND",found);
  }

  //map through movies from user input and add to results list
  const moviesList = movieInfo.map((movie, index)=>{
    // let key = 0
    // console.log("list item refreshed", titles)
    return (
      <li>
        {/* prevent default to stop page refresh on form submission */}
        <form onSubmit={(event)=> event.preventDefault()}>
          {movie.Title} ({movie.Year}) {index}

          {/* <button 
            id={index}
            // class="active"
            // id={generateID()}
            variant="primary" 
            type="submit" 
            // onChange={(e)=> 
            //   // console.log("changed")
            //   // setDisabled(e.target.disabled)
            // }
            disabled={disabled}
            
            
            onClick={(event) => {
              // event.preventDefault()
              handleNominate( movie.Title, movie.Year, index )
              // disableClick(movie.nominated) //undefined
              // setDisabled(movie.nominated)
            }
          }
          >
            Nominate
          </button> */}

          {/* {clickable(movie.Title, movie.Year, index)} */}
          
          {findNominated(movie.Title) ? <NotClickable/> : <Clickable handleNominate={handleNominate} title={movie.Title} year={movie.Year} index={index}/>}
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
              id={movie.index}
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


// const disableButton = (id) => {
//   //map over nomination list, return new array
//   let chosenNoms = moviesList.map((movie)=>{
//     if (movie.id === id){
//       return {
//         ...moviesList
//       }
//     }
//     return moviesList
//   })
  
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
          <Card.Header as="h5">Results for "{movieTitle}"</Card.Header>
          <Card.Body>
            {/* <Card.Title>{movieTitle}</Card.Title> */}
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
            <AlertDismissibleExample />
          </Card.Body>
        </Card>
      </CardDeck>


    </div>
  );
}