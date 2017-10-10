
var previousOnError = window.onerror;

// Override previous handler.
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  if (previousOnError) {
    return previousOnError(errorMsg, url, lineNumber);
  }
  // Just let default handler run.
  return console.log([errorMsg, url]);
}
