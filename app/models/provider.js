import DS from 'ember-data';

export default DS.Model.extend({
  providerName: DS.attr('string'),
  name: DS.attr('string'),
  distance: DS.attr('number')
});
