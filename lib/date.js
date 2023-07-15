export function prettyDate(dateStr){
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour:'numeric', minute:'numeric'};
    const dateTimeFormat = new Intl.DateTimeFormat('en-GB', options);
    if(dateStr){
        return dateTimeFormat.format(new Date(dateStr));
    }
    return ''
    
}