import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import reativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(reativeTime)
dayjs.extend(isToday)

export const now = () => {
    return dayjs().format('DD/MM/YYYY HH:mm')
}
export const formatDate = (date: Date | string) => {
    return dayjs(date).format('DD/MM/YYYY')
}
export const compareDateFromNow = (comparedDate: Date) => {
    const formattedComparedDate = dayjs(comparedDate)

    if (formattedComparedDate.isToday()) {
        return 'Today'
    }
    return dayjs().to(formattedComparedDate)
}
export const compareDates = (inputDate: Date, comparedDate: Date) => {
    return dayjs(inputDate).to(dayjs(comparedDate))
}
export const dateDiff = (inputDate: Date, diffDate: Date) => {
    return dayjs(inputDate).diff(dayjs(diffDate))
}
