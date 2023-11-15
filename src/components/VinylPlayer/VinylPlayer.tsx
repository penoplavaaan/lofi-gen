import React, {useEffect, useState} from 'react';
import './player.css';
import {MusicPlayer} from "../../utils/MusicPlayer";
import * as Tone from "tone";

let musicPlayer : MusicPlayer

const VinylPlayer = () => {
    const [isLabelRunning, setIsLabelRunning] = useState(false);
    const [buttonStyles, setButtonStyles] = useState({
        top: '155px',
        boxShadow: '2px 2px 0px #1a1a1a'
    });

    useEffect(() => {
        const buttonClickHandler = async () => {
            if (isLabelRunning && musicPlayer) {
                Tone.start().then(() => {
                    musicPlayer.stop()
                })

                setIsLabelRunning(false);

                setButtonStyles({
                    top: '155px',
                    boxShadow: '2px 2px 0px #1a1a1a'
                });
            } else {
                musicPlayer = new MusicPlayer()

                setButtonStyles({
                    top: '157px',
                    boxShadow: '0px 0px 0px #1a1a1a'
                });

                setIsLabelRunning(true);
                musicPlayer.muteVinylNoise();

                await Tone.start().then(() => musicPlayer.play())
            }
        };

        const buttonElement = document.getElementById('button');
        buttonElement?.addEventListener('click', buttonClickHandler);

        return () => {
            buttonElement?.removeEventListener('click', buttonClickHandler);
        };
    }, [isLabelRunning]);

    return (
        <div>
            <link href="https://fonts.googleapis.com/css?family=Quicksand" rel="stylesheet" type="text/css" />
            <center>
                <div id="turntable">
                    <div id="table-shadow"></div>
                    <div id="table-feet"></div>
                    <div id="wood">
                        <div id="grain1"></div>
                        <div id="grain2"></div>
                        <div id="grain3"></div>
                        <div id="grain4"></div>
                        <div id="grain5"></div>
                        <div id="grain6"></div>
                    </div>
                    <div id="wood2">
                        <div id="grain7"></div>
                        <div id="grain8"></div>
                        <div id="grain9"></div>
                        <div id="grain10"></div>
                        <div id="grain11"></div>
                    </div>
                    <div id="table"></div>
                    <div id="button" style={buttonStyles}></div>
                    <div id="disk">
                        <div id="label" className={isLabelRunning ? 'running' : 'paused'}></div>
                    </div>
                    <div id="axis-shadow"></div>
                    <div id="axis"></div>
                    <div id="arm-shadow"></div>
                    <div id="weight-shadow"></div>
                    <div id="base">
                        <div id="axle-shadow"></div>
                    </div>
                    <div id="lever"></div>
                    <div id="weight"></div>
                    <div id="axle"></div>
                    <div id="arm"></div>
                    <div id="head"></div>
                </div>
            </center>
        </div>
    );
};

export default VinylPlayer;
