
var ipc     = require('ipc')
  , Player  = require('./js/player');

var player = new Player('/Users/yhbyun/work/atom-shell/exam1/my-app/test.mp3');

// Grab the shadow element
var shadow = document.getElementById("shadow");

// Custom function to calculate the shadow data from a Mikulas instance
function getShadowData(clock) {
  var opacity = 0.2, // default opacity/angle values
      angle = -45;
  if (clock.getElapsedMinutes() < 1140 && clock.getElapsedMinutes() > 300) {
    // calculate opacity based on minutes elapsed today
    opacity = (Math.sin((clock.getElapsedMinutes() / 4 - 90) * Math.PI / 180)).toFixed(2); // opacity best described by a sine function
    opacity = opacity < 0.2 ? 0.2 : opacity; // we don't want the shadow opacity to be less than 0.2
    // the angle varies from -90 to +90 during the "day"
    angle = (((1 - (clock.getElapsedMinutes() - 300) / 840) * 180) - 90).toFixed(2);
  }
  return {
    opacity: opacity,
    angle: angle
  };
}

// Custom function to set the shadow data
function setShadow(data, clock) {
  clock.rotateElement(shadow, data.angle);
  shadow.style.opacity = data.opacity;
}

// Custom function to set the background
function setBackground(minutes) {
  var r = 76,
      g = 107,
      b = 169,
      angle = minutes / 4 - 90, // used to calculate bg color variation
      p = Math.sin(angle * Math.PI / 180), // yay! trigonometry again!
      body = document.getElementsByTagName("body")[0], // grab the body element
      rgbvalue = "rgb(" + Math.floor(r + 25 * p) + ',' + Math.floor(g + 36 * p) + ',' + Math.floor(b + 58 * p) + ")"; // calculate the rgb value based on the percentage (result of the sine function)
  body.style.background = rgbvalue; // apply the value to the body element
}

// Create a new Mikulas instance and add a callback
// to update the background and shadow
var clock = new Mikulas("hours", "minutes", "seconds", function() {
  setBackground(this.getElapsedMinutes());
  setShadow(getShadowData(this), this);
});

// Start the clock
clock.start();

// equalizer
var Equalizer  = {
  init: function(){
    this.bars = new Array();
    this.resize();
    this.addBars();
    this.x = 0;
    this.on = false;
    //setInterval(_.bind(this.render, this), 120);
    setInterval(this.render.bind(this), 120);
    $(window).resize(this.resize);
    $('.bar').css({'width': this.w / 100, 'margin-left': this.w / 50});
  },

  resize: function(){
    //this.h = $(window).height();
    this.h = $('#equalizer').height();
    this.w = $(window).width();
    //$('#equalizer').width(this.w).height(this.h);
    $('.bar').css({'width': this.w / 100, 'margin-left': this.w / 50});
  },

  addBars: function(){
    for (var i = 0; i < 10; i++){
      var b = $('<div class="bar"><div class="fill"></div></div>');
      this.bars.push(b);
      $('#equalizer').append(b);
    }
  },

  render: function(){
    if (this.on) {
      for (var i = 0; i < this.bars.length; i++){
        var b = this.bars[i];
        $(b).height(this.h + 20);
        var height = /*Math.sin(this.x++)*100+180;*/ (this.h-30) / Math.floor((Math.random()*10)+1);
        $(b).find('.fill').css({'height': height, 'top':(this.h-20) - height});
      }
    }
  },

  show: function() {
    this.on = true;
  },

  hide: function() {
    this.on = false;
  }
};

Equalizer.init();

$(window).resize(function(){
  Equalizer.resize();
});

document.getElementById('btn-play').onclick = function() {
  // event: on playing
  player.on('playing',function(item){
    Equalizer.show();
    console.log('im playing... src:' + item);
  });

  player.on('playend',function(item){
    Equalizer.hide();
    console.log('src:' + item + ' play done');
  });

  player.on('stopped',function(item){
    Equalizer.hide();
    console.log('src:' + item + ' play stopped');
  });

  player.play(function (err, player) {
    console.log('playend!');
  });
};

document.getElementById('btn-stop').onclick = function() {
  player.stop();
};

