import store from 'react-native-simple-store'

export default function createReducer (initialState, handlers) {
  return function reducer (state = initialState, action) {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}
export const checkStoreRedux = async (storeRedux, keyStore, action, initData) => {
  let data = await store.get(keyStore)
  typeof (initData) === 'string'
    ? !data ? storeRedux.dispatch(action(initData))
      : data !== initData && storeRedux.dispatch(action(data))
    : !data ? storeRedux.dispatch(action(initData))
      : data.length > 0 && storeRedux.dispatch(action(data))
}
export const saveStore = (keystore, data) => {
  store.save(keystore, data)
}
