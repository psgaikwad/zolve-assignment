import { GET_DATA, GET_DATA_SUCCESS } from '../constants/actionTypes'

const items = (state = {}, action) => {
    switch (action.type) {
    case GET_DATA:
      return {
        ...state,
        isFetching: true
      }
    case GET_DATA_SUCCESS: {
			const { data } = action.payload;
      return {
        ...state,
				data: data.items,
				isFetching: false
      }
		}
    default:
      return state
  }
}

export default items;