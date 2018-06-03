A Pen created at CodePen.io. You can find this one at https://codepen.io/PashaAr/pen/xzxzjx.

 A demo of the [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) which allows a web site/app to ask and use your location information, should you choose to provide it.

This is a fork of [this fiddle](https://jsfiddle.net/dannymarkov/ubrvm4ao/) by Dan Markov (see the [accompanying article](http://tutorialzine.com/2016/06/quick-tip-detecting-your-location-with-javascript/)), with the following modifications: 

- additional "are we on HTTPS?" check (most [browsers require a secure origin](https://caniuse.com/#feat=geolocation) to run the Geolocation API);
- draw the map using “native” methods of the [Google Maps JS](https://developers.google.com/maps/documentation/javascript/reference) library (no 3rd-party wrapper lib);
- more flexible/responsive display; 
- a few other minor twists'n'tweaks.