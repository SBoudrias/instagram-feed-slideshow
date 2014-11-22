var url = require('url');

module.exports = {
	instagram: {
		id     : process.env.INSTAGRAM_ID,
		secret : process.env.INSTAGRAM_SECRET,
		callbackUrl: url.resolve(process.env.URL || "http://dummy.com", "/newphoto")
	},
	hashtag: process.env.INSTAGRAM_HASHTAG || 'cat',
	title: process.env.APP_NAME || 'Instagram feed demo'
};
