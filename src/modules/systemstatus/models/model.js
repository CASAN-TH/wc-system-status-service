'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SystemstatusSchema = new Schema({
    environment: {
        type: {
            home_url: {
                type: String
            },
            site_url: {
                type: String
            }
        }
    },
    database: {
        type: {
            wc_database_version: {
                type: String
            },
            database_prefix: {
                type: String
            },
            maxmind_geoip_database: {
                type: String
            },
            database_tables: {
                type: []
            }
        }
    },
    active_plugins: {
        type: [{
            plugin: {
                type: String
            },
            name: {
                type: String
            },
            version: {
                type: String
            },
            version_latest: {
                type: String
            },
            url: {
                type: String
            },
            author_name: {
                type: String
            },
            author_url: {
                type: String
            },
            network_activated: {
                type: Boolean
            }
        }]
    },
    theme: {
        type: {
            name: {
                type: String
            },
            version: {
                type: String
            },
            version_latest: {
                type: String
            },
            author_url: {
                type: String
            },
            is_child_theme: {
                type: Boolean
            },
            has_woocommerce_support: {
                type: Boolean
            },
            has_woocommerce_file: {
                type: Boolean
            },
            has_outdated_templates: {
                type: Boolean
            },
            overrides: {
                type: []
            },
            parent_name: {
                type: String
            },
            parent_version: {
                type: String
            },
            parent_version_latest: {
                type: String
            },
            parent_author_url: {
                type: String
            }
        }
    },
    settings: {
        type: {
            api_enabled: {
                type: Boolean
            },
            force_ssl: {
                type: Boolean
            },
            currency: {
                type: String
            },
            currency_symbol: {
                type: String
            },
            currency_position: {
                type: String
            },
            thousand_separator: {
                type: String
            },
            decimal_separator: {
                type: String
            },
            number_of_decimals: {
                type: Number
            },
            geolocation_enabled: {
                type: Boolean
            },
            taxonomies: {
                type: [{
                    external: {
                        type: String
                    },
                    grouped: {
                        type: String
                    },
                    simple: {
                        type: String
                    },
                    variable: {
                        type: String
                    }
                }]
            }
        }
    },
    security: {
        type: {
            secure_connection: {
                type: Boolean
            },
            hide_errors: {
                type: Boolean
            }
        }
    },
    pages: {
        type: [{
            page_name: {
                type: String
            },
            page_id: {
                type: String
            },
            page_set: {
                type: Boolean
            },
            page_exists: {
                type: Boolean
            },
            page_visible: {
                type: Boolean
            },
            shortcode: {
                type: String
            },
            shortcode_required: {
                type: Boolean
            },
            shortcode_present: {
                type: Boolean
            }
        }]
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Systemstatus", SystemstatusSchema);