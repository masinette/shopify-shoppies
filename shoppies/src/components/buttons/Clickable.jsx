import {Button} from 'react-bootstrap';

export default function Clickable(props){

  return (

      <Button 
        variant="primary" 
        type="submit" 
        disabled={false} 
        onClick={(event) => {
          // event.preventDefault()
          // props.setTitles( props.nominationList )
          props.setTitles(props.nominationList.map((movie)=> movie.title))
          props.handleNominate( props.title, props.year, props.index )
          }
        }
      >
        Nominate
      </Button>

  )
}