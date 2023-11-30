import * as Tone from "tone";
import {Loop, Player} from "tone";
import {ChordGenerator} from "./Generators/ChordGenerator";
import {SampleGenerator} from "./Generators/SampleGenerator";
import {LoopGenerator} from "./Generators/LoopGenerator";
import {MusicPlayer} from "./MusicPlayer";
import {Instruments} from "../types/instrument";
import {Chord} from "tonal";

export class Track
{
    public readonly bpm: number
    public readonly duration: number
    public readonly chords: Array<Array<string>> = []
    public readonly chordNames: Array<string> = []
    public loops: Array<Tone.Loop<any>> = []

    constructor(
        private readonly instruments: Instruments
    ) {
        this.bpm = this.generateBPM()
        this.duration = this.generateTrackDuration()

        let loopGenerator = new LoopGenerator();
        let sampleGenerator = new SampleGenerator()

        const samplerKeys = sampleGenerator.generate(this.instruments.piano.urls)
        const samplerHats =  sampleGenerator.generate(this.instruments.hats.urls)
        const samplerShakers =  sampleGenerator.generate(this.instruments.shaker.urls)
        const samplerTextures =  sampleGenerator.generate(this.instruments.textures.urls)
        const samplerSnap =  sampleGenerator.generate(this.instruments.snaps.urls)

        /* Rhythm */
        this.chords =  (new ChordGenerator()).createRandomChords();
        this.chordNames = this.chords.map(chord => {
            return Chord.detect(chord)[0];
        });

        loopGenerator.createLeadLoop(samplerKeys, this.chords);

        /* Textures */
        loopGenerator.createTexturesLoop(samplerTextures);

        loopGenerator.createDrumLoop(
            samplerHats,
            samplerShakers,
            samplerSnap
        )

        this.loops = loopGenerator.loops
    }

    private generateTrackDuration(): number
    {
        const min = 30//Number(process.env.REACT_APP_MIN_DURATION ?? 60);
        const max = 60//Number(process.env.REACT_APP_MAX_DURATION ?? 300);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    private generateBPM(): number
    {
        let minBPM = 70;
        let maxBPM = 90;
        return Math.floor(Math.random() * (maxBPM - minBPM + 1)) + minBPM;
    }
}
