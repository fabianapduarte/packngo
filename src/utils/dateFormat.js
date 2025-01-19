//import { format, isBefore, isAfter } from 'date-fns';

export const dateFormat = (dateStart, dateEnd) => {
  const formatDate = (date) => {
    const localDate = new Date(date);
    localDate.setMinutes(localDate.getMinutes() + localDate.getTimezoneOffset());
    return localDate.toLocaleDateString('pt-BR');
  };

  return `${formatDate(dateStart)} - ${formatDate(dateEnd)}`;
};