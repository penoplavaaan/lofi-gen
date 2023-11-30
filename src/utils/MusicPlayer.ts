import * as Tone from "tone";
import {Loop, Player} from "tone";
import {Track} from "./Track";
import {Instruments, InstrumentType} from "../types/instrument";
import {Chord} from "tonal";

let vinylNoiseUrl = require(`../resources/other/vinyl_noise.mp3`)
let piano = [
    require('../resources/one_shot/piano/piano1.mp3'),
    require('../resources/one_shot/piano/piano2.mp3'),
    require('../resources/one_shot/piano/piano3.wav'),
]
let hats = [
    require('../resources/one_shot/drums/hihat/hihat1.wav'),
    require('../resources/one_shot/drums/hihat/hihat2.wav'),
    require('../resources/one_shot/drums/percussion/percussion1.wav'),
    require('../resources/one_shot/drums/percussion/percussion2.wav'),
    require('../resources/one_shot/drums/percussion/percussion3.wav'),
    require('../resources/one_shot/drums/percussion/percussion5.wav'),
    require('../resources/one_shot/drums/percussion/percussion6.wav'),
    require('../resources/one_shot/drums/percussion/percussion7.wav'),
    require('../resources/one_shot/drums/percussion/percussion8.wav'),
]
let shakers = [
    require('../resources/one_shot/drums/shaker/shaker1.wav')
]
let snaps = [
    require('../resources/one_shot/drums/snap/snap1.wav')
]
let textures = [
    require('../resources/one_shot/textures/texture1.wav'),
    require('../resources/one_shot/textures/texture2.wav'),
    require('../resources/one_shot/textures/texture3.wav')
]

const DEFAULT_BPM = 60;
const DEFAULT_DURATION_S = 60;

export class MusicPlayer
{
    private readonly vinylNoise: Player
    private readonly vinylNoiseDuration = 3;
    public track: Track | undefined;
    private playing: boolean = false
    public instruments: Instruments

    constructor() {
        this.vinylNoise = new Tone.Player(vinylNoiseUrl).toDestination()

        this.instruments = {
            piano: {
                urls: piano,
            },
            hats: {
                urls: hats,
            },
            shaker: {
                urls: shakers,
            },
            textures: {
                urls: textures
            },
            snaps: {
                urls: snaps
            }
        }
    }

    next()
    {
        this.stop();
        this.play();
    }

    play() {
        this.playing = true;

        this.muteVinylNoise()
        this.track = new Track(this.instruments)

        // console.log('Duration is: '+ this.track.duration)
        this.playGeneratedLoops()
    }

    playGeneratedLoops(){
        Tone.loaded().then(() => {
            Tone.Transport.bpm.value = this.track?.bpm ?? DEFAULT_BPM;
            Tone.Transport.start();
            setTimeout(() => {
                if (this.playing){
                    this.next()
                }
            }, (this.track?.duration ?? DEFAULT_DURATION_S) * 1000)
        })
    }

    stop() {
        this.playing = false;
        this.playVinylNoise()
        Tone.Transport.stop();
        this.stopLoops();
    }

    stopLoops()
    {
        if (this.track){
            for (const loopsKey in this.track?.loops ?? []) {
                this.track.loops[loopsKey].stop()
            }

            this.track.loops = [];
        }
    }

    playVinylNoise(): void {
        Tone.loaded().then(() => {
            this.vinylNoise.fadeOut = 4
            this.vinylNoise.start(2,0, this.vinylNoiseDuration)
        })
    }

    muteVinylNoise(): void {
        this.vinylNoise.stop();
    }
}
