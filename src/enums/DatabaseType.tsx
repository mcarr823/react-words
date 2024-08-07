import KeyValuePair from "classes/KeyValuePair";

export default class DatabaseType{

    static JSON = new KeyValuePair({ key: "json", value: "JSON" })
    static XML = new KeyValuePair({ key: "xml", value: "XML" })
    static CSV = new KeyValuePair({ key: "csv", value: "CSV" })
    static MONGO = new KeyValuePair({ key: "mongo", value: "MongoDB" })
    static MYSQL = new KeyValuePair({ key: "mysql", value: "MySQL" })
    static POSTGRES = new KeyValuePair({ key: "postgres", value: "PostgreSQL" })
    static ONLINE_HEROKU = new KeyValuePair({ key: "online_heroku", value: "Online - Heroku" })
    static ONLINE_RANDO = new KeyValuePair({ key: "online_rando", value: "Online - Rando" })
    static ONLINE_RYANRK = new KeyValuePair({ key: "online_ryanrk", value: "Online - Ryanrk" })

    static all(): Array<KeyValuePair>{
        return [
            DatabaseType.ONLINE_HEROKU,
            DatabaseType.ONLINE_RANDO,
            DatabaseType.ONLINE_RYANRK,
            DatabaseType.JSON,
            DatabaseType.XML,
            DatabaseType.CSV,
            DatabaseType.MONGO,
            DatabaseType.MYSQL,
            DatabaseType.POSTGRES
        ]
    }

}