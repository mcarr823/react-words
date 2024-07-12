"use client"

import Letters from "@/components/letters/Letters";
import InfoModal from "@/components/modal/InfoModal";
import Keyboard from "@/components/ui/Keyboard";
import React from "react";
import { InfoCircle } from "react-bootstrap-icons";
import ModalViewModel from "viewmodels/ModalViewModel";
import PlayViewModel, { IPlayViewModel } from "viewmodels/PlayViewModel";

/**
 * The actual game screen.
 * 
 * This screen is responsible for displaying the word to guess,
 * handling player input, etc.
 * 
 * @returns Play screen
 */
export default function Play() {

    const model = PlayViewModel()
    const infoModel = ModalViewModel()

    // For now, let's just display a few hard-coded test words
    const guessNodes = model.guesses.map((g, i) => <Letters key={i} word={model.word} guess={g}/>)

    // Only show color hints on the "input" tiles if the game has ended,
    // so our last guess will be highlighted where it is
    const disableInputHints = !model.gameOver

    return (
        
        <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-lg-9 col-xl-6">
                
                <div>
                    <h2 className="m-3 text-center">
                        Words
                    </h2>

                    <div className="ps-3">
                        <button className="btn btn-warning" onClick={infoModel.showModal}>
                            <InfoCircle/>
                            &nbsp;
                            <span className="p-2">How To Play</span>
                        </button>
                    </div>

                    <div className="p-3">
                        {guessNodes}
                        <Letters word={model.word} guess={model.currentGuess} disableHints={disableInputHints}/>
                    </div>

                    <Keyboard model={model}/>
                
                </div>
            </div>

            <GameOver model={model}/>
            <Loading model={model}/>
            <ErrorAlert model={model}/>
            <InfoModal model={infoModel}/>
        </div>
    );
}

function GameOver({model} : {model: IPlayViewModel}){

    if (!model.gameOver){
        return (<></>)
    }

    const correctGuess = model.currentGuess == model.word
    const title = correctGuess ? "Victory" : "Game Over"
    const text = correctGuess ? "Great job!" : `The word was: ${model.word}`
    const playAgain = (
        <button type="button" className="btn btn-primary" tabIndex={0} onClick={model.playAgain}>Play Again</button>
    )

    return (
        <Modal title={title} message={text} button={playAgain}/>
    )
}

function Loading({model} : {model: IPlayViewModel}){

    if (model.loaded){
        return (<></>)
    }

    return (
        <Modal title="Loading" message="Preparing your game - please wait" button={(<>&nbsp;</>)}/>
    )

}

function ErrorAlert({model} : {model: IPlayViewModel}){

    if (model.error.length === 0){
        return (<></>)
    }

    return (
        <Modal title="Error" message={model.error} button={(<>&nbsp;</>)}/>
    )
}

function Modal({
    title,
    message,
    button
} : {
    title: string;
    message: string;
    button: React.ReactNode
}){

    const styles = {
        display: 'block',
        background: '#0007'
    }

    return (
        <div className="modal" style={styles} tabIndex={-1}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                    </div>
                    <div className="modal-body">
                        <b>{message}</b>
                    </div>
                    <div className="modal-footer">
                        {button}
                    </div>
                </div>
            </div>
        </div>
    )
}

