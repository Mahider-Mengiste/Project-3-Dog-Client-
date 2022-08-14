import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import DogForm from '../shared/DogForm'
import { updateDogSuccess, updateDogFailure } from '../shared/AutoDismissAlert/messages'

const EditDogModal = (props) => {
    const { 
        user, show, handleClose, 
        updateDog, msgAlert, triggerRefresh
    } = props

    const [dog, setDog] = useState(props.dog)

    console.log('dog in edit modal', dog)

    const handleChange = (e) => {
        setDog(prevDog => {
            // updatedValue is a value of a variable 
            let updatedValue = e.target.value
            // updatedName is a variable name
            const updatedName = e.target.name
            // here we get datatype of a variable
            console.log('this is the input type', e.target.type)

            if (e.target.type === 'number') {
                // this is looking at the input type, and changing it from the default, which is a string, into an actual number
                updatedValue = parseInt(e.target.value)
            }

            // this handles the checkbox, changing on to true etc
            if (updatedName === "trainable" && e.target.checked) {
                updatedValue = true
            } else if (updatedName === "trainable" && !e.target.checked) {
                updatedValue = false
            }

            const updatedDog = {
                [updatedName]: updatedValue
            }
            return {
                ...prevDog,
                ...updatedDog
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        updateDog(user, dog)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: updateDogSuccess,
                    variant: 'success'
                })
            })
            // if everything is successful, we need to trigger our refresh for the show page
            // this is that setUpdated function in showDog component
            // updated is in ShowDog's useEffect's dependency array
            // changes to the updated boolean cause ShowDog's useEffect to run again.
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: updateDogFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <DogForm 
                    dog={dog}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Update dog"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditDogModal