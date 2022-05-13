// Terminal Colors
const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",

  FgBlack: "\x1b[30m",
  FgRed: "\x1b[31m",
  FgGreen: "\x1b[32m",
  FgYellow: "\x1b[33m",
  FgBlue: "\x1b[34m",
  FgMagenta: "\x1b[35m",
  FgCyan: "\x1b[36m",
  FgWhite: "\x1b[37m",

  BgBlack: "\x1b[40m",
  BgRed: "\x1b[41m",
  BgGreen: "\x1b[42m",
  BgYellow: "\x1b[43m",
  BgBlue: "\x1b[44m",
  BgMagenta: "\x1b[45m",
  BgCyan: "\x1b[46m",
  BgWhite: "\x1b[47m"
}

/**
  * Logger
  * @param {string} message
  */
const logger = ({
  message = '',
  type = 'info'
}) => {
  let date = new Date().toLocaleTimeString();

  var logMessage;
  switch (type) {
    case 'status':
      logMessage = `${colors.FgGreen}%s${colors.Reset}`;
      break;

    case 'error':
      logMessage = `${colors.FgRed}%s${colors.Reset}`;
      break;

    case 'warning':
      logMessage = `${colors.FgYellow}%s${colors.Reset}`;
      break;

    case 'success':
      logMessage = `${colors.FgGreen}%s${colors.Reset}`;
      break;

    case 'info':
      logMessage = `${colors.FgCyan}%s${colors.Reset}`;
      break;

    case 'debug':
      logMessage = `${colors.FgMagenta}%s${colors.Reset}`;
      break;

    default:
      logMessage = `${colors.FgWhite}%s${colors.Reset}`;
      break;
  }
  console.log(logMessage, `[${date}] ${message}`);
}

module.exports = logger;