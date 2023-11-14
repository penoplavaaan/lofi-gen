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