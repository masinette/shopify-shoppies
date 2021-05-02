import {Button} from 'react-bootstrap';

export default function NotClickable(props){

  return (

      <Button 
        variant="primary" 
        type="submit" 
        disabled
        onClick={(event) => {
          // event.preventDefault()
          // props.handleNominate( props.title, props.year, props.index )
          }
        }
      >
        Nominate
      </Button>

  )
}