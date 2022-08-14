import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createLeash = (user, dogId, newLeash) => {
    console.log('the user in createLeash', user)
    console.log('the newLeash in createLeash', newLeash)
	return axios({
		url: `${apiUrl}/leashs/${dogId}`,
		method: 'POST',
		data: { leash: newLeash }
	})
}

// UPDATE leash
export const updateLeash = (user, dogId, updatedLeash) => {
    console.log('this is updatedLeash', updatedLeash)
	return axios({
		url: `${apiUrl}/leashs/${dogId}/${updatedLeash._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { leash: updatedLeash }
	})
}

// DELETE leash
export const deleteLeash = (user, dogId, leashId) => {
	return axios({
		url: `${apiUrl}/leashs/${dogId}/${leashId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}