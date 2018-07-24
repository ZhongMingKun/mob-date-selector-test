import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import DateSelector from 'mob-date-selector';
import * as dateFns from 'date-fns';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {

  public timeForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.timeForm = this.fb.group({
      stime: [{ value: '', disabled: true }],
      etime: [{ value: '', disabled: true }]
    });
  }

  ngAfterViewInit() {
    this.createPicker();
  }

  createPicker() {
    const stimePicker = new DateSelector({
      input: 'stime-picker',
      container: 'sdate-picker',
      type: 1,
      param: [1, 1, 1, 1, 1],
      beginTime: [],
      endTime: [],
      recentTime: [],
      success: (arr1) => {
        this.getTimeString(arr1);
        const res = this.getTimeString(arr1);
        this.timeForm.get('stime').setValue(res);
      }
    });
    const etimePicker = new DateSelector({
      input: 'etime-picker',
      container: 'edate-picker',
      type: 1,
      param: [1, 1, 1, 1, 1],
      beginTime: [],
      endTime: [],
      recentTime: [],
      success: (arr1) => {
        const res = this.getTimeString(arr1);
        this.timeForm.get('etime').setValue(res);
      }
    });
  }

  getTimeString(arr): string {
    const newTimeArr = arr.concat();
    newTimeArr.splice(1, 1, newTimeArr[1] - 1);
    const timeString = dateFns.format(
      new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]),
      'YYYY-MM-DD HH:mm:ss'
    );
    return timeString;
  }
}
