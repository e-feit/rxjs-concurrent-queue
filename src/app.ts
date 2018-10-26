import { flatMap } from 'rxjs/operators';
import { range, from } from 'rxjs';

const CONCURRENT = 5;

range(0, 500_000)
    .pipe(flatMap((i: number) => {
        console.log('Starting ' + i);
        return from(createLongRunningJob(i))
    }, CONCURRENT))
    .subscribe(i => {
        console.log('Finished ' + i);
    });

function createLongRunningJob(i: number): Promise<number> {
    // some long-running operation
    return new Promise<number>(resolve => {
        setTimeout(() => {
            resolve(i);
        }, Math.random() * 1000);
    });
}
