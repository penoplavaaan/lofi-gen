import * as Tone from "tone";
import {Player, Players} from "tone";
import {Instrument} from "../types/instrument";

let vinylNoiseUrl: any
let config: any
let configAnnotation: any

vinylNoiseUrl = require(`../resources/other/vinyl_noise.mp3`)
config = require("../configs/loops.json");
configAnnotation = require("../configs/loops.annotation.json");

export class MusicPlayer
{
    private readonly vinylNoise: Player
    private readonly vinylNoiseDuration = 3;
    private players: Players = new Players()
    private instruments: Array<Player> = []
    private  config: Array<Instrument>
    private bpm: string
    private key: string
    private duration: number
    private playing  = false

    constructor() {
        let randomInitials =  this.pickRandomBpmKey(configAnnotation)
        this.bpm = randomInitials.bpm
        this.key = randomInitials.key
        this.duration = this.generateDuration()

        this.config = config[this.bpm][this.key].instruments;

        for (const i in this.config) {
            const url = this.buildUrl(this.config[i].name)

            this.instruments.push(
                new Tone.Player(url).toDestination()
            )
        }

        this.vinylNoise = new Tone.Player(vinylNoiseUrl).toDestination()
    }

    async play() {
        this.playing = true
        Tone.loaded().then(() => {
            for (const i in this.instruments) {
                let instrument = this.instruments[i];
                instrument.fadeOut = 4;
                instrument.fadeIn = 2;
                instrument.loop = true;
                instrument.autostart = true;
                instrument.start(0, 0, this.duration)
            }
        })

        let prevDuration = this.duration
        setTimeout(() => {
            if (this.playing) {
                this.playVinylNoise()
                setTimeout(() => {
                    this.reInitialize()
                    this.play()

                }, this.vinylNoiseDuration * 1000)
            }
        }, prevDuration*1000)
    }

    stop() {
        this.playing = false;

        for (const i in this.instruments) {
            this.instruments[i].stop();
        }
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

    buildUrl(name: string) {
        return require(`../resources/loops/${this.bpm}/${this.key}/${name}`)
    }

    pickRandomBpmKey(data: any): any{
        const BPMs = Object.keys(data);
        const randomBPM = BPMs[Math.floor(Math.random() * BPMs.length)];
        const keysArray = data[randomBPM];
        const randomKey = keysArray[Math.floor(Math.random() * keysArray.length)];

        if (randomBPM === this.bpm && this.key === this.key){
            return this.pickRandomBpmKey(data)
        }

        return {
            "bpm": randomBPM,
            "key": randomKey
        }
    }

    generateDuration(): number
    {
        const min = 5;
        const max = 10;
        const duration = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log('duration is: '+duration)
        return duration
    }

    public reInitialize()
    {
        this.instruments = [];
        let randomInitials =  this.pickRandomBpmKey(configAnnotation)
        this.bpm = randomInitials.bpm
        this.key = randomInitials.key
        this.duration = this.generateDuration()

        this.config = config[this.bpm][this.key].instruments;

        for (const i in this.config) {
            const url = this.buildUrl(this.config[i].name)

            this.instruments.push(
                new Tone.Player(url).toDestination()
            )
        }
    }


}
