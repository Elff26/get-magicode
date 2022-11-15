const DateUtils = {
    dateConvertToEUA(date) {
        let separatedDate = date.split('/');
        let dateConverted = new Date(Number(separatedDate[2]), Number(separatedDate[1]) - 1, Number(separatedDate[0])).toISOString();

        return dateConverted.split('T')[0];
    },

    dateConvertToBrasil(date) {
        let separatedDate = date.split('-');
        let data = new Date(Number(separatedDate[0]), Number(separatedDate[1]) - 1, Number(separatedDate[2]));

        let day = data.getDate();
        let month = ('0' + data.getMonth() + 1).slice(-2);
        let year = data.getFullYear()

        return day + "/" + month + "/" + year;
    }
}

export default DateUtils;