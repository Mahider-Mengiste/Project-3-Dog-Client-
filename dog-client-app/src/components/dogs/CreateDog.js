import { useState } from 'react'
import { createDog  } from '../../api/dogs'
import { useNavigate } from 'react-router-dom'
import { createDogSuccess, createDogFailure } from '../shared/AutoDismissAlert/messages'
import DogForm from '../shared/DogForm'

const CreateDog = (props) => {
    console.log('these are the props in createDog\n', props)
    const { user, msgAlert } = props

    const navigate = useNavigate()

    const [dog, setDog] = useState({
        dogType: '',
        image: '',
        age: '',
        trainable: false
    })

    console.log('this is dog in createDog', dog)

    const handleChange = (e) => {
        setDog(prevDog => {
            // updatedValue is the value of a variable
            let updatedValue = e.target.value
            // updatedName is the name of of the variable
            const updatedName = e.target.name
            // here we get the datatype of the variable
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

    // We'll add a handleSubmit here that makes an api request, then handles the response
    const handleSubmit = (e) => {
        // e equals the event
        e.preventDefault()

        createDog(user, dog)
            // if we're successful, navigate to the show page for the new dog
            .then(res => { navigate(`/dogs/${res.data.dog.id}`)})
            // send a success message to the user
            .then(() => {
                msgAlert({
                    heading: 'Oh Yeah!',
                    message: createDogSuccess,
                    variant: 'success'
                })
            })
            // if there is an error, tell the user about it
            .catch(() => 
                msgAlert({
                    heading: 'Oh No!',
                    message: createDogFailure,
                    variant: 'danger'
                })
            )
    }

    return (
        <DogForm 
            dog={ dog } 
            handleChange={ handleChange }
            handleSubmit={ handleSubmit }
            heading="Add a new dog!"
        />
    )
}

export default CreateDog