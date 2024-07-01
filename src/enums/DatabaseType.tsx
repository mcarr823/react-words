import KeyValuePair from "classes/KeyValuePair";

export default class DatabaseType{

    static JSON = new KeyValuePair({ key: "json", value: "JSON (only suitable for smaller dictionaries)" })
    static MONGO = new KeyValuePair({ key: "mongo", value: "MongoDB" })
    static MYSQL = new KeyValuePair({ key: "mysql", value: "MySQL" })
    static POSTGRES = new KeyValuePair({ key: "postgres", value: "PostgreSQL" })

    static all(): Array<KeyValuePair>{
        return [
            DatabaseType.JSON,
            DatabaseType.MONGO,
            DatabaseType.MYSQL,
            DatabaseType.POSTGRES
        ]
    }

}