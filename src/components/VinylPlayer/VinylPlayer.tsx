import React, {useEffect, useState} from 'react';
import './player.css';
import {MusicPlayer} from "../../utils/MusicPlayer";
import * as Tone from "tone";
import Countdown from 'react-countdown';

let musicPlayer = new MusicPlayer()

const VinylPlayer = () => {
    const [
        isLabelRunning,
        setIsLabelRunning,
    ] = useState(false);

    let [
        chords ,
        setChords
    ] = useState('');

    let [
        BPM ,
        setBPM
    ] = useState('');

    let [
        duration ,
        setDuration
    ] = useState('');

    const [buttonStyles, setButtonStyles] = useState({
        top: '155px',
        boxShadow: '2px 2px 0px #1a1a1a',
        background:'#ac5151'
});

    useEffect(() => {

        const buttonClickHandler = () => {
            playPause()
        };

        const nextClickHandler = () => {
            if (isLabelRunning) {
                musicPlayer.next()

                if(musicPlayer.track){
                    setChords(JSON.stringify(musicPlayer.track.chordNames));
                    setBPM(String(musicPlayer.track.bpm));
                }
            }
        }

        const playPause = () => {
            if (isLabelRunning) {
                musicPlayer.stop()
                setChords('');
                setBPM('');
                setDuration('');


                setIsLabelRunning(false);

                setButtonStyles({
                    top: '155px',
                    boxShadow: '2px 2px 0px #1a1a1a',
                    background:'#ac5151'
            });
            } else {
                setButtonStyles({
                    top: '157px',
                    boxShadow: '1px 1px 1px #1a1a1a',
                    background:'#9dbc96'
            });

                setIsLabelRunning(true);

                Tone.start().then(() => {
                    musicPlayer.play()

                    if(musicPlayer.track){
                        setChords(JSON.stringify(musicPlayer.track.chordNames));
                        setBPM(String(musicPlayer.track.bpm));
                        setDuration(String(musicPlayer.track.duration));
                    }
                })
            }
        }

        const buttonElement = document.getElementById('button');
        buttonElement?.addEventListener('click', buttonClickHandler);

        const nextButton = document.getElementById('button1');
        nextButton?.addEventListener('click', nextClickHandler);


        return () => {
            buttonElement?.removeEventListener('click', buttonClickHandler);
            nextButton?.removeEventListener('click', nextClickHandler);
        };
    }, [isLabelRunning, chords, duration, BPM]);

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
                    <div id="button1"></div>
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
            <center>
                {chords}
            </center>
            <center>
                {BPM ? `${BPM} bpm`:''}
            </center>
            <center>
                {duration ? `${duration}s`:''}
            </center>
            <center>
                {duration ? <Countdown date={Date.now() + Number(duration)*1000} />:''}
            </center>
        </div>
    );
};

export default VinylPlayer;
