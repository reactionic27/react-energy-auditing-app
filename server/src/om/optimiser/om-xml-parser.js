import _ from 'lodash'
import expat from 'node-expat'

module.exports = function(data) {
  var p = new expat.Parser('utf-8');
  var type        = null;
  var items       = [];
  var currentItem = [];
  var currentName = null;
  var onHPXML     = false;

  p.on('startElement', function(name) {
    if (name === 'OptimiserResponse') {
      type = 'optimiser';
    }
    if (name === 'error') {
      type = 'error';
    }
    currentName = name;
  });

  p.on('endElement', function(name) {
    if (name === 'VALUE' && onHPXML) {
      onHPXML = false;
    }
  });

  p.on('text', function(str) {
    var lastItem;
    switch (currentName) {
      case 'NAME':
        if (str === 'A1HPXML') {
          onHPXML = true;
        }
        currentItem = [str];
        break;
      case 'VALUE':
      case 'message':
      case 'code':
        if (currentName === 'VALUE') {
          if (str === '\n') {
            str = '';
          }
          currentItem.push(str);
          items.push(currentItem);
        } else {
          items.push([currentName, str]);
        }
        break;
      default:
        if (/(\n|\s)/.test(str) === false || onHPXML) {
          lastItem = items.pop();
          lastItem[1] += str;
          lastItem[1] = lastItem[1].trim();
          items.push(lastItem);
        }
    }
    currentName = null;
  });

  p.parse(data);

  return {
    type: type,
    data: _.fromPairs(items)
  };
};
