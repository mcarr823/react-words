import KeyValuePair from "classes/KeyValuePair";

export default class DatabaseType{

    static JSON = new KeyValuePair({ key: "json", value: "JSON" })
    static XML = new KeyValuePair({ key: "xml", value: "XML" })
    static CSV = new KeyValuePair({ key: "csv", value: "CSV" })
    static MONGO = new KeyValuePair({ key: "mongo", value: "MongoDB" })
    static MYSQL = new KeyValuePair({ key: "mysql", value: "MySQL" })
    static POSTGRES = new KeyValuePair({ key: "postgres", value: "PostgreSQL" })

    static all(): Array<KeyValuePair>{
        return [
            DatabaseType.JSON,
            DatabaseType.XML,
            DatabaseType.CSV,
            DatabaseType.MONGO,
            DatabaseType.MYSQL,
            DatabaseType.POSTGRES
        ]
    }

}