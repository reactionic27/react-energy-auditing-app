const Cookies = require('js-cookie')
const pairs = document.location.search.slice(1).split('&');

var DOMAIN = window.location.hostname.split('.');

// If the domain has three segments, get rid of the subdomain...
if (DOMAIN[2] === 'com') DOMAIN.shift();

for (let i = 0, l = pairs.length; i < l; i++) {
  const pair = pairs[i].split('=');
  const key = pair[0];
  const value = decodeURIComponent(pair[1]);
  if (key === 'adgroup' || key === 'source' || key === 'offer') {
    let existing = Cookies.get(key);
    if (existing) {
      let matched = false;
      existing = existing.split('|');
      for (let i2 = 0, l2 = existing.length; i2 < l2; i2++) {
        if (existing[i2] === value) matched = true;
      }
      if (matched === false) {
        existing.push(value);
      }
    } else {
      existing = [value];
    }
    let domain = DOMAIN.join('.')
    if (domain === 'localhost') domain = undefined
    Cookies.set(key, existing.join('|'), {expires: 30, domain, path: '/'})
  }
}
