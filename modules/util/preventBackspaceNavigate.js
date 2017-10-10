// Prevent the backspace key from navigating back.
document.addEventListener('keydown', (e) => {
  var doPrevent = false;
  if (e.keyCode === 8) {
    var d = e.srcElement || e.target;
    if ((d.tagName.toUpperCase() === 'INPUT' && (
      d.type.toUpperCase() === 'TEXT' ||
      d.type.toUpperCase() === 'PASSWORD' ||
      d.type.toUpperCase() === 'FILE' ||
      d.type.toUpperCase() === 'SEARCH' ||
      d.type.toUpperCase() === 'EMAIL' ||
      d.type.toUpperCase() === 'NUMBER' ||
      d.type.toUpperCase() === 'DATE'
    )) || d.tagName.toUpperCase() === 'TEXTAREA') {
      doPrevent = d.readOnly || d.disabled;
    } else {
      doPrevent = true;
    }
  }
  if (doPrevent) {
    e.preventDefault();
  }
});
