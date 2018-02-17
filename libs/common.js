function toDou(n) {
	return n < 10 ? '0' + n: '' + n;
};


module.exports = {
	time2date: function(timestamp) {
		let oDate = new Date();
		oDate.setTime(timestamp*1000);

		return oDate.getFullYear() + '/' + toDou(oDate.getMonth() + 1) + '/' + toDou(oDate.getDay()) + ' ' + toDou(oDate.getHours()) + ':' + toDou(oDate.getMinutes('')) + ':' + toDou(oDate.getSeconds());
	}
}