import formatISO from 'date-fns/formatISO';

export default (date) => {
    return formatISO(new Date(date), 
    { representation: 'date'});
};