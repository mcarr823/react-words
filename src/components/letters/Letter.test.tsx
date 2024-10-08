import {render} from '@testing-library/react';
import {expect, test} from '@jest/globals';
import Letter from './Letter';
import { Hint } from 'enums/Hint';

/**
 * Returns the card which contains the text element.
 * 
 * Card -> Card body -> Text element
 * 
 * @param textNode The text HTML element returned by getByText
 * @returns The grandparent of the text element
 */
function getCard(textNode: HTMLElement): HTMLElement | null | undefined {

    const cardBody = textNode.parentElement
    expect(cardBody).not.toBeNull()
    
    const card = cardBody?.parentElement
    expect(card).not.toBeNull()

    return card

}

test('Letter - Correct hint', async () => {

    const hint = Hint.CORRECT
    const { getByText } = render(
        <Letter letter="A" hint={hint}/>,
    );

    const text = getByText("A")
    const card = getCard(text)
    expect(card?.className).toBe("card text-light bg-success")

})

test('Letter - Correct another hint', async () => {

    const hint = Hint.CORRECT_ANOTHER
    const { getByText } = render(
        <Letter letter="A" hint={hint}/>,
    );

    const text = getByText("A")
    const card = getCard(text)
    expect(card?.className).toBe("card text-light bg-primary")

})

test('Letter - Incorrect hint', async () => {

    const hint = Hint.INCORRECT
    const { getByText } = render(
        <Letter letter="A" hint={hint}/>,
    );

    const text = getByText("A")
    const card = getCard(text)
    expect(card?.className).toBe("card text-light bg-secondary")

})

test('Letter - Wrong placement hint', async () => {

    const hint = Hint.WRONG_PLACEMENT
    const { getByText } = render(
        <Letter letter="A" hint={hint}/>,
    );

    const text = getByText("A")
    const card = getCard(text)
    expect(card?.className).toBe("card text-light bg-warning")

})
