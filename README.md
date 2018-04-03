# proxy-emitter
---

This module reads process environment variables and returns a proxied, event-emitting object.

## Installation

    $ npm install proxy-emitter

## Usage
All process.env properties will be available directly on the root.

    var config = require('proxy-emitter');
    console.log(config.NODE_ENV);

The module exports a singleton object.  Note, property modification will **NOT** update process.env properties.

    var config = require('proxy-emitter');
    config.NODE_ENV = 'development';

    var config2 = require('proxy-emitter');
    console.log(config.NODE_ENV); // 'development'

    config2.NODE_ENV = 'test';
    console.log(config.NODE_ENV); // 'test'

## Getters and Setters
The properties of the object are all proxied with 'getters' and 'setters'.  The setters fire off events in the form of 'prop.action' (i.e., 'NODE_ENV.set').  There is a listener property on the config object where listeners may be added.

Note: the getter has been commented out to avoid chattiness.

    var config = require('proxy-emitter');
    config.listener.on('NODE_ENV.set', val => {
        console.log(val);
    });

    config.NODE_ENV = 'test';
    // 'test' is printed to the console