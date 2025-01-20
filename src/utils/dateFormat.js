//import { format, isBefore, isAfter } from 'date-fns';

export const dateFormat = (dateStart, dateEnd) => {
  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());
    return localDate.toLocaleDateString('pt-BR');
  };

  return `${formatDate(dateStart)} - ${formatDate(dateEnd)}`;
};

export const formatDatetime = (dateTime) => {
  const [date, time] = dateTime.split(' ');
  const [year, month, day] = date.split('-');
  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = time.slice(0, 5);
  return `${formattedDate} - ${formattedTime}`;
}