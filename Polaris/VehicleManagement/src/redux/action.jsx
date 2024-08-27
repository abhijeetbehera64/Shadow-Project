import { GET_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA } from './actiontypes';

export const GetData = (payload) => {
  return {
    type: GET_DATA,
    payload,
  }
}

export const AddData = (payload) => {
  return {
    type: ADD_DATA,
    payload,
  }
}

export const UpdateData = (payload) => {
  return {
    type: UPDATE_DATA,
    payload,
  }
}

export const DeleteData = (payload) => {
  return {
    type: DELETE_DATA,
    payload,
  }
}