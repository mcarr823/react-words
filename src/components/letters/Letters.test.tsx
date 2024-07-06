import {render} from '@testing-library/react';
import {expect, test} from '@jest/globals';
import Letters from './Letters';

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

/**
 * This test renders a guessed word and then checks the color
 * of each individual letter to make sure the colors match up
 * with our expectations.
 */
test('Letters - Hinting colors', async () => {

    const { getByText, getAllByText } = render(
        <Letters word="TESTING" guess="TOASTIE"/>,
    );

    // There are 2 T's in TOASTIE, so we use getAllByText instead
    const tLetters = getAllByText("T")
    expect(tLetters.length).toBe(2)

    // The first T matches, but the second doesn't.
    // So it's Hint.CORRECT_ANOTHER (bg-primary) instead of
    // Hint.CORRECT (bg-success)
    const tLetter1 = tLetters[0]
    const tCard1 = getCard(tLetter1)
    expect(tCard1?.className).toBe("card text-light bg-primary")

    // There are no O's in TESTING, so it's Hint.INCORRECT (bg-secondary)
    const oLetter = getByText("O")
    const oCard = getCard(oLetter)
    expect(oCard?.className).toBe("card text-light bg-secondary")

    // Same with A
    const aLetter = getByText("A")
    const aCard = getCard(aLetter)
    expect(aCard?.className).toBe("card text-light bg-secondary")

    // S is one character off, so it's Hint.WRONG_PLACEMENT
    // (teSting vs toaStie)
    const sLetter = getByText("S")
    const sCard = getCard(sLetter)
    expect(sCard?.className).toBe("card text-light bg-warning")

    // Same with the second T (tesTing vs toasTie)
    const tLetter2 = tLetters[1]
    const tCard2 = getCard(tLetter2)
    expect(tCard2?.className).toBe("card text-light bg-warning")

    // And with I (testIng vs toastIe)
    const iLetter = getByText("I")
    const iCard = getCard(iLetter)
    expect(iCard?.className).toBe("card text-light bg-warning")

    // And with E (tEsting vs toastiE)
    const eLetter = getByText("E")
    const eCard = getCard(eLetter)
    expect(eCard?.className).toBe("card text-light bg-warning")

})
