import * as Tone from "tone";
import {MusicPlayer} from "../MusicPlayer";
import {Keys} from "../../types/instrument";

export class LoopDuration
{
    public duration: string = `1:0:0`;
    public interval: string = `1:0:0`;
    public offset: string = `0:0:0`

   /*
   each quarter-bar
   1000100010001000 => 0:1:0
    */

    /*
    * |1000|0000|0000|0000| => 1:0:0
    */
    eachBars(count: string = `1`): LoopDuration
    {
        this.interval = `${count}:0:0`;
        return this;
    }

    /*
    * |1000|0000|1000|0000| => 0:2:0
    */
    eachHalf(): LoopDuration
    {
        this.interval = `0:2:0`;
        return this;
    }

    /*
    * |1000|1000|1000|1000| => 0:1:0
    */
    eachQuarters(count: string = `1`): LoopDuration
    {
        this.interval = `0:${count}:0`;
        return this;
    }

    /*
    * |1010|1010|1010|1010| => 0:0:2
    */
    eachEights(): LoopDuration
    {
        this.interval = `0:0:2`;
        return this;
    }

    /*
    * |1111|1111|1111|1111| => 0:0:1
    */
    eachSixteenth(): LoopDuration
    {
        this.interval = `0:0:1`;
        return this;
    }


    setOffset(offset: Offset){
        this.offset = offset.value;
        return this;
    }

    setDuration(duration: Duration){
        this.duration = duration.value;
        return this;
    }
}

export class Offset
{
    constructor(public value: string) {
    }

    /*
    * |1000|0000|0000|0000| => 0:0:0
    */
    static zero() {
        return new Offset(`0:0:0`)
    }

    /*
    * |0000|0000|0000|0000|1... => 1:0:0
    */
    static bars(count: string = `1`) {
        return new Offset(`${count}:0:0`)
    }

    /*
    * |0000|0000|1000|0000| => 0:2:0
    */
    static halfBars() {
        return new Offset(`0:2:0`)
    }

    /*
    * |0000|1000|0000|0000| => 0:1:0
    */
    static quarterBars(count: string = `1`) {
        return new Offset(`0:${count}:0`)
    }

    /*
    * |0010|0000|0000|0000| => 0:0:2
    */
    static eightBar() {
        return new Offset(`0:0:2`)
    }

    /*
    * |0100|0000|0000|0000| => 0:0:1
    */
    static sixteenthBars(count: string = `1`) {
        return new Offset(`0:0:${count}`)
    }
}

export class Duration{
    constructor(public value: string) {
    }

    /*
    * |1111|1111|1111|1111| => 1:0:0
    */
    static bars(count: string = `1`) {
        return new Duration(`1:0:0`)
    }

    /*
    * |1111|1111|0000|0000| => 0:2:0
    */
    static halfBars() {
        return new Duration(`0:2:0`)
    }

    /*
    * |1111|0000|0000|0000| => 0:1:0
    */
    static quarterBars(count: string = `1`) {
        if (Number(count) > 4) {
            count = '4';
        }
        return new Duration(`0:${count}:0`)
    }

    /*
    * |1100|0000|0000|0000| => 0:0:2
    */
    static eightBars() {
        return new Duration(`0:0:2`)
    }

    /*
    * |1000|0000|0000|0000| => 0:0:1
    */
    static sixteenthBars(count: string = `1`) {
        if (Number(count) > 16) {
            count = '16';
        }
        return new Duration(`0:0:${count}`)
    }
}

