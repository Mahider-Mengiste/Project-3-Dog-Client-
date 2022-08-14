import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import LeashForm from '../shared/LeashForm'
import { createLeash } from '../../api/leashes'


const NewLeashModal = (props) => {
    const { 
        user, dog, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [leash, setLeash] = useState({})

    console.log('dog in edit modal', dog)

    const handleChange = (e) => {
        setLeash(prevLeash => {
            let value = e.target.value
            const name = e.target.name

            console.log('this is the input type', e.target.type)

            // this handles the checkbox, changing on to true etc
            if (name === "isChangedFrequently" && e.target.checked) {
                value = true
            } else if (name === "isChangedFrequently" && !e.target.checked) {
                value = false
            }

            const updatedLeash = {
                [name]: value
            }
            return {
                ...prevLeash,
                ...updatedLeash
            }
        })
    }

    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createLeash(user, dog._id, leash)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The dog loves it!',
                    variant: 'success'
                })
            })
            .then(() => triggerRefresh())
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: 'Something went wrong, please try again',
                    variant: 'danger'
                })
            )
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton />
            <Modal.Body>
                <LeashForm 
                    leash={leash}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Give the dog a leash!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default NewLeashModal
