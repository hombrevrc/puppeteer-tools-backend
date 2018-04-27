import ScheduleTypes from './scheduleTypes';

export default class ScheduleCreate {
  
  static getScheduleCron(scheduleTypes: ScheduleTypes = ScheduleTypes.Day, interval: Number = 1) {
    switch (scheduleTypes) {
      case ScheduleTypes.Second:
        return `*/${interval} * * * * *`
      case ScheduleTypes.Minute:
        return `* */${interval} * * * *`
      case ScheduleTypes.Hour:
        return `* * */${interval} * * *`
      case ScheduleTypes.Day:
        return `* * * */${interval} * *`
      case ScheduleTypes.Month:
        return `* * * * */${interval} *` 
      case ScheduleTypes.Year:
        return `* * * * * */${interval}` 
      default:
        return '* * * */1 * *'
    }
  }
}