require('es6-promise').polyfill();
import 'isomorphic-fetch';
import reduxApi from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';

import reduxApiConfig from './rest_reducer';

const reduxApiImpl = reduxApi(reduxApiConfig);
reduxApiImpl.use('fetch', adapterFetch(fetch));
export default reduxApiImpl;
