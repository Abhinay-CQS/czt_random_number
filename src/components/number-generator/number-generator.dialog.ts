import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
// Created Shortcut path, so that if models are moved, still imports will work
import { GeneratorValues } from '@models/number-generator.model';
import { interval, Subscription } from 'rxjs';

@Component({
    selector: 'czt-num-generator',
    templateUrl: 'number-generator.dialog.html',
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
})
export class NumberGenerator implements OnInit, AfterViewInit {
    _genValues!: GeneratorValues;
    generatedNumber: string = '';
    counterValue: string = "0";
    private intervalSub: Subscription | null = null;

    constructor(
        public dialogRef: MatDialogRef<NumberGenerator>,
        @Inject(MAT_DIALOG_DATA) public data: GeneratorValues) {
        if (this.data) {
            this._genValues = this.data;
        }
    }
    ngOnInit(): void {
        // once component is initiated we will just generate number.
        this.generatedNumber = this.generateValues();
    }
    generateValues(str = ''): string {
        while (str.length < this._genValues.desiredLength - 1) {
            return this.generateValues(str += String(Math.floor(Math.random() * 10)));
        }
        return str + this._genValues.favouriteNumber;
    }

    ngAfterViewInit() {
        // once view is initiated, 
        // we will take 100ms, then start counter like effect
        setTimeout(() => {
            this.startCounter();
        }, 100);
    }
    // Here we will create a counter like effect
    startCounter(): void {
        if (this._genValues.desiredLength < 2) {
            this.counterValue = String(this._genValues.favouriteNumber);
            return;
        }
        const targetNumber = this.generatedNumber;
        const updateInterval = 10; // for every 10 milli seconds
        const duration = 2000; // up to 2 seconds
        const totalSteps = duration / updateInterval;
        let currentCount = "0".padStart(targetNumber.length, "0"); // Start at zero, padded to match the length
        let step = 0;

        this.intervalSub = interval(updateInterval).subscribe(() => {
            if (step < totalSteps) {
                currentCount = this.incrementString(targetNumber, step / totalSteps);
                this.counterValue = currentCount;
                step++;
            } else {
                // once loop is completed, target may not get reached, so we directyl assign target
                this.counterValue = targetNumber;
                // once target is reached, we can unsubscribe the interval,
                this.intervalSub?.unsubscribe();
            }
        });
    }

    incrementString(targetString: string, increasePercentage: number): string {
        const targetBigNumberValue = BigInt(targetString);
        const increment = BigInt(Math.floor(Number(targetBigNumberValue) * increasePercentage));
        const incrementedBigInt = increment;
        const incrementedString = incrementedBigInt.toString();
        return incrementedString.padStart(targetString.length, "0");
    }

    ngOnDestroy(): void {
        if (this.intervalSub) {
            this.intervalSub.unsubscribe();
        }
    }
}
