
var ipc     = require('ipc')
  , fs      = require('fs')
  , lame    = require('lame')
  , Speaker = require('speaker')
  , util    = require('util')
  , events  = require('events')
  , _       = require('underscore');

module.exports = Player;

function errHandler(err) {
  if (err) throw err;
  return false;
}

var defaults = {
};

function Player(song, params) {
  if (!song) return false;
  this.song = song;
  this.options = _.extend(defaults, params);
  this.bindEvents();
  events.EventEmitter.call(this);
};

util.inherits(Player, events.EventEmitter);

Player.prototype.play = function(done) {
  var self = this;

  if (! done) this.on('done', _.isFunction(done) ? done : errHandler);
  if (! this.song) return false;

  play(this.song, function(err) {
    self.emit('done', err);
  }); 

  function play(song, callback) {
    fs.createReadStream(song)
      .pipe(new lame.Decoder())
      .on('format', function(f) {
        var speaker = new Speaker(f);
        self.speaker = {};
        self.speaker.readableStream = this;
        self.speaker.Speaker = speaker;
        self.emit('playing', song);
        // this is where the song acturaly played end,
        // can't trigger playend event here cause
        // unpipe will fire this speaker's close event.
        this.pipe(speaker).on('close', function() {
          self.emit('stopped', song);
        });
      })
      .on('finish', function() {
        self.emit('playend', song);
        // switch to next one
        callback(null);
      });
  }
}

/**
 *
 * Stop playing and unpipe stream.
 * No params for now.
 *
 **/
Player.prototype.stop = function() {
  if (!this.speaker) return false;
  this.speaker.readableStream.unpipe();
  this.speaker.Speaker.end();
  return false;
}

Player.prototype.getID3 = function(callback) {
  if (! this.song) return false;

  var self = this;
  var file = fs.createReadStream(this.song);
  var decoder = new lame.Decoder();
  decoder.on('id3v1', function (id3) {
    callback(id3);
  });
  decoder.on('id3v2', function (id3) {
    callback(id3);
  });
  file.pipe(decoder);
}

/**
 *
 * Bind some useful events
 * @events.playing: on playing, keeping play history up to date.
 *
 **/
Player.prototype.bindEvents = function() {
  var self = this;
  this.on('playing', function(song) {
    self.playing = song;
  });
}
