# ReactForm 表單

### 常用的 Directives

- FormControlName
- FormGroupName
- FormArrayName

建立一個FormArray

```ts
export class ReactFormComponent {
  form;

  constructor(private fb: FormBuilder) { 
    this.form = this.fb.array([
      this.buildGroup();
    ]);
  }

  buildGroup(): FormGroup {
    return this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(5)]],
      nackName: 'ABC',
      interest: this.fb.group({
        movie: '',
        music: '',
        sports: '',
        games: ''
      })
    });
  }

  add() {
    this.form.push(this.buildGroup());
  }
}
```

html 如何綁定該 formGroup

```html
  <form [formGroup]="form">
    <!-- form.controls 就是建立 formBuilder 裡面的 formControl -->
    <div class="profile" *ngFor="let profile of form.controls; let i = index" [formGroupName]="i">

      <div class="form-group">
        <label>請輸入姓名</label>
        <input type="text" class="form-control" formControlName="firstName" placeholder="請輸入姓名">
        <!-- 欄位 errorMsg -->
        <div *ngIf="profile.controls.firstName.errors">
          <span *ngIf="profile.controls.firstName.errors.reqiured">必填項目</span>
          <span *ngIf="profile.controls.firstName.errors.minlength">欄位長度不足</span>
        </div>
      </div>

      <div class="form-group">
        <label>請輸入綽號</label>
        <input type="text" class="form-control" formControlName="nackName" placeholder="請輸入綽號">
      </div>
  
      <h3>請輸入興趣</h3>
      <div class="form-group" formControlName="interest">
        <label>
          <input type="checkbox" formControlName="movie">電影
        </label>
        <label>
          <input type="checkbox" formControlName="music">音樂
        </label>
        <label>
          <input type="checkbox" formControlName="sports">運動
        </label>
        <label>
          <input type="checkbox" formControlName="games">遊戲
        </label>
      </div>
    </div>
  </form>
```
