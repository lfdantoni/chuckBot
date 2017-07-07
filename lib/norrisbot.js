'use strict';

var util = require('util');
var path = require('path');
var fs = require('fs');
var SQLite = require('sqlite3').verbose();
var Bot = require('slackbots');

var NorrisBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'norrisbot';
    // this.dbPath = settings.dbPath || path.resolve(process.cwd(), 'data', 'norrisbot.db');

    // this.user = null;
    // this.db = null;
};
NorrisBot.prototype.run = function () {
    NorrisBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
   // this.on('message', this._onMessage);
};

NorrisBot.prototype._onStart = function () {
    // this._loadBotUser();
    // this._connectDb();
    // this._firstRunCheck();
    let self = this;
    const testFolder = '/Users/leonardodantoni/code/chuckBot';
    let config = {
        username: 'chuck', 
        //icon_url: 'https://avatars.slack-edge.com/2017-07-07/210194986534_33e1f0256d05d72160c9_48.png',
        as_user: true
    }

    self.postMessageToChannel('general', 'Hello channel! I am Chuck Norris', config);

    let files = self.walkSync(testFolder);
    self.postMessageToChannel('general', 'Files: ' + files, config);
        
//     fs.readdir(testFolder, (err, files) => {
//         self.postMessageToChannel('general', 'Files: ' + files, { username: 'chuck', icon_url: 'https://avatars.slack-edge.com/2017-07-07/210194986534_33e1f0256d05d72160c9_48.png'});
//         console.log(files);
// });
 //
    fs.readFile(testFolder + '/package.json', 'utf8', function (err,data) {
        if (err) {
            self.postMessageToChannel('general', 'Error: ' + err, config);
        }
        self.postMessageToChannel('general','Data: ' + data, config);
    });

};
NorrisBot.prototype.walkSync = function(dir) {
  let files = fs.readdirSync(dir);
  let filelist = [];
  console.log(files);
  files.forEach(function(file) {
    if (fs.statSync(dir + '/' + file).isDirectory()) {
      //filelist = NorrisBot.prototype.walkSync(dir + '/' + file, filelist);
    }
    else {
      filelist.push(file);
    }
  });
  return filelist;
};

// inherits methods and properties from the Bot constructor
util.inherits(NorrisBot, Bot);

module.exports = NorrisBot;