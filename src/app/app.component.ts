import { Component } from '@angular/core';
import { NumberGeneratorForm } from '@components/number-generator-form/number-generator-form.component';
import { AppBarComponent } from "../components/app-bar/app-bar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NumberGeneratorForm, AppBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'czt-num';
}
