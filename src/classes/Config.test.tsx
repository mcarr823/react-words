/**
 * @jest-environment node
 */

import IConfig from 'interfaces/IConfig';
import Config from './Config';
import {expect, test} from '@jest/globals';

test('Config parsing test', async () => {

    const conf = new Config({
        attempts: 0,
        letters: 5,
        keyColor: true,
        warnAlreadyAttempted: false,
        dbType: "test",
        dbHost: "localhost",
        dbPort: 900
    })
    
    expect(conf.attempts).toBe(0)
    expect(conf.letters).toBe(5)
    expect(conf.keyColor).toBe(true)
    expect(conf.warnAlreadyAttempted).toBe(false)
    expect(conf.dbType).toBe("test")
    expect(conf.dbHost).toBe("localhost")
    expect(conf.dbPort).toBe(900)

});

// When reading the JSON file containing the server config,
// it's parsed by casting the JSON object directly to IConfig.
// IConfig doesn't allow undefined parameters, but casting that
// way can result in them anyway.
// This test is to confirm that passing an IConfig object with
// undefined parameters to a Config object will throw an error.
test('Config failed cast', async () => {

    const iconf = {} as IConfig

    var parsedSuccessfully = false
    try{
        const conf = new Config(iconf)
        parsedSuccessfully = true
    }catch(e){}

    expect(parsedSuccessfully).toBe(false)

});

