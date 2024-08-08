import Config from "classes/Config"
import DatabaseType from "enums/DatabaseType"
import DatabaseDriverBuilder from "./DatabaseDriverBuilder"
import JsonDriver from "./json/JsonDriver"
import CsvDriver from "./csv/CsvDriver"
import XmlDriver from "./xml/XmlDriver"
import { HerokuEndpoint } from "network/endpoint/HerokuEndpoint"
import { RandoEndpoint } from "network/endpoint/RandoEndpoint"
import { RyanrkEndpoint } from "network/endpoint/RyanrkEndpoint"
import HttpDriver from "./http/HttpDriver"

const config = Config.emptyConfig()

test("JsonDriver", () => {
    config.dbType = DatabaseType.JSON.key
    const driver = DatabaseDriverBuilder(config)
    expect(driver).toBeInstanceOf(JsonDriver)
})

test("CsvDriver", () => {
    config.dbType = DatabaseType.CSV.key
    const driver = DatabaseDriverBuilder(config)
    expect(driver).toBeInstanceOf(CsvDriver)
})

test("XmlDriver", () => {
    config.dbType = DatabaseType.XML.key
    const driver = DatabaseDriverBuilder(config)
    expect(driver).toBeInstanceOf(XmlDriver)
})

test("HerokuEndpoint", () => {
    config.dbType = DatabaseType.ONLINE_HEROKU.key
    const driver = DatabaseDriverBuilder(config)
    expect(driver).toBeInstanceOf(HttpDriver)
    const http = driver as HttpDriver
    expect(http.endpoint).toBeInstanceOf(HerokuEndpoint)
})

test("RandoEndpoint", () => {
    config.dbType = DatabaseType.ONLINE_RANDO.key
    const driver = DatabaseDriverBuilder(config)
    expect(driver).toBeInstanceOf(HttpDriver)
    const http = driver as HttpDriver
    expect(http.endpoint).toBeInstanceOf(RandoEndpoint)
})

test("RyanrkEndpoint", () => {
    config.dbType = DatabaseType.ONLINE_RYANRK.key
    const driver = DatabaseDriverBuilder(config)
    expect(driver).toBeInstanceOf(HttpDriver)
    const http = driver as HttpDriver
    expect(http.endpoint).toBeInstanceOf(RyanrkEndpoint)
})

test("Error", () => {
    config.dbType = "error"
    let success = false
    try{
        DatabaseDriverBuilder(config)
        success = true
    }catch(e){
        //
    }
    expect(success).toBe(false)
})