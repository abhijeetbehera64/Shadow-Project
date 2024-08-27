import { GET_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA } from './actiontypes';

const initialState = {
  data: []
}

const GetReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DATA: return {
      ...state,
      data: action.payload
    }

    case ADD_DATA: return {
      ...state,
      data: action.payload
    }

    case UPDATE_DATA: return {
      ...state,
      data: action.payload
    }

    case DELETE_DATA: return {
      ...state,
      data: action.payload
    }
    default: return state
  }
}
export default GetReducer