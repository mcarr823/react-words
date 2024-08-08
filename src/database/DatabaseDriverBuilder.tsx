import DatabaseType from "enums/DatabaseType";
import IConfig from "interfaces/IConfig";
import { IDatabaseDriver } from "interfaces/IDatabaseDriver";
import JsonDriver from "./json/JsonDriver";
import XmlDriver from "./xml/XmlDriver";
import CsvDriver from "./csv/CsvDriver";
import MongoDriver from "./mongo/MongoDriver";
import MariaDriver from "./mariadb/MariaDriver";
import PostgresDriver from "./postgres/PostgresDriver";
import { HerokuEndpoint } from "network/endpoint/HerokuEndpoint";
import HttpDriver from "./http/HttpDriver";
import { RandoEndpoint } from "network/endpoint/RandoEndpoint";
import { RyanrkEndpoint } from "network/endpoint/RyanrkEndpoint";

/**
 * Instantiates the database driver which coincides with
 * the app's config.
 * 
 * @param config Configuration object which specifies the
 * type of database to use.
 * @returns Instantiated database driver object.
 * @throws Error if the database driver type is unknown.
 * 
 **/
export default function DatabaseDriverBuilder(
    config: IConfig
) : IDatabaseDriver{

    const type = config.dbType;

    switch(type){
        case DatabaseType.JSON.key:
            return new JsonDriver();
        case DatabaseType.XML.key:
            return new XmlDriver();
        case DatabaseType.CSV.key:
            return new CsvDriver();
        // case DatabaseType.MONGO.key:
        //     return new MongoDriver();
        // case DatabaseType.MYSQL.key:
        //     return new MariaDriver();
        // case DatabaseType.POSTGRES.key:
        //     return new PostgresDriver();
        case DatabaseType.ONLINE_HEROKU.key:
            return new HttpDriver(new HerokuEndpoint())
        case DatabaseType.ONLINE_RANDO.key:
            return new HttpDriver(new RandoEndpoint())
        case DatabaseType.ONLINE_RYANRK.key:
            return new HttpDriver(new RyanrkEndpoint())
        default:
            throw new Error("Unknown database type");
    }

}