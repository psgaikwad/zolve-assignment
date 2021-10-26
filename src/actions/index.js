import apiClient from '../api/source'
import * as types from '../constants/actionTypes'

const receiveData = data => ({
    type: types.GET_DATA_SUCCESS,
    payload: {
			data
		}
})

export const getData = () => dispatch => {
	apiClient.getData(data => {
			dispatch(receiveData(data))
	})
}
