import {Button} from 'react-bootstrap';

export default function Clickable(props){

  return (

      <Button 
        variant="primary" 
        type="submit" 
        disabled={false} 
        onClick={(event) => {
          // event.preventDefault()
          props.handleNominate( props.title, props.year, props.index )
          }
        }
      >
        Nominate
      </Button>

  )
}