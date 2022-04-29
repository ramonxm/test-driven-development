/*
 * Mirage JS guide on Models: https://miragejs.com/docs/data-layer/models
 */

import { belongsTo, hasMany, Model } from 'miragejs';

/*
 * Everytime you create a new resource you have
 * to create a new Model and add it here. It is
 * true for Factories and for Fixtures.
 *
 * Mirage JS guide on Relationships: https://miragejs.com/docs/main-concepts/relationships/
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  user: Model.extend({
    messages: hasMany(),
  }),
  messages: Model.extend({
    user: belongsTo(),
  }),
  product: Model,
};
