import Ember from 'ember';

export default Ember.Controller.extend({
  distance: 200,
  actions: {
    addressSelected(suggestion) {
      let model = this.get('model');
      model.set('address', suggestion.text);
      model.set('openNav', true);
      model.set('isLoading', true);
      let geos = Ember.A([]);
      // model.set('geoJSONs', Ember.A([]));
      // let geoJSONs = model.get('geoJSONs');
      let data = {address: suggestion.text, distance: this.get('distance')};
      this.store.query('provider', data).then((providers) => {
        if (providers.get('length') === 0) {
          model.set('message', `No providers were found for <br/> <strong>${suggestion.text}</strong>.`);
        } else {
          model.set('message', `The following providers were found for <br/> <strong>${suggestion.text}</strong>`);
        }
        // model.set('providers', providers);
        console.log(providers);
        providers.forEach((provider) => {
          console.log(provider);
          let color = randomColor({hue: 'random'});
          provider.set('color', color);
          geos.push({geo: JSON.parse(provider.get('line')), color: color});
        });
        model.setProperties({
          providers: providers,
          geoJSONs: geos,
          isLoading: false
        });
      }).catch((error) => {
        console.log(error);
        model.set('message', `There was an issue searching: <br/> <strong>${error}</strong>`);
      });
    },
    resultSelected(provider) {
      // nav will be closed... at some point we might like to go back to results...
      // search results might be better as a card.
      let model = this.get('model');
      model.set('mapIsLoading', true);
      let data = {address: model.address, distance: this.get('distance'), name: provider.get('name')};
      this.store.query('fiber-line', data).then((fiberLines) => {
        let fiberLine = fiberLines.get('firstObject');
        model.set('geoJSON', JSON.parse(fiberLine.get('line')));
        model.set('mapIsLoading', false);
      }).catch((error) => {
        model.set('message', `There was an issue searching: <br/> <strong>${error}</strong>`);
      });
    }
  }
});
