import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ExampleHeaderComponent } from './example-header/example-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  customHeader = ExampleHeaderComponent;

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
}
