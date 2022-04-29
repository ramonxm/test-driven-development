/*
 * Mirage JS guide on Factories: https://miragejs.com/docs/data-layer/factories
 */

import message from './message';
import product from './product';
import user from './user';

/*
 * factories are contained in a single object, that's why we
 * destructure what's coming from users and the same should
 * be done for all future factories
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...user,
  ...message,
  ...product,
};
