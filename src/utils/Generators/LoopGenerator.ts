import * as Tone from "tone";
import {Keys} from "../../types/instrument";
import {Duration, LoopDuration, Offset} from "../Durations/LoopDuration";

export class LoopGenerator
{
    public loops: Array<Tone.Loop<any>> = [];

    constructor() {
        this.loops = []
    }

   public createLeadLoop(
       sampler: Tone.Sampler| Tone.PolySynth,
       chords: Array<Array<string>>,
   )
   {
       sampler.volume.value = -20;

       if (chords.length === 5) {
           this.createLoopByRhythmPatternNoteArray(
               sampler,
               chords,
               [
                   1,0,0,0,
                   1,0,0,0,
                   1,0,0,0,
                   1,0,1,0
               ],
           )
       }
       if (chords.length === 4) {
           this.createLoopByRhythmPatternNoteArray(
               sampler,
               chords,
               [
                   1,0,0,0,
                   1,0,0,0,
                   1,0,0,0,
                   1,0,0,0
               ],
           )
       }
       if (chords.length === 3) {
           this.createLoopByRhythmPatternNoteArray(
               sampler,
               chords,
               [
                   1,0,0,0,
                   0,0,0,0,
                   1,0,0,0,
                   1,0,0,0
               ],
           )
       }
       if (chords.length === 2) {
           this.createLoopByRhythmPatternNoteArray(
               sampler,
               chords,
               [
                   1,0,0,0,
                   1,0,0,0,
                   1,0,0,0,
                   1,0,0,0
               ],
           )
       }
   }

   public createDrumLoop(
       samplerBit: Tone.Sampler,
       samplerTick: Tone.Sampler,
       samplerSnap: Tone.Sampler
   ){
       this.createLoopByRhythmPattern(samplerBit, Keys.C4, this.generateRandomPattern(4));

       this.createLoopNew(
           samplerTick,
           Keys.C4,
           new LoopDuration().eachEights()
               .setDuration(Duration.sixteenthBars())
               .setOffset(Offset.zero())
       )

       this.createLoopByRhythmPattern(
           samplerSnap,
           Keys.C4,
           this.generateRandomPattern(2)
       )
   }

   public createLoopNew(
       sampler: any,
       notes: string | Array<string>,
       loopDuration: LoopDuration
   )
   {
       let loop = new Tone.Loop(time => {
               sampler.triggerAttackRelease(notes, loopDuration.duration, time);
           },
           loopDuration.interval
       ).start(loopDuration.offset);
       this.loops.push(loop)
   }

   public createLoopByRhythmPattern(
       sampler: any,
       note: string,
       loopPattern: Array<number>
   )
   {
       for (const loopPatternKey in loopPattern) {
           if (loopPattern[loopPatternKey] === 1) {
               this.createLoopNew(
                   sampler,
                   note,
                   new LoopDuration().eachBars()
                       .setDuration(Duration.sixteenthBars())
                       .setOffset(
                           Number(loopPatternKey) === 0
                               ? Offset.zero()
                               : Offset.sixteenthBars(loopPatternKey)
                       )
               )
           }
       }
   }

    public createLoopByRhythmPatternNoteArray(
        sampler: any,
        notes: Array<Array<string>>,
        loopPattern: Array<number>
    )
    {
        let notesIndex = 0;
        for (const loopPatternKey in loopPattern) {
            if (loopPattern[loopPatternKey] === 1){
                this.createLoopNew(
                    sampler,
                    notes[notesIndex],
                    new LoopDuration().eachBars('4')
                        .setDuration(Duration.bars())
                        .setOffset(
                            Number(loopPatternKey) === 0
                                ? Offset.zero()
                                : Offset.quarterBars(loopPatternKey)
                        )
                )
                notesIndex += 1;
                if (notesIndex >= notes.length){
                    notesIndex = 0;
                }
            }
        }
    }

   public createTexturesLoop(
       samplerTextures: Tone.Sampler,
   )
   {
       this.createLoopNew(
           samplerTextures,
           Keys.C4,
           new LoopDuration().eachBars()
               .setDuration(Duration.bars())
               .setOffset(Offset.zero())
       )
   }

   generateRandomPattern(maxBeatsCount: number = 15): number[] {
        const pattern: number[] = [];
        let beatsCount = 0;

        for (let i = 0; i < 16; i++) {
            beatsCount += 1;
            pattern.push(Math.round(Math.random()));
            if (beatsCount >= maxBeatsCount ){
                break;
            }
        }

        return pattern;
    }
}
