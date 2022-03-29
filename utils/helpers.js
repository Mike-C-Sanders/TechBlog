module.exports = {
    format_date: (date) =>{
        return date.toLocaleDateString();
    },
    format_date: (date) =>{
        //using JS date method format the month/day/year
        return `${new Date(date).getMonth() +1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
    }
}