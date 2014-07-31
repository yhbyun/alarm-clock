var app      = require('app')
  , Menu     = require('menu')
  , MenuItem = require('menu-item')
  , BW       = require('browser-window')
  , ipc      = require('ipc')
  , win;

var volume = 35;

app.commandLine.appendSwitch('enable-transparent-visuals');

app.on('ready', function() {
  win = new BW({
    width  : 400,
    height : 350,
    frame: false
  });

  win.on('closed', function() {
    win = null;
  });

  win.loadUrl('file://' + __dirname + '/index.html');
  win.show();

  var menu_tmpl = [{
    lable: 'Atom Shell',
    submenu: [{
      label: 'reload',
      accelerator: 'Command+R',
      click: function() {
        win.reload();
      }
    }, {
      label: 'Toggle DevTools',
      accelerator: 'Alt+Command+I',
      click: function() {
        win.toggleDevTools();
      }
    }]
  }];
  menu = Menu.buildFromTemplate(menu_tmpl);
  Menu.setApplicationMenu(menu);

  /**
   * @param {browser-window} win, target window to send console log message two.
   * @param {String} msg, the message we are sending.
   */
  console.send = function(win, msg) {
    win.webContents.on('did-finish-load', function() {
      win.webContents.send('send-console', msg);
    });
  }

});

ipc.on('asynchronous-message', function(event, arg) {
  ///console.log(arg);  // prints "ping"
});

