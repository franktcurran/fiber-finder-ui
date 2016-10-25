import Ember from 'ember';

export default Ember.Component.extend({
  lat: 39,
  lng: -96,
  zoom: 4,
  markerPosition: null,
  map: null,
  // geoDidChange: Ember.observer('geoJSON', function() {
  //   console.log(this.get('geoJSON'));
  // }),
  actions: {
    updateCenter(center) {
      this.set('markerPosition', {
        lat: center.lat,
        lng: center.lng}
      );
      this.map.setView(new window.L.LatLng(center.lat, center.lng), 17);
    },
    // addressSelected(suggestion) {
    //   console.log("Address: ".concat(suggestion.text));
    //   this.get('selectedAddress')(suggestion);
    //   // need to pinpoint search on map like in CIS
    //   // call our service!
    //   // results need to go to search-results component to render?
    // },
    mapLoaded(ev) {
      ev.target.zoomControl.setPosition('bottomright')
      this.map = ev.target;
    }
  }
});
