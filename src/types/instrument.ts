import * as string_decoder from "string_decoder";
export enum InstrumentType {
    piano = 'piano',
    hats = 'hats',
    shaker = 'shaker',
    textures = 'textures',
    snaps = 'snaps'
}

export type Instrument = {
    urls: Array<any>,
}

export type Instruments = {
    piano: Instrument,
    hats: Instrument,
    shaker: Instrument,
    textures: Instrument,
    snaps: Instrument,
}


export enum Keys {
    'C4' = 'C4',
    'C#4' = 'C#4',
    'D4' = 'C4',
    'D#4' = 'C#4',
    'E4' = 'E4',
    'F4' = 'F4',
    'F#4' = 'F#4',
    'G4' = 'G4',
    'G#4' = 'G#4',
    'A4' = 'A4',
    'A#4' = 'A#4',
    'B4' = 'B4',
    'C5' = 'C5',
    'C#5' = 'C#5',
    'D5' = 'C5',
    'D#5' = 'C#5',
    'E5' = 'E5',
    'F5' = 'F5',
    'F#5' = 'F#5',
    'G5' = 'G5',
    'G#5' = 'G#5',
    'A5' = 'A5',
    'A#5' = 'A#5',
    'B5' = 'B5',
}
