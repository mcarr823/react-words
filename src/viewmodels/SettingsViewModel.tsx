import Config from "classes/Config"
import IConfig from "interfaces/IConfig"
import { INextResponseSuccess } from "network/NextResponseSuccess"
import { useEffect, useState } from "react"

export default function SettingsViewModel(): ISettingsViewModel{

    const [loaded, setLoaded] = useState<boolean>(false)
    const [saving, setSaving] = useState<boolean>(false)

    const [attempts, setAttempts] = useState<number>(0)
    const [letters, setLetters] = useState<number>(0)
    const [keyColor, setKeyColor] = useState<boolean>(false)
    const [warnAlreadyAttempted, setWarnAlreadyAttempted] = useState<boolean>(false)
    const [dbType, setDbType] = useState<string>("")
    const [dbHost, setDbHost] = useState<string>("")
    const [dbPort, setDbPort] = useState<number>(0)

    // Load a config object into the viewmodel
    const importConfig = (config: IConfig) => {
        setAttempts(config.attempts)
        setLetters(config.letters)
        setKeyColor(config.keyColor)
        setWarnAlreadyAttempted(config.warnAlreadyAttempted)
        setDbType(config.dbType)
        setDbHost(config.dbHost)
        setDbPort(config.dbPort)
    }

    // When the viewmodel first loads, fetch the config from the server
    useEffect(() => {
        if (!loaded){
            fetch('/api/config')
                .then((res) => res.json())
                .then((res: INextResponseSuccess) => {
                    const data = res.data as IConfig
                    importConfig(data)
                    setLoaded(true)
                })
        }
    }, [loaded])

    // Function for saving the user's configs to disk
    const save = () => {
        setSaving(true)
        const config = new Config({
            attempts,
            letters,
            keyColor,
            warnAlreadyAttempted,
            dbType,
            dbHost,
            dbPort,
        })
        fetch('/api/config', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(config),
        })
            .then((res) => res.json())
            .then((_: JSON) => setSaving(false))
    }

    // TODO: function to retrieve settings from server
    // TODO: function to save settings on server

    return {
        attempts, setAttempts,
        letters, setLetters,
        keyColor, setKeyColor,
        warnAlreadyAttempted, setWarnAlreadyAttempted,
        dbType, setDbType,
        dbHost, setDbHost,
        dbPort, setDbPort,
        saving,
        save
    }

}

interface ISettingsViewModel{
    attempts: number;
    setAttempts: (value: number) => void;
    letters: number;
    setLetters: (value: number) => void;
    keyColor: boolean;
    setKeyColor: (value: boolean) => void;
    warnAlreadyAttempted: boolean;
    setWarnAlreadyAttempted: (value: boolean) => void;
    dbType: string;
    setDbType: (value: string) => void;
    dbHost: string;
    setDbHost: (value: string) => void;
    dbPort: number;
    setDbPort: (value: number) => void;
    saving: boolean;
    save: () => void;
}