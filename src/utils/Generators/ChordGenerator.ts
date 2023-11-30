import {Chord} from "tonal";

export class ChordGenerator
{
    private readonly chords: Array<any>;

    constructor() {
        this.chords = [];

        this.chords.push(this.createChords([
            ['D', 'm11'],
            ['G', 'm7'],
            ['D', 'm11'],
            ['Eb', 'm11'],
            ['C#', 'dim7'],
        ], 2))

        this.chords.push(this.createChords([
            ['A', 'm11'],
            ['D', '7'],
            ['F', 'maj7'],
            ['C', 'maj7'],
        ], 2))

        this.chords.push(this.createChords([
            ['D', 'm11'],
            ['Eb', 'm11'],
        ], 2))

        this.chords.push(this.createChords([
            ['A', 'm11'],
            ['D', '7'],
            ['F', 'maj7'],
            ['C', 'maj7'],
        ], 2))

        this.chords.push(this.createChords([
            ['F', 'm9'],
            ['Eb', 'maj9'],
        ], 2))

        this.chords.push(this.createChords([
            ['C', 'm11'],
            ['F', 'm9'],
            ['C', 'm11'],
            ['G', '7#5'],
        ], 2))

        this.chords.push(this.createChords([
            ['Eb', 'maj9'],
            ['Ab', 'maj13'],
        ], 2))

        this.chords.push(this.createChords([
            ['G', 'maj7'],
            ['F#', 'm7'],
            ['A', 'm7b5'],
        ], 2))

    }

    public createChords(
        chordsArr: Array<Array<string>>,
        octave: number = 4
    )
    {
        let chords = [];
        for (const chord of chordsArr) {
            chords.push(Chord.getChord(chord[1],chord[0]+2))
        }

        return chords.map((chord) => chord.notes)
    }

    public createRandomChords()
    {
        const randomIndex = Math.floor(Math.random() * this.chords.length);

        return this.chords[randomIndex];
    }
}
