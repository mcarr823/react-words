import {fireEvent, render} from '@testing-library/react';
import {expect, test} from '@jest/globals';
import Checkbox from './Checkbox';

test('Checkbox click text, default off', async () => {

    var value = false
    const setValue = (newValue: boolean) => { value = newValue }
    const { getByLabelText } = render(
        <Checkbox id="test" label="test" value={value} setValue={setValue} />,
    );

    expect(value).toBe(false)

    const inputElem = getByLabelText("test")
    expect(inputElem.id).toBe("test")
    
    fireEvent.click(inputElem)

    expect(value).toBe(true)

})

test('Checkbox click text, default on', async () => {

    var value = true
    const setValue = (newValue: boolean) => { value = newValue }
    const { getByLabelText } = render(
        <Checkbox id="test" label="test" value={value} setValue={setValue} />,
    );

    expect(value).toBe(true)

    const inputElem = getByLabelText("test")
    expect(inputElem.id).toBe("test")
    
    fireEvent.click(inputElem)

    expect(value).toBe(false)

})