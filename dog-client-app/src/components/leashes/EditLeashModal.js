import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import LeashForm from '../shared/LeashForm'
import { updateLeash } from '../../api/leashes'


const EditLeashModal = (props) => {
    const { 
        user, dog, show, handleClose, msgAlert, triggerRefresh
    } = props

    const [leash, setLeash] = useState(props.leash)

    const handleChange = (e) => {
        setLeash(prevLeash => {
            let value = e.target.value
            const name = e.target.name

            // console.log('this is the input type', e.target.type)
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
        console.log('this is new', user, leash, dog._id,leash._id)

        updateLeash(user, dog._id, leash, leash._id)
            // if we're successful in the modal, we want the modal to close
            .then(() => handleClose())
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: 'Great! The leash is better than ever!',
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
                    heading="Update this leash!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditLeashModal