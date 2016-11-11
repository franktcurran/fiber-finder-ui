import Ember from 'ember';

export default Ember.Route.extend({
  model() {
      return Ember.Object.create({
        address: Ember.Object.create(),
        isLoading: false,
        mapIsLoading: false,
        providers: Ember.A([]),
        geoJSONs: Ember.A([]),
        message: 'Enter an Address to identify Providers.',
        openNav: false
      });
  }
});
