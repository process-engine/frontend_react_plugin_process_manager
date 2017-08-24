'use strict';

export default {
  getProcessDefById: {
    url: `/datastore/ProcessDef/:id`,
    options: {
      credentials: 'same-origin'
    }
  },

  executeProcessDefMethod: {
    url: `/datastore/ProcessDef/:id/:method`,
    options: {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }
  }
};
