import * as types from '$/constants/types'

export function setOnBack (navigator) {
  return {
    type: types.SET_ONBACK,
    payload: navigator
  }
}

export const setDefaultOnback = (value) => {
  return (dispatch) => {
    dispatch(setOnBack(value))
  }
}
