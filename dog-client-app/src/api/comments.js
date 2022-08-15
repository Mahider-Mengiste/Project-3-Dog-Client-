import apiUrl from '../apiConfig'
import axios from 'axios'

// CREATE
export const createComment = (user, dogId, newComment) => {
    console.log('the user in createComment', user)
    console.log('the newComment in createComment', newComment)
	return axios({
		url: `${apiUrl}/comments/${dogId}`,
		method: 'POST',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: newComment }
	})
}

// UPDATE comment
export const updateComment = (user, dogId, updatedComment) => {
    console.log('this is updatedComment', updatedComment)
	return axios({
		url: `${apiUrl}/comments/${dogId}/${updatedComment._id}`,
		method: 'PATCH',
		headers: {
			Authorization: `Token token=${user.token}`,
		},
		data: { comment: updatedComment }
	})
}

// DELETE comment
export const deleteComment = (user, dogId, commentId) => {
	return axios({
		url: `${apiUrl}/comments/${dogId}/${commentId}`,
		method: 'DELETE',
		headers: {
			Authorization: `Token token=${user.token}`,
		}
	})
}