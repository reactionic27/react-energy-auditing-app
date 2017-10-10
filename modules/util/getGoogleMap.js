export default function getGoogleMap(address, zip, zoom = 16) {
  if (zoom == null) {
    zoom = 16;
  }
  var base_url = "//www.google.com/maps";
  var query = "" + (encodeURIComponent(address)) + "," + (encodeURIComponent(zip));
  return "" + base_url + "?q=" + query + "&z=" + zoom;
}



// getStreetView(width, height) {
//   var address = this.get('address_1');
//   var zip     = this.get('zip');
//   if (width == null) width = 150;
//   if (height == null) height = 150;
//   var key = 'AIzaSyDxWxk9BQ-0q1HlA1Cm5vg-yi_3rRj2NCU';
//   var base_url = '//maps.googleapis.com/maps/api/streetview';
//   var full_address = "" + (encodeURIComponent(address)) + "," + (encodeURIComponent(zip));
//   var sensor = false;
//   return "" + base_url + "?size=" + width + "x" + height + "&location=" + full_address + "&sensor=" + sensor + "&key=" + key;
// }
