import { useState } from "react"

export default function SettingsViewModel(): ISettingsViewModel{

    const [attempts, setAttempts] = useState<number>(0)
    const [letters, setLetters] = useState<number>(0)
    const [keyColor, setKeyColor] = useState<boolean>(false)
    const [warnAlreadyAttempted, setWarnAlreadyAttempted] = useState<boolean>(false)
    const [dbType, setDbType] = useState<string>("")
    const [dbHost, setDbHost] = useState<string>("")
    const [dbPort, setDbPort] = useState<number>(0)

    // TODO: function to retrieve settings from server
    // TODO: function to save settings on server

    return {
        attempts, setAttempts,
        letters, setLetters,
        keyColor, setKeyColor,
        warnAlreadyAttempted, setWarnAlreadyAttempted,
        dbType, setDbType,
        dbHost, setDbHost,
        dbPort, setDbPort
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
}