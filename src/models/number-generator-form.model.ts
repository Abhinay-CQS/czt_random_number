import { FormControl } from '@angular/forms';


export interface GeneratorFormValues {
    favouriteNumber: FormControl<number | null>;
    desiredLength: FormControl<number | null>;
}
