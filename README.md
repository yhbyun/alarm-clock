# Alarm Clock

> Alarm clock desktop application built with `atom-shell`.

<img src="https://raw.githubusercontent.com/yhbyun/resources/master/alarm-clock/screenshot4.png" width="500">


## Used Software

- atom-shell v0.15.1
- node.js 0.11.13
- node package
  - [node-lame](https://github.com/yhbyun/node-lame)
  - [node-speaker](https://github.com/TooTallNate/node-speaker)
- [polymer](http://www.polymer-project.org/)
  - core-header-panel
  - core-toolbar
  - core-localstorage
  - paper-icon-button
  - paper-input
  - paper-dialog
  - cool-clock
- javascript library
  - [later.js](http://bunkat.github.io/later/)

## Getting Started

```
$ git clone https://github.com/yhbyun/alarm-clock.git

$ cd alarm-clock/my-app
$ mkdir node_modules && cd $_

$ git clone https://github.com/yhbyun/node-lame --branch hotfixes/branch lame
$ cd lame && npm install
$ HOME=~/.atom-shell-gyp node-gyp rebuild --target=0.11.13 --arch=x64 --dist-url=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist

$ cd ..
$ git clone https://github.com/TooTallNate/node-speaker speaker
$ cd speaker && npm install
$ HOME=~/.atom-shell-gyp node-gyp rebuild --target=0.11.13 --arch=x64 --dist-url=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist

$ cd ..
$ git clone https://github.com/jashkenas/underscore

$ cd ..
$ bower install

$ cd ..
$ npm install
$ grunt run
```

## TODO

- detect localstorage change
- scheduling
  - user friendly setting UI
  - multiple scheduling
- audio visualization

#### Test MP3 File

`Early Riser.mp3` file is included in this repo. This is from `http://incompetech.com/music/royalty-free/index.html`, which is royalty free.

