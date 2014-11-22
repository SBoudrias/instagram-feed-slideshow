Instagram feed slideshow
========================

Node.js server fetching Instagram hashtag feed and pushing it through websockets on a real time slider.

**Disclaimer**: This is a project I builded a couple years ago for friends. It is still working, but it is not a project I maintain actively. If you find bugs, please send fixes; I probably won't fix them myself unless I need to.

### Install and run it

It is assumed you have installed Node.js (and npm), Ruby and Git on your computer.

```bash
# First install dependencies necessary for running the app
gem install bundler foreman

# Then we clone and prepare the project
git clone git@github.com:SBoudrias/instagram-feed-slideshow.git
cd instagram-feed-slideshow
npm install
bundle install

# Running won't work until you setup Instagram credentials
# See "configuration" section for details
foreman start
```

### Configuration

All the configs can be found in `www/config.js`.

If using Heroku, you can set config with `heroku config:set KEY=config`.

You can also use an `.env` file to run with `foreman start`, [heroku config plugin](https://github.com/ddollar/heroku-config) has commands to allow syncing this file with heroku server configurations.

Make sure to get your Instagram API credentials from their [developpers page](http://instagram.com/developer/clients/register/).

```
# inside .env file
APP_NAME="Cat Stream"
BUILDPACK_URL="https://github.com/ddollar/heroku-buildpack-multi.git"
INSTAGRAM_HASHTAG="cat"
INSTAGRAM_ID=""
INSTAGRAM_SECRET=""
URL="http://cat-stream.herokuapp.com/"
```

_Note that the buildpack is used to run multi environment on Heroku and run compass at build time._

### Customization

Apart from the configs, feel free to edit templates and overlay images to match your party style. Enjoy

### License

MIT 2014 - Simon Boudrias
