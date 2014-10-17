var storage = [];

exports.get = function (key) {
	return storage[key];
}

exports.set = function (key, value) {
	storage[key] = value;
}