import { 
    useState, 
    useEffect 
} from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import LoadingScreen from '../shared/LoadingScreen'
import { getAllDogs } from '../../api/dogs'
import messages from '../shared/AutoDismissAlert/messages'

// DogsIndex should make a request to the api
// To get all dogs
// Then display them when it gets them

// style for our card container
const cardContainerStyle = {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
}

const DogsIndex = (props) => {
    const [dogs, setDogs] = useState(null)
    const [error, setError] = useState(false)

    const { msgAlert } = props

    console.log('Props in DogsIndex', props)

    // useEffect( () => {
    //     console.log(props)
    //     getAllDogs()
    //         .then(res => setDogs(res.data.dogs))
    //         .catch(err => {
    //             msgAlert({
    //                 heading: 'Error Getting Dogs',
    //                 message: messages.getDogsFailure,
    //                 variant: 'danger',
    //             })
    //             setError(true)
    //         })
    // }, [])

    useEffect( function ()  {
    async function getMyDogs () {
        const myDogs = await getAllDogs() 
        setDogs(myDogs.data.dogs)
        console.log("this is my dogs", myDogs)
    }
    getMyDogs()
    }, [])

    if (error) {
        return <p>Error!</p>
    }

    // If dogs haven't been loaded yet, show a loading message
    if (!dogs) {
        return <LoadingScreen />
    } else if (dogs.length === 0) {
        return <p>No dogs yet. Better add some.</p>
    }

    const dogCards = dogs.map(dog => (
        <Card style={{ width: '30%', margin: 5 }} key={dog.id}>
            <Link to={`/dogs/${dog.id}`} style={{ textDecoration: 'none', color: 'black'}}><Card.Header style={{backgroundColor: 'pink', textAlign: 'center', fontSize: '40px', fontWeight: 'bold'}} >{dog.breedAge}</Card.Header></Link>
            <Card.Body>
                <Link to={`/dogs/${dog.id}`}><img src={dog.image} alt={dog.dogType}></img></Link>
            </Card.Body>
            <Card.Footer style={{backgroundColor: 'pink', color: 'brown', fontSize: '25px', fontWeight: 'bold' }}>
                <div>
                    <p>
                    trainable: { dog.trainable? 'yes' : 'no'}
                    </p>
                </div>
                <div>
                    <Link to={`/dogs/${dog.id}`}>View Dog{ dog.dogType}</Link>
                </div>
            </Card.Footer>
        </Card >

    ))

    return (
        <div style={ cardContainerStyle }>
            { dogCards }
        </div>
    )
}

export default DogsIndex