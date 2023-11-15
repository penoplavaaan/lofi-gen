import * as Tone from "tone";
import {Loop, Player} from "tone";
import {Chords, Durations} from "../types/instrument";

let vinylNoiseUrl: any
let config: any
let configAnnotation: any

vinylNoiseUrl = require(`../resources/other/vinyl_noise.mp3`)

const Cmaj7 = Chords.Cmaj7
const Fmaj7: Array<string> = Chords.Fmaj7

export class MusicPlayer
{
    private readonly vinylNoise: Player
    private readonly vinylNoiseDuration = 3;
    private bpm: number
    // private key: string
    private duration: number
    private timeSignature: number
    private loops: Array<Loop> = []

    constructor() {
        this.bpm = 60
        // this.key = randomInitials.key
        this.duration = this.generateTrackDuration()
        this.timeSignature = 4;

        this.vinylNoise = new Tone.Player(vinylNoiseUrl).toDestination()
    }

    play() {
        this.generateLoops()
        this.playGeneratedLoops()
    }

    generateLoops()
    {
        let keys = require('../resources/one_shot/Keys.wav')
        let cream = require('../resources/one_shot/Cream.wav')
        let tight = require('../resources/one_shot/Tight.wav')
        let clap = require('../resources/one_shot/Clap.wav')

        const samplerKeys = this.createSampler(keys)
        const samplerCream =  this.createSampler(cream)
        const samplerTight =  this.createSampler(tight)
        const samplerClap =  this.createSampler(clap)

        const loopKeys = this.createLoop(
            samplerKeys,
            Cmaj7,
            Durations.hole,
            Durations.zero
        )

        const loopKeysB = this.createLoop(
            samplerKeys,
            Fmaj7,
            Durations.hole,
            Durations.half
        )

        const loopCream = this.createLoop(
            samplerCream,
            "C4",
            Durations.eight,
            Durations.zero
        )

        const loopTight = this.createLoop(
            samplerTight,
            "C4",
            Durations.half,
            Durations.half
        )

        const loopClap = this.createLoop(
            samplerClap,
            "C4",
            Durations.thirtyseconds,
            Durations.hole
        )
    }

    playGeneratedLoops(){
        Tone.loaded().then(() => {
            Tone.Transport.start();
        })
    }

    stop() {
        this.playVinylNoise()
        Tone.Transport.stop();
        this.stopLoops();
    }

    stopLoops()
    {
        for (const loopsKey in this.loops) {
            this.loops[loopsKey].stop()
        }

        this.loops = [];
    }

    playVinylNoise(): void {
        Tone.loaded().then(() => {
            this.vinylNoise.fadeOut = 4
            this.vinylNoise.start(2,0, this.vinylNoiseDuration)
        })
    }

    muteVinylNoise(): void {
        this.vinylNoise.fadeOut = 0
        this.vinylNoise.stop();
    }

    // pickRandomBpmKey(data: any): any{
    //     const BPMs = Object.keys(data);
    //     const randomBPM = BPMs[Math.floor(Math.random() * BPMs.length)];
    //     const keysArray = data[randomBPM];
    //     const randomKey = keysArray[Math.floor(Math.random() * keysArray.length)];
    //
    //     if (randomBPM === this.bpm && this.key === this.key) {
    //         return this.pickRandomBpmKey(data)
    //     }
    //
    //     return {
    //         "bpm": randomBPM,
    //         "key": randomKey
    //     }
    // }

    generateTrackDuration(): number
    {
        const min = Number(process.env.REACT_APP_MIN_DURATION ?? 10);
        const max = Number(process.env.REACT_APP_MAX_DURATION ?? 20);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getDuration(
        duration: Durations
    )
    {
        if (duration === Durations.zero){
            return Durations.zero
        }

        let barSeconds = (60/this.bpm) * this.timeSignature;
        return barSeconds/duration
    }

    createLoop (
        sampler: Tone.Sampler,
        notes: Tone.Unit.Frequency | Tone.Unit.Frequency[],
        loopInterval: Durations,
        offset: Durations,
        duration: Durations = Durations.quarter
    ): Tone.Loop<Tone.LoopOptions>{
        let loop = new Tone.Loop(time => {
                sampler.triggerAttackRelease(notes, this.getDuration(duration), time);
            },
            this.getDuration(loopInterval)).start(this.getDuration(offset)
        );
        this.loops.push(loop)
        return loop;
    }

    createSampler(asset: any)
    {
        return new Tone.Sampler({
            urls: {
                "C4": asset
            },
            release: 1,
        }).toDestination();
    }
}
