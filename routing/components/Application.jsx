/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */
'use strict';
var React = require('react');
var Nav = require('./Nav.jsx');
var Timestamp = require('./Timestamp.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible-app').StoreMixin;

var Application = React.createClass({
    mixins: [RouterMixin, StoreMixin],
    statics: {
        storeListeners: [ApplicationStore]
    },

    getInitialState: function () {
        return this.getStore(ApplicationStore).getState();
    },
    onChange: function () {
        var state = this.getStore(ApplicationStore).getState();
        this.setState(state);
    },
    render: function () {
        var route = this.state.pages[this.state.currentPageName];
        var pageName = route.page;
        pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

        var Content = require('./'+pageName+'.jsx');

        return React.createElement(
            'div',
            {},
            React.createElement(
                Nav,
                {
                    selected: this.state.currentPageName,
                    links: this.state.pages,
                    context: this.props.context
                }
            ),
            React.createElement(Content),
            React.createElement(Timestamp, {context: this.props.context})
        );
    }
});

module.exports = Application;
