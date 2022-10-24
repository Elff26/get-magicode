const DateUtils = {
    dateConvertToEUA(date) {
        let separatedDate = date.split('/');
        return new Date(Number(separatedDate[2]), Number(separatedDate[1]) - 1, Number(separatedDate[0]));
    },

    dateConvertToBrasil(date) {
        let separatedDate = date.split('-');
        let data = new Date(Number(separatedDate[0]), Number(separatedDate[1]) - 1, Number(separatedDate[2]));

        return data.getDate() + "/" + data.getMonth() + 1 + "/" + data.getFullYear();
    }
}

export default DateUtils;