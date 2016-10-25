import Ember from 'ember';
import { task, timeout } from 'ember-concurrency';

const DEBOUNCE_MS = 150;
export default Ember.Component.extend({
  selected: undefined,

  searchRepo: task(function * (term) {

    if (Ember.isBlank(term)) { return []; }
    // Pause here for DEBOUNCE_MS milliseconds. Because this
    // task is `restartable`, if the user starts typing again,
    // the current search will be canceled at this point and
    // start over from the beginning. This is the
    // ember-concurrency way of debouncing a task.
    yield timeout(DEBOUNCE_MS);

    let addressUrl = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/suggest?maxSuggestions=20&countryCode=USA&forStorage=false&f=pjson&text=${term}`;

    // We yield an AJAX request and wait for it to complete. If the task
    // is restarted before this request completes, the XHR request
    // is aborted (open the inspector and see for yourself :)
    let json = yield this.get('getJSON').perform(addressUrl);
    return json.suggestions;
  }).restartable(),

  getJSON: task(function * (addressUrl) {
    let xhr;
    try {
      xhr = Ember.$.getJSON(addressUrl);
      let result = yield xhr.promise();
      return result;

      // NOTE: could also write this as
      // return yield xhr;
      //
      // either way, the important thing is to yield before returning
      // so that the `finally` block doesn't run until after the
      // promise resolves (or the task is canceled).
    } finally {
      xhr.abort();
    }
  }),

  actions: {
    select(suggestion) {
      // sets the selection
      this.set('selected', suggestion);
      // calls the action provided
      this.get('addressSelected')(suggestion);
      //geocode!
      var updateCenter = this.get('updateCenter');
      Ember.$.getJSON("https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?f=pjson&text=" + suggestion.text + "&magicKey=" + suggestion.magicKey).then(function(data) {
        let center = {
          lat: data.locations[0].feature.geometry.y,
          lng: data.locations[0].feature.geometry.x
        };
        updateCenter(center);
      });
    }
  }
});
