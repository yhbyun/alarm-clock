# Alarm Clock

> Alarm clock desktop application built with `atom-shell`.

![](https://raw.githubusercontent.com/yhbyun/resources/master/alarm-clock/screenshot.png)


## Software

- atom-shell v0.14.3
- node.js 0.11.13
- node package
    - [node-lame](https://github.com/yhbyun/node-lame)
    - [node-speaker](https://github.com/TooTallNate/node-speaker)

## How to run

Compile node-lame & node-speaker

```
$ cd my-app/node_modules
$ git clone https://github.com/yhbyun/node-lame lame
$ cd lame
$ HOME=~/.atom-shell-gyp node-gyp rebuild --target=0.11.13 --arch=x64 --dist-url=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist

$ cd ..
$ git clone https://github.com/TooTallNate/node-speaker speaker
$ cd speaker
$ HOME=~/.atom-shell-gyp node-gyp rebuild --target=0.11.13 --arch=x64 --dist-url=https://gh-contractor-zcbenz.s3.amazonaws.com/atom-shell/dist

$ cd ..
$ git clone https://github.com/jashkenas/underscore
```

run

```
$ grunt
```

