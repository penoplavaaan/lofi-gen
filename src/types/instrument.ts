export type Instrument = {
    type: InstrumentType,
    name: string
    duration: number
}

export enum InstrumentType {
    bass = 'bass',
    guitar = 'guitar',
    pad = 'pad',
    piano = 'piano',
    vocals = 'vocals',
    drum = 'drum'
}

export enum Keys {
    C4 = 'C4',
    D4 = 'C4',
    E4 = 'E4',
    F4 = 'F4',
    G4 = 'G4',
    A4 = 'A4',
    B4 = 'B4',
    C5 = 'C5',
    D5 = 'C5',
    E5 = 'E5',
    F5 = 'F5',
    G5 = 'G5',
    A5 = 'A5',
    B5 = 'B5',
}

export const Chords = {
    Cmaj7: [
        Keys.C4,
        Keys.E4,
        Keys.G4,
        Keys.B4
    ],
    Dm7: [
        Keys.D4,
        Keys.F4,
        Keys.A4,
        Keys.C5
    ],
    Em7: [],
    Fmaj7: [
        Keys.F4,
        Keys.A4,
        Keys.C5,
        Keys.E5
    ],
}

export enum Durations {
    hole = 1,
    half = 2,
    quarter = 4,
    eight = 8,
    sixteenth = 16,
    thirtyseconds = 32,
    zero = 0
}