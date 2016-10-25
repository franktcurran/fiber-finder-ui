import Ember from 'ember';

export default Ember.Component.extend({
  lat: 39,
  lng: -96,
  zoom: 4,
  markerPosition: null,
  map: null,
  actions: {
    updateCenter(center) {
      this.set('markerPosition', {
        lat: center.lat,
        lng: center.lng}
      );
      this.map.setView(new window.L.LatLng(center.lat, center.lng), 17);
    },
    mapLoaded(ev) {
      ev.target.zoomControl.setPosition('bottomright');
      this.map = ev.target;
    }
  }
});
