import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import {
  DateAdapter,
  MatDateFormats,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './example-header.component.html',
  styleUrls: ['./example-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleHeaderComponent<D> implements OnDestroy {
  private readonly destroy$ = new Subject<void>();

  constructor(
    private calendar: MatCalendar<D>, // calendar instance of picker
    private dateAdapter: DateAdapter<D>, // native or moment date adapter
    @Inject(MAT_DATE_FORMATS) private dateFormats: MatDateFormats, // for formatting
    cdr: ChangeDetectorRef
  ) {
    // make sure your header stays in sync with the calendar:
    calendar.stateChanges
      .pipe(takeUntil(this.destroy$)) // unsubscribe when destroyed
      .subscribe(() => cdr.markForCheck());
  }

  // active date label rendered between the arrow buttons
  get periodLabel(): string {
    // use date adapter to format the label, e.g. "SEP 2020"
    return this.dateAdapter
      .format(this.calendar.activeDate, this.dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  // called when user clicks on one of the left buttons
  previousClicked(mode: 'month' | 'year'): void {
    this.changeDate(mode, -1);
  }

  // called when user clicks on one of the right buttons
  nextClicked(mode: 'month' | 'year'): void {
    this.changeDate(mode, 1);
  }

  private changeDate(mode: 'month' | 'year', amount: -1 | 1): void {
    // increment or decrement month or year
    this.calendar.activeDate =
      mode === 'month'
        ? this.dateAdapter.addCalendarMonths(this.calendar.activeDate, amount)
        : this.dateAdapter.addCalendarYears(this.calendar.activeDate, amount);
  }

  ngOnDestroy(): void {
    this.destroy$.next(); // will trigger unsubscription in takeUntil
  }
}
