'use strict';

var publicConfig = {};

module.exports = {
    '<%= camelizedSingularName %>': {
        test: true,
        public: publicConfig
    },
    permissions: {
        '<%= camelizedSingularName %>': {}
    },
    public: {
        '<%= camelizedSingularName %>': publicConfig
    }
};