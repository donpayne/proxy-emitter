'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

function spy (fn) {
    return typeof fn === 'function'? sinon.spy(fn) : sinon.spy(val => val);
}

describe('config.js tests', () => {

    let config;

    beforeEach(() => {
        config = require('../index');
        config.listener.removeAllListeners([ 'BLAH.set' ]);
    });

    // it('Get should throw error when property is undefined', done => {
    //     let getter = () => config.BLAH;

    //     expect(getter).to.throw('Cannot read property "BLAH" of undefined');
    //     done();
    // });

    it('Set should throw error when setting property to undefined', done => {
        let setter = () => config.BLAH = undefined;

        expect(setter).to.throw('Cannot set property "BLAH" to undefined');
        done();
    });

    it('Listener should emit on property change', done => {
        config.listener.on('BLAH.set', val => {
            expect(val).to.equal('hello world');
            done();
        });

        config.BLAH = 'hello world';
    });

    it('Config object should be a singleton', done => {
        config = require('../index');
        config.BLAH = 'goodbye world';

        config = require('../index');
        expect(config.BLAH).to.equal('goodbye world');
        done();
    });

});