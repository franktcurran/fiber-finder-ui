import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    resultSelected(provider) {
      debugger;
      // nav will be closed... at some point we might like to go back to results...
      // search results might be better as a card.
      // for now, send action up to present the geojson on the map!
    }
  }
});
