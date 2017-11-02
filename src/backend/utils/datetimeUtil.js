import moment from 'moment'

/**
 * NAME: CacheStore
 * CREATOR: STEVEN
 * Provides the utilities to control date time
 * FUNCTION
 * convertTimestampToDateTime()
 */
export default class DateTimeUtil {
  /**
   * NAME: convertTimestampToDateTime
   * PARAMS: timestamp (unix)
   * Convert the unix timestamp to date time
   * RETURN date time in the format YYYY/MM/DD h:mm a
   */
  static convertTimestampToDateTime (timestamp) {
    let time = moment(timestamp * 1000).format('YYYY/MM/DD h:mm a')
    return time
  }
}
