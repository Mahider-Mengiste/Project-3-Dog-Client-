import apiUrl from '../apiConfig'
import axios from 'axios'

// READ => INDEX
export const getAllDogs = () => {
    return axios(`${apiUrl}/dogs`)
}

// READ => SHOW
export const getOneDog = (id) => {
    return axios(`${apiUrl}/dogs/${id}`)
}

// CREATE
export const createDog = (user, newDog) => {
    // console.log('createDog in api was hit')
    // in our createdog form, we're building an object
    // when we pass that object into the api createDog function,
    // it's going to look like the dogs in our database
    // we're going to refer to this as newDog
    // console.log('this is user', user)
    // console.log('this is newDog', newDog)
	return axios({
		url: apiUrl + '/dogs',
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { dog: newDog }
	})
}

// UPDATE
export const updateDog = (user, updatedDog) => {
    // console.log('createDog in api was hit')
    // in our createdog form, we're building an object
    // when we pass that object into the api createDog function,
    // it's going to look like the dogs in our database
    // we're going to refer to this as newDog
    // console.log('this is user', user)
    console.log('this is updatedDog', updatedDog)
	return axios({
		url: `${apiUrl}/dogs/${updatedDog.id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { dog: updatedDog }
	})
}

// DELETE
export const removeDog = (user, dogId) => {
    return axios({
        url: `${apiUrl}/dogs/${dogId}`,
        method: 'DELETE',
        headers: {
            Authorization: `Token token=${user.token}`,
        }
    })
}