'use strict';

const EventEmitter = require('events');

let listener = new EventEmitter();
let config = new Proxy(filteredEnvVars(), { get, set });

module.exports =  Object.assign(config, { listener });

function filteredEnvVars () {
    return Object.keys(process.env)
        .filter(removeNPMVars)
        .reduce(assignToObject, {});
}

function removeNPMVars (key) {
    return !key.includes('npm_');
}

function assignToObject (obj, key) {
    return Object.assign(obj, { [key]: process.env[key] });
}

function get (target, key) {
    // getValidator(target, key);
    return target[key];
}

function set (target, key, val) {
    setValidator(key, val);
    listener.emit(`${key}.set`, val);
    return Object.assign(target, { [key]: val });
}

function getValidator (target, key) {
    if (target[key] === undefined) {
        throw new Error(`Cannot read property "${key}" of undefined`);
    }
}

function setValidator (key, val) {
    if (val === undefined) {
        throw new Error(`Cannot set property "${key}" to undefined.`);
    }
}