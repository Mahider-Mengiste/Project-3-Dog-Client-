import { useState, useEffect } from 'react'

import { useParams, useNavigate } from 'react-router-dom'
// useParams will allow us to see our parameters
// useNavigate will allow us to navigate to a specific page

import { Container, Card, Button } from 'react-bootstrap'

import LoadingScreen from '../shared/LoadingScreen'
import { getOneDog, updateDog, removeDog } from '../../api/dogs'
import messages from '../shared/AutoDismissAlert/messages'
import EditDogModal from './EditDogModal'
import NewLeashModal from '../leashes/NewLeashModal'
import ShowLeash from '../leashes/ShowLeash'

// We need to get the dog's id from the parameters
// Then we need to make a request to the api
// Then we need to display the results in this component

// we'll use a style object to lay out the leash cards
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const ShowDog = (props) => {
    const [dog, setDog] = useState(null)
    const [editModalShow, setEditModalShow] = useState(false)
    const [leashModalShow, setLeashModalShow] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { id } = useParams()
    const navigate = useNavigate()
    // useNavigate returns a function
    // we can call that function to redirect the user wherever we want to

    const { user, msgAlert } = props
    console.log('user in props', user)
    console.log('the dog in showDog', dog)
    // destructuring to get the id value from our route parameters

    // useEffect(() => {
    //     getOneDog(id)
    //         .then(res => setDog(res.data.dog))
    //         .catch(err => {                   
    //             msgAlert({
    //                 heading: 'Error getting dog',
    //                 message: messages.getDogsFailure,
    //                 variant: 'danger'
    //             })
    //             navigate('/')
    //             //navigate back to the home page if there's an error fetching
    //         })
    // }, [updated])

     useEffect( function ()  {
    async function getMyDog () {
        const myDog = await  getOneDog(id)
        setDog(myDog.data.dog)
        console.log("this is my dog", myDog)
    }
    getMyDog()
    }, [])

    // here we'll declare a function that runs which will remove the dog
    // this function's promise chain should send a message, and then go somewhere
    const removeTheDog = () => {
        removeDog(user, dog.id)
            // on success send a success message
            .then(() => {
                msgAlert({
                    heading: 'Success',
                    message: messages.removeDogSuccess,
                    variant: 'success'
                })
            })
            // then navigate to index
            .then(() => {navigate('/')})
            // on failure send a failure message
            .catch(err => {                   
                msgAlert({
                    heading: 'Error removing dog',
                    message: messages.removeDogFailure,
                    variant: 'danger'
                })
            })
    }
    let leashCards
    if (dog) {
        if (dog.leashes.length > 0) {
            leashCards = dog.leashes.map(leash => (
                <ShowLeash
                    key={leash._id}
                    leash={leash}
                    dog={dog}
                    user={user}
                    msgAlert={msgAlert}
                    triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
    }

    if (!dog) {
        return <LoadingScreen />
    }

    return (
        <>
            <Container className="fluid">
                <Card>
                    <Card.Header>{ dog.breedAge }</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <div><small>Age: { dog.age }</small></div>
                            <div><small>Type: { dog.dogType}</small></div>
                            <div><small>
                                trainable: { dog.trainable? 'yes' : 'no'}
                            </small></div>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <Button onClick={() => setLeashModalShow(true)}
                            className="m-2" variant="info"
                        >
                            Give {dog.dogType} a leash!
                        </Button>
                        {
                            dog.owner && user && dog.owner._id === user._id 
                            ?
                            <>
                                <Button onClick={() => setEditModalShow(true)} 
                                    className="m-2" 
                                    variant="warning"
                                >
                                    Edit Dog
                                </Button>
                                <Button onClick={() => removeTheDog()}
                                    className="m-2"
                                    variant="danger"
                                >
                                    delete {dog.dogType} 
                                </Button>
                            </>
                            :
                            null
                        }
                    </Card.Footer>
                </Card>
            </Container>
            <Container style={cardContainerLayout}>
                {leashCards}
            </Container> 
            
            <EditDogModal 
                user={user}
                dog={dog} 
                show={editModalShow} 
                updateDog={updateDog}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setEditModalShow(false)} 
            />
            <NewLeashModal 
                dog={dog}
                show={leashModalShow}
                user={user}
                msgAlert={msgAlert}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setLeashModalShow(false)} 
            />
        </>
    )
}

export default ShowDog