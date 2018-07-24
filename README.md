# angular 使用mob-date-picker教程
## 1. 安装

```
npm i mob-date-selector --save-dev
```

## 2. 引入css

> angular.json
>

```json
"styles": [
	"node_modules/ng-zorro-antd/src/ng-zorro-antd.css",
	"node_modules/mob-date-selector/index.css",
	"src/styles.scss"
],
```

## 3. html

> test.component.html

```html
<form nz-form [formGroup]="timeForm" nzLayout="horizontal">
    <nz-form-item>
        <nz-form-control>
            <input id="stime-picker" nz-input placeholder="开始时间" formControlName="stime" />
        </nz-form-control>
    </nz-form-item>
    <nz-form-item>
        <nz-form-control>
            <input id="etime-picker" nz-input placeholder="结束时间" formControlName="etime" />
        </nz-form-control>
    </nz-form-item>
</form>
<!-- 多个input需要对应多个Container -->
<div id="sdate-picker"></div>
<div id="edate-picker"></div>
```

## 4. ts

> test.component.ts

```js
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import DateSelector from 'mob-date-selector';
import * as dateFns from 'date-fns';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {

  timeForm: FormGroup; // 定义表单

  ngOnInit() {
    // 定义formControl
    /*
       使用插件时，input绑定了touchstart事件，
       然而点击时有可能会使input聚焦，因此禁用input
    */
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
    const timeString = dateFns.format(
      new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4]),
      'YYYY-MM-DD HH:mm:ss'
    );
    return timeString;
  }
}
```

> 基本完成

![mdp](https://github.com/ZhongMingKun/mob-date-selector-test/blob/master/mdp.jpg)

颜色不太好看？改一下咯

而且input设置了disabled后样式与正常的不一样，会让人感觉点不了的，改回来

![input](https://github.com/ZhongMingKun/mob-date-selector-test/blob/master/input.jpg)

## 5. css(scss)

```scss
// 使用 ::ng-deep 即可选中组件内元素
::ng-deep .ant-input-disabled { // ng-zorro ui框架自带的样式，改一下
    background-color: #fff;
    color:rgba(0, 0, 0, 0.65);
    cursor: pointer;
}

::ng-deep .date-selector-btn-box {
    .date-selector-tab {
        color: #1890ff;
    }
    .date-selector-tab-active {
        background-color: #4FC3F7;
        color: #fff;
    }
    background-color: #1890ff;
}
```

## demo

https://github.com/ZhongMingKun/mob-date-selector-test