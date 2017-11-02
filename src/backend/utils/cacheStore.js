import { AsyncStorage } from 'react-native'

const CACHE_PREFIX = 'cachestore-'
const CACHE_EXPIRATION_PREFIX = 'cacheexpiration-'
const EXPIRY_UNITS = 1000 // Time resolution in seconds

function currentTime () {
  return Math.floor((new Date().getTime()) / EXPIRY_UNITS)
}

/**
 * NAME: CacheStore
 * CREATOR: STEVEN
 * Provides the functions to store and get value from cache within pre-defined interval time (in seconds)
 * FUNCTION
 * get()
 * set()
 * remove()
 * isExpired()
 * flush()
 * flushExpired()
 */
const CacheStore = {
  /**
   * NAME: get
   * PARAMS: key
   * Get the value of specified key if it's still in the cache
   * RETURN value of specified key
   */
  get (key) {
    const theKey = CACHE_PREFIX + key
    const exprKey = CACHE_EXPIRATION_PREFIX + key

    return AsyncStorage.getItem(exprKey).then((expiry) => {
      if (expiry && currentTime() >= parseInt(expiry, 10)) {
        AsyncStorage.multiRemove([exprKey, theKey])

        return Promise.reject(new Error('Key does not exist or already expired'))
      }
      return AsyncStorage.getItem(theKey).then((item) => {
        return Promise.resolve(JSON.parse(item))
      })
    })
  },

  /**
   * NAME: set
   * PARAMS: key, value, time
   * Set the value for the key which is valid in the pre-defined interval time
   * RETURN
   */
  set (key, value, time) {
    const theKey = CACHE_PREFIX + key
    const exprKey = CACHE_EXPIRATION_PREFIX + key
    if (time) {
      return AsyncStorage.setItem(exprKey, (currentTime() + time).toString()).then(() => {
        return AsyncStorage.setItem(theKey, JSON.stringify(value))
      })
    } else {
      AsyncStorage.removeItem(exprKey)
      return AsyncStorage.setItem(theKey, JSON.stringify(value))
    }
  },

  /**
   * NAME: remove
   * PARAMS: key
   * Remove the key from cache if exists
   * RETURN
   */
  remove (key) {
    return AsyncStorage.multiRemove([CACHE_EXPIRATION_PREFIX + key, CACHE_PREFIX + key])
  },

  /**
   * NAME: isExpired
   * PARAMS: key
   * Check whether the key is still valid in cache
   * RETURN
   */
  isExpired (key) {
    const exprKey = CACHE_EXPIRATION_PREFIX + key
    return AsyncStorage.getItem(exprKey).then((expiry) => {
      var expired = expiry && currentTime() >= parseInt(expiry, 10)
      return expired ? Promise.resolve() : Promise.reject(new Error('Key is not expired'))
    })
  },

  /**
   * NAME: flush
   * Flush all the keys out of cache
   * RETURN
   */
  // flush () {
  //   return AsyncStorage.getAllKeys().then((keys) => {
  //     var theKeys = keys.filter((key) => {
  //       return key.indexOf(CACHE_PREFIX) === 0 || key.indexOf(CACHE_EXPIRATION_PREFIX) === 0
  //     })
  //     return AsyncStorage.multiRemove(theKeys)
  //   })
  // },

  /**
   * NAME: flushExpired
   * Flush all the expired keys out of cache
   * RETURN
   */
  flushExpired () {
    return AsyncStorage.getAllKeys().then((keys) => {
      keys.forEach((key) => {
        if (key.indexOf(CACHE_EXPIRATION_PREFIX) === 0) {
          var exprKey = key
          return AsyncStorage.getItem(exprKey).then((expiry) => {
            if (expiry && currentTime() >= parseInt(expiry, 10)) {
              var theKey = CACHE_PREFIX + key.replace(CACHE_EXPIRATION_PREFIX, '')
              return AsyncStorage.multiRemove([exprKey, theKey])
            }
            return Promise.resolve()
          })
        }
        return Promise.resolve()
      })
    })
  }
}

// Always flush expired items on start time
CacheStore.flushExpired()

export default CacheStore
