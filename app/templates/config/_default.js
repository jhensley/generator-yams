'use strict';

var publicConfig = {};

module.exports = {
    '<%= camelizedName %>': {
        test: true,
        public: publicConfig
    },
    permissions: {
        '<%= camelizedName %>': {}
    },
    public: {
        '<%= camelizedName %>': publicConfig
    }
};