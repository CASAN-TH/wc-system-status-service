'use strict';
var request = require('supertest'),
    assert = require('assert'),
    config = require('../../../config/config'),
    _ = require('lodash'),
    jwt = require('jsonwebtoken'),
    mongoose = require('mongoose'),
    app = require('../../../config/express'),
    Systemstatus = mongoose.model('Systemstatus');

var credentials,
    token,
    mockup;

describe('Systemstatus CRUD routes tests', function () {

    before(function (done) {
        mockup = {
            environment: {
                home_url: "http://example.com",
                site_url: "http://example.com"
            },
            database: {
                wc_database_version: "3.0.0",
                database_prefix: "wp_",
                maxmind_geoip_database: "/var/www/woocommerce/wp-content/uploads/GeoIP.dat"
            },
            active_plugins: [{
                plugin: "woocommerce/woocommerce.php",
                name: "WooCommerce",
                version: "3.0.0-rc.1",
                version_latest: "2.6.14",
                url: "https://woocommerce.com/",
                author_name: "Automattic",
                author_url: "https://woocommerce.com",
                network_activated: false
            }],
            theme: {
                name: "Twenty Sixteen",
                version: "1.3",
                version_latest: "1.3",
                author_url: "https://wordpress.org/",
                is_child_theme: false,
                has_woocommerce_support: true,
                has_woocommerce_file: false,
                has_outdated_templates: false,
                overrides: [],
                parent_name: "",
                parent_version: "",
                parent_version_latest: "",
                parent_author_url: ""
            },
            settings: {
                api_enabled: true,
                force_ssl: false,
                currency: "USD",
                currency_symbol: "&#36;",
                currency_position: "left",
                thousand_separator: ",",
                decimal_separator: ".",
                number_of_decimals: 2,
                geolocation_enabled: false,
                taxonomies: [{
                    external: "external",
                    grouped: "grouped",
                    simple: "simple",
                    variable: "variable"
                }]
            },
            security: {
                secure_connection: true,
                hide_errors: true
            },
            pages: [
                {
                    page_name: "Shop base",
                    page_id: "4",
                    page_set: true,
                    page_exists: true,
                    page_visible: true,
                    shortcode: "",
                    shortcode_required: false,
                    shortcode_present: false
                }, {
                    page_name: "Cart",
                    page_id: "5",
                    page_set: true,
                    page_exists: true,
                    page_visible: true,
                    shortcode: "[woocommerce_cart]",
                    shortcode_required: true,
                    shortcode_present: true
                }
            ]
        };
        credentials = {
            username: 'username',
            password: 'password',
            firstname: 'first name',
            lastname: 'last name',
            email: 'test@email.com',
            roles: ['user']
        };
        token = jwt.sign(_.omit(credentials, 'password'), config.jwt.secret, {
            expiresIn: 2 * 60 * 60 * 1000
        });
        done();
    });

    it('should be Systemstatus get use token', (done) => {
        request(app)
            .get('/api/systemstatuss')
            .set('Authorization', 'Bearer ' + token)
            .expect(200)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                done();
            });
    });

    it('should be Systemstatus get by id', function (done) {

        request(app)
            .post('/api/systemstatuss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .get('/api/systemstatuss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.environment.home_url, mockup.environment.home_url);
                        assert.equal(resp.data.environment.site_url, mockup.environment.site_url);
                        assert.equal(resp.data.database.wc_database_version, mockup.database.wc_database_version);
                        assert.equal(resp.data.database.database_prefix, mockup.database.database_prefix);
                        assert.equal(resp.data.database.maxmind_geoip_database, mockup.database.maxmind_geoip_database);
                        assert.equal(resp.data.active_plugins[0].plugin, mockup.active_plugins[0].plugin);
                        assert.equal(resp.data.active_plugins[0].name, mockup.active_plugins[0].name);
                        assert.equal(resp.data.active_plugins[0].version, mockup.active_plugins[0].version);
                        assert.equal(resp.data.active_plugins[0].version_latest, mockup.active_plugins[0].version_latest);
                        assert.equal(resp.data.active_plugins[0].url, mockup.active_plugins[0].url);
                        assert.equal(resp.data.active_plugins[0].author_name, mockup.active_plugins[0].author_name);
                        assert.equal(resp.data.active_plugins[0].author_url, mockup.active_plugins[0].author_url);
                        assert.equal(resp.data.active_plugins[0].network_activated, mockup.active_plugins[0].network_activated);
                        assert.equal(resp.data.theme.name, mockup.theme.name);
                        assert.equal(resp.data.theme.version, mockup.theme.version);
                        assert.equal(resp.data.theme.version_latest, mockup.theme.version_latest);
                        assert.equal(resp.data.theme.author_url, mockup.theme.author_url);
                        assert.equal(resp.data.theme.is_child_theme, mockup.theme.is_child_theme);
                        assert.equal(resp.data.theme.has_woocommerce_support, mockup.theme.has_woocommerce_support);
                        assert.equal(resp.data.theme.has_woocommerce_file, mockup.theme.has_woocommerce_file);
                        assert.equal(resp.data.theme.has_outdated_templates, mockup.theme.has_outdated_templates);
                        assert.equal(resp.data.theme.overrides.length, mockup.theme.overrides.length);
                        assert.equal(resp.data.theme.parent_name, mockup.theme.parent_name);
                        assert.equal(resp.data.theme.parent_version, mockup.theme.parent_version);
                        assert.equal(resp.data.theme.parent_version_latest, mockup.theme.parent_version_latest);
                        assert.equal(resp.data.theme.parent_author_url, mockup.theme.parent_author_url);
                        assert.equal(resp.data.settings.api_enabled, mockup.settings.api_enabled);
                        assert.equal(resp.data.settings.force_ssl, mockup.settings.force_ssl);
                        assert.equal(resp.data.settings.currency, mockup.settings.currency);
                        assert.equal(resp.data.settings.currency_symbol, mockup.settings.currency_symbol);
                        assert.equal(resp.data.settings.currency_position, mockup.settings.currency_position);
                        assert.equal(resp.data.settings.thousand_separator, mockup.settings.thousand_separator);
                        assert.equal(resp.data.settings.decimal_separator, mockup.settings.decimal_separator);
                        assert.equal(resp.data.settings.number_of_decimals, mockup.settings.number_of_decimals);
                        assert.equal(resp.data.settings.geolocation_enabled, mockup.settings.geolocation_enabled);
                        assert.equal(resp.data.settings.taxonomies[0].external, mockup.settings.taxonomies[0].external);
                        assert.equal(resp.data.settings.taxonomies[0].grouped, mockup.settings.taxonomies[0].grouped);
                        assert.equal(resp.data.settings.taxonomies[0].simple, mockup.settings.taxonomies[0].simple);
                        assert.equal(resp.data.settings.taxonomies[0].variable, mockup.settings.taxonomies[0].variable);
                        assert.equal(resp.data.security.secure_connection, mockup.security.secure_connection);
                        assert.equal(resp.data.security.hide_errors, mockup.security.hide_errors);
                        assert.equal(resp.data.pages[0].page_name, mockup.pages[0].page_name);
                        assert.equal(resp.data.pages[0].page_id, mockup.pages[0].page_id);
                        assert.equal(resp.data.pages[0].page_set, mockup.pages[0].page_set);
                        assert.equal(resp.data.pages[0].page_exists, mockup.pages[0].page_exists);
                        assert.equal(resp.data.pages[0].page_visible, mockup.pages[0].page_visible);
                        assert.equal(resp.data.pages[0].shortcode, mockup.pages[0].shortcode);
                        assert.equal(resp.data.pages[0].shortcode_required, mockup.pages[0].shortcode_required);
                        assert.equal(resp.data.pages[0].shortcode_present, mockup.pages[0].shortcode_present);
                        assert.equal(resp.data.pages[1].page_name, mockup.pages[1].page_name);
                        assert.equal(resp.data.pages[1].page_id, mockup.pages[1].page_id);
                        assert.equal(resp.data.pages[1].page_set, mockup.pages[1].page_set);
                        assert.equal(resp.data.pages[1].page_exists, mockup.pages[1].page_exists);
                        assert.equal(resp.data.pages[1].page_visible, mockup.pages[1].page_visible);
                        assert.equal(resp.data.pages[1].shortcode, mockup.pages[1].shortcode);
                        assert.equal(resp.data.pages[1].shortcode_required, mockup.pages[1].shortcode_required);
                        assert.equal(resp.data.pages[1].shortcode_present, mockup.pages[1].shortcode_present);
                        done();
                    });
            });

    });

    it('should be Systemstatus post use token', (done) => {
        request(app)
            .post('/api/systemstatuss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                assert.equal(resp.status, 200);
                assert.equal(resp.data.environment.home_url, mockup.environment.home_url);
                assert.equal(resp.data.environment.site_url, mockup.environment.site_url);
                assert.equal(resp.data.database.wc_database_version, mockup.database.wc_database_version);
                assert.equal(resp.data.database.database_prefix, mockup.database.database_prefix);
                assert.equal(resp.data.database.maxmind_geoip_database, mockup.database.maxmind_geoip_database);
                assert.equal(resp.data.active_plugins[0].plugin, mockup.active_plugins[0].plugin);
                assert.equal(resp.data.active_plugins[0].name, mockup.active_plugins[0].name);
                assert.equal(resp.data.active_plugins[0].version, mockup.active_plugins[0].version);
                assert.equal(resp.data.active_plugins[0].version_latest, mockup.active_plugins[0].version_latest);
                assert.equal(resp.data.active_plugins[0].url, mockup.active_plugins[0].url);
                assert.equal(resp.data.active_plugins[0].author_name, mockup.active_plugins[0].author_name);
                assert.equal(resp.data.active_plugins[0].author_url, mockup.active_plugins[0].author_url);
                assert.equal(resp.data.active_plugins[0].network_activated, mockup.active_plugins[0].network_activated);
                assert.equal(resp.data.theme.name, mockup.theme.name);
                assert.equal(resp.data.theme.version, mockup.theme.version);
                assert.equal(resp.data.theme.version_latest, mockup.theme.version_latest);
                assert.equal(resp.data.theme.author_url, mockup.theme.author_url);
                assert.equal(resp.data.theme.is_child_theme, mockup.theme.is_child_theme);
                assert.equal(resp.data.theme.has_woocommerce_support, mockup.theme.has_woocommerce_support);
                assert.equal(resp.data.theme.has_woocommerce_file, mockup.theme.has_woocommerce_file);
                assert.equal(resp.data.theme.has_outdated_templates, mockup.theme.has_outdated_templates);
                assert.equal(resp.data.theme.overrides.length, mockup.theme.overrides.length);
                assert.equal(resp.data.theme.parent_name, mockup.theme.parent_name);
                assert.equal(resp.data.theme.parent_version, mockup.theme.parent_version);
                assert.equal(resp.data.theme.parent_version_latest, mockup.theme.parent_version_latest);
                assert.equal(resp.data.theme.parent_author_url, mockup.theme.parent_author_url);
                assert.equal(resp.data.settings.api_enabled, mockup.settings.api_enabled);
                assert.equal(resp.data.settings.force_ssl, mockup.settings.force_ssl);
                assert.equal(resp.data.settings.currency, mockup.settings.currency);
                assert.equal(resp.data.settings.currency_symbol, mockup.settings.currency_symbol);
                assert.equal(resp.data.settings.currency_position, mockup.settings.currency_position);
                assert.equal(resp.data.settings.thousand_separator, mockup.settings.thousand_separator);
                assert.equal(resp.data.settings.decimal_separator, mockup.settings.decimal_separator);
                assert.equal(resp.data.settings.number_of_decimals, mockup.settings.number_of_decimals);
                assert.equal(resp.data.settings.geolocation_enabled, mockup.settings.geolocation_enabled);
                assert.equal(resp.data.settings.taxonomies[0].external, mockup.settings.taxonomies[0].external);
                assert.equal(resp.data.settings.taxonomies[0].grouped, mockup.settings.taxonomies[0].grouped);
                assert.equal(resp.data.settings.taxonomies[0].simple, mockup.settings.taxonomies[0].simple);
                assert.equal(resp.data.settings.taxonomies[0].variable, mockup.settings.taxonomies[0].variable);
                assert.equal(resp.data.security.secure_connection, mockup.security.secure_connection);
                assert.equal(resp.data.security.hide_errors, mockup.security.hide_errors);
                assert.equal(resp.data.pages[0].page_name, mockup.pages[0].page_name);
                assert.equal(resp.data.pages[0].page_id, mockup.pages[0].page_id);
                assert.equal(resp.data.pages[0].page_set, mockup.pages[0].page_set);
                assert.equal(resp.data.pages[0].page_exists, mockup.pages[0].page_exists);
                assert.equal(resp.data.pages[0].page_visible, mockup.pages[0].page_visible);
                assert.equal(resp.data.pages[0].shortcode, mockup.pages[0].shortcode);
                assert.equal(resp.data.pages[0].shortcode_required, mockup.pages[0].shortcode_required);
                assert.equal(resp.data.pages[0].shortcode_present, mockup.pages[0].shortcode_present);
                assert.equal(resp.data.pages[1].page_name, mockup.pages[1].page_name);
                assert.equal(resp.data.pages[1].page_id, mockup.pages[1].page_id);
                assert.equal(resp.data.pages[1].page_set, mockup.pages[1].page_set);
                assert.equal(resp.data.pages[1].page_exists, mockup.pages[1].page_exists);
                assert.equal(resp.data.pages[1].page_visible, mockup.pages[1].page_visible);
                assert.equal(resp.data.pages[1].shortcode, mockup.pages[1].shortcode);
                assert.equal(resp.data.pages[1].shortcode_required, mockup.pages[1].shortcode_required);
                assert.equal(resp.data.pages[1].shortcode_present, mockup.pages[1].shortcode_present);
                done();
            });
    });

    it('should be systemstatus put use token', function (done) {

        request(app)
            .post('/api/systemstatuss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    environment: {
                        home_url: "home Url Updateeeeeeee",
                        site_url: "http://example.com"
                    }
                }
                request(app)
                    .put('/api/systemstatuss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .send(update)
                    .expect(200)
                    .end(function (err, res) {
                        if (err) {
                            return done(err);
                        }
                        var resp = res.body;
                        assert.equal(resp.status, 200);
                        assert.equal(resp.data.environment.home_url, update.environment.home_url);
                        assert.equal(resp.data.environment.site_url, mockup.environment.site_url);
                        assert.equal(resp.data.database.wc_database_version, mockup.database.wc_database_version);
                        assert.equal(resp.data.database.database_prefix, mockup.database.database_prefix);
                        assert.equal(resp.data.database.maxmind_geoip_database, mockup.database.maxmind_geoip_database);
                        assert.equal(resp.data.active_plugins[0].plugin, mockup.active_plugins[0].plugin);
                        assert.equal(resp.data.active_plugins[0].name, mockup.active_plugins[0].name);
                        assert.equal(resp.data.active_plugins[0].version, mockup.active_plugins[0].version);
                        assert.equal(resp.data.active_plugins[0].version_latest, mockup.active_plugins[0].version_latest);
                        assert.equal(resp.data.active_plugins[0].url, mockup.active_plugins[0].url);
                        assert.equal(resp.data.active_plugins[0].author_name, mockup.active_plugins[0].author_name);
                        assert.equal(resp.data.active_plugins[0].author_url, mockup.active_plugins[0].author_url);
                        assert.equal(resp.data.active_plugins[0].network_activated, mockup.active_plugins[0].network_activated);
                        assert.equal(resp.data.theme.name, mockup.theme.name);
                        assert.equal(resp.data.theme.version, mockup.theme.version);
                        assert.equal(resp.data.theme.version_latest, mockup.theme.version_latest);
                        assert.equal(resp.data.theme.author_url, mockup.theme.author_url);
                        assert.equal(resp.data.theme.is_child_theme, mockup.theme.is_child_theme);
                        assert.equal(resp.data.theme.has_woocommerce_support, mockup.theme.has_woocommerce_support);
                        assert.equal(resp.data.theme.has_woocommerce_file, mockup.theme.has_woocommerce_file);
                        assert.equal(resp.data.theme.has_outdated_templates, mockup.theme.has_outdated_templates);
                        assert.equal(resp.data.theme.overrides.length, mockup.theme.overrides.length);
                        assert.equal(resp.data.theme.parent_name, mockup.theme.parent_name);
                        assert.equal(resp.data.theme.parent_version, mockup.theme.parent_version);
                        assert.equal(resp.data.theme.parent_version_latest, mockup.theme.parent_version_latest);
                        assert.equal(resp.data.theme.parent_author_url, mockup.theme.parent_author_url);
                        assert.equal(resp.data.settings.api_enabled, mockup.settings.api_enabled);
                        assert.equal(resp.data.settings.force_ssl, mockup.settings.force_ssl);
                        assert.equal(resp.data.settings.currency, mockup.settings.currency);
                        assert.equal(resp.data.settings.currency_symbol, mockup.settings.currency_symbol);
                        assert.equal(resp.data.settings.currency_position, mockup.settings.currency_position);
                        assert.equal(resp.data.settings.thousand_separator, mockup.settings.thousand_separator);
                        assert.equal(resp.data.settings.decimal_separator, mockup.settings.decimal_separator);
                        assert.equal(resp.data.settings.number_of_decimals, mockup.settings.number_of_decimals);
                        assert.equal(resp.data.settings.geolocation_enabled, mockup.settings.geolocation_enabled);
                        assert.equal(resp.data.settings.taxonomies[0].external, mockup.settings.taxonomies[0].external);
                        assert.equal(resp.data.settings.taxonomies[0].grouped, mockup.settings.taxonomies[0].grouped);
                        assert.equal(resp.data.settings.taxonomies[0].simple, mockup.settings.taxonomies[0].simple);
                        assert.equal(resp.data.settings.taxonomies[0].variable, mockup.settings.taxonomies[0].variable);
                        assert.equal(resp.data.security.secure_connection, mockup.security.secure_connection);
                        assert.equal(resp.data.security.hide_errors, mockup.security.hide_errors);
                        assert.equal(resp.data.pages[0].page_name, mockup.pages[0].page_name);
                        assert.equal(resp.data.pages[0].page_id, mockup.pages[0].page_id);
                        assert.equal(resp.data.pages[0].page_set, mockup.pages[0].page_set);
                        assert.equal(resp.data.pages[0].page_exists, mockup.pages[0].page_exists);
                        assert.equal(resp.data.pages[0].page_visible, mockup.pages[0].page_visible);
                        assert.equal(resp.data.pages[0].shortcode, mockup.pages[0].shortcode);
                        assert.equal(resp.data.pages[0].shortcode_required, mockup.pages[0].shortcode_required);
                        assert.equal(resp.data.pages[0].shortcode_present, mockup.pages[0].shortcode_present);
                        assert.equal(resp.data.pages[1].page_name, mockup.pages[1].page_name);
                        assert.equal(resp.data.pages[1].page_id, mockup.pages[1].page_id);
                        assert.equal(resp.data.pages[1].page_set, mockup.pages[1].page_set);
                        assert.equal(resp.data.pages[1].page_exists, mockup.pages[1].page_exists);
                        assert.equal(resp.data.pages[1].page_visible, mockup.pages[1].page_visible);
                        assert.equal(resp.data.pages[1].shortcode, mockup.pages[1].shortcode);
                        assert.equal(resp.data.pages[1].shortcode_required, mockup.pages[1].shortcode_required);
                        assert.equal(resp.data.pages[1].shortcode_present, mockup.pages[1].shortcode_present);
                        done();
                    });
            });

    });

    it('should be systemstatus delete use token', function (done) {

        request(app)
            .post('/api/systemstatuss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/systemstatuss/' + resp.data._id)
                    .set('Authorization', 'Bearer ' + token)
                    .expect(200)
                    .end(done);
            });

    });

    it('should be systemstatus get not use token', (done) => {
        request(app)
            .get('/api/systemstatuss')
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);
    });

    it('should be systemstatus post not use token', function (done) {

        request(app)
            .post('/api/systemstatuss')
            .send(mockup)
            .expect(403)
            .expect({
                status: 403,
                message: 'User is not authorized'
            })
            .end(done);

    });

    it('should be systemstatus put not use token', function (done) {

        request(app)
            .post('/api/systemstatuss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                var update = {
                    name: 'name update'
                }
                request(app)
                    .put('/api/systemstatuss/' + resp.data._id)
                    .send(update)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    it('should be systemstatus delete not use token', function (done) {

        request(app)
            .post('/api/systemstatuss')
            .set('Authorization', 'Bearer ' + token)
            .send(mockup)
            .expect(200)
            .end(function (err, res) {
                if (err) {
                    return done(err);
                }
                var resp = res.body;
                request(app)
                    .delete('/api/systemstatuss/' + resp.data._id)
                    .expect(403)
                    .expect({
                        status: 403,
                        message: 'User is not authorized'
                    })
                    .end(done);
            });

    });

    afterEach(function (done) {
        Systemstatus.remove().exec(done);
    });

});