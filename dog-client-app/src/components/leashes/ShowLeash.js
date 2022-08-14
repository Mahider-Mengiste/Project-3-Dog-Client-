import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditLeashModal from './EditLeashModal'
import { deleteLeash } from '../../api/leashes'

const ShowLeash = (props) => {
    // destructure some props
    const { leash, dog, user, msgAlert, triggerRefresh } = props

    // here's where we'll put a hook to open the edit leash modal when we get there
    const [editModalShow, setEditModalShow] = useState(false)

    // this will set a color depending on the leash's condition
    const setBgCondition = (cond) => {
        if (cond === 'leather') {
            return({width: '18rem', backgroundColor:'#b5ead7'})
        } else if (cond === 'nylon') {
            return({width: '18rem', backgroundColor:'#ffdac1'})
        } else if (cond === 'chain') {
            return({width: '18rem', backgroundColor:'black'})
        } else {
            return({width: '18rem', backgroundColor:'#ff9aa2'})
        }
    }

    // calls this to destroy a leash
    const destroyLeash = () => {
        deleteLeash(user, dog._id, leash._id)
            .then(() => 
                msgAlert({
                    heading: 'Leash Deleted',
                    message: 'Bye bye leash!',
                    variant: 'success'
                }))
            .then(() => triggerRefresh())
            .catch(() => 
                msgAlert({
                    heading: 'Oh no!',
                    message: 'Something went wrong!',
                    variant: 'danger'
                }))
    }

    return (
        <>
            <Card className="m-2" style={setBgCondition(leash.condition)}>
                <Card.Header>{leash.leashType}</Card.Header>
                <Card.Body>
                    <small>{leash.quantity}</small><br/>
                    <small>
                        {leash.isChangedFrequently  ? 'squeak squeak' : 'stoic silence'}
                    </small>
                </Card.Body>
                <Card.Footer>
                    <small>Material: {leash.material}</small><br/>
                    {
                        user && user._id === dog.owner._id
                        ?
                        <>
                            <Button 
                                variant="warning"
                                onClick={() => setEditModalShow(true)}
                            >
                                Edit Leash
                            </Button>
                            <Button 
                                onClick={() => destroyLeash()} 
                                variant="danger"
                            >
                                Delete Leash
                            </Button>
                        </>
                        :
                        null
                    }
                </Card.Footer>
            </Card>
            <EditLeashModal
                user={user}
                dog={dog}
                leash={leash}
                show={editModalShow}
                handleClose={() => setEditModalShow(false)}
                msgAlert={msgAlert}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowLeash