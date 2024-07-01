export default class KeyValuePair{

    key: string;
    value: string;

    constructor(pair: IKeyValuePair){
        this.key = pair.key
        this.value = pair.value
    }

}

interface IKeyValuePair{
    key: string;
    value: string;
}