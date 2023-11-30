import * as Tone from "tone";

export class SampleGenerator
{
   public generate(assets: Array<any>)
   {
       return new Tone.Sampler({
           urls: {
               C3 : this.getRandomValueFromArray(assets)
           },
           release: 1,
       }).toDestination();
   }

   getRandomValueFromArray(array: Array<any>): any {
        const randomIndex = Math.floor(Math.random() * array.length);
        return array[randomIndex];
   }
}
