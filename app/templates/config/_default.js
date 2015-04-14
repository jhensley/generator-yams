'use strict';

var publicConfig = {};

module.exports = {
    '<%= appname %>': {
        test: true,
        public: publicConfig
    },
    permissions: {
        '<%= appname %>': {}
    },
    public: {
        '<%= appname %>': publicConfig
    }
};