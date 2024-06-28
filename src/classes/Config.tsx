import IConfig from "interfaces/IConfig";

/**
 * Validates an IConfig JSON data response and provides methods for
 * utilizing them.
 */
export default class Config implements IConfig{

    attempts: number;
    letters: number;
    keyColor: boolean;
    warnAlreadyAttempted: boolean;
    useDatabase: boolean;
    dbType: string;
    dbHost: string;
    dbPort: number;

    constructor(
        conf: IConfig
    ){
        this.attempts = this.validate(conf.attempts)
        this.letters = this.validate(conf.letters)
        this.keyColor = this.validate(conf.keyColor)
        this.warnAlreadyAttempted = this.validate(conf.warnAlreadyAttempted)
        this.useDatabase = this.validate(conf.useDatabase)
        this.dbType = this.validate(conf.dbType)
        this.dbHost = this.validate(conf.dbHost)
        this.dbPort = this.validate(conf.dbPort)
    }

    private validate<T>(value: T): T {
        if (typeof value === 'undefined'){
            throw Error("One or more expected parameters not specified")
        }
        return value
    }

    static emptyConfig(): Config {
        return new Config({
            attempts: 6,
            letters: 5,
            keyColor: true,
            warnAlreadyAttempted: true,
            useDatabase: false,
            dbType: '',
            dbHost: '',
            dbPort: 0
        })
    }

}