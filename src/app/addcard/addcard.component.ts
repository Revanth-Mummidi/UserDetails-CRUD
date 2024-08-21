import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-addcard',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './addcard.component.html',
  styleUrl: './addcard.component.scss',
})
export class AddcardComponent {
  @Input() cardsData: any[] = [];
  @Input() isEdit: boolean = false;
  @Input() editData: any;
  @Output() setOnCreateModal = new EventEmitter<boolean>();
  @Output() setOnEditModal = new EventEmitter<boolean>();
  CardForm:any = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    dob: new FormControl('', Validators.required),
  });
  ngOnInit(): void {
    if (this.isEdit) {
      let date=new DatePipe('en-US').transform(this.editData.dob, 'yyyy-MM-dd');
      this.CardForm.patchValue({
        email: this.editData.email,
        firstname: this.editData.firstname,
        lastname: this.editData.lastname,
        description: this.editData.description,
        gender: this.editData.gender,
        dob: date,
      });
    }
  }
  setOnCreateAction = (value: any): void => {
    if (!this.CardForm.invalid && value.submit) {
      const data = {
        firstname: this.CardForm.value.firstname,
        lastname: this.CardForm.value.lastname,
        email: this.CardForm.value.email,
        dob: this.CardForm.value.dob,
        description: this.CardForm.value.description,
        gender: this.CardForm.value.gender,
      };
      console.log('cardsData', this.cardsData);
      if (this.isEdit) {
        this.cardsData[this.editData.index] = data;
        console.log('cardsData in edit', this.cardsData);
        this.setOnEditModal.emit(value.modal);
      } else{
        this.cardsData.push(data);
         this.setOnCreateModal.emit(value.modal);
        }
    } else {
      if (!value.submit) {
        if (this.isEdit) {
          this.setOnEditModal.emit(value.modal);
        } else this.setOnCreateModal.emit(value.modal);
      } else alert('Please fill all the fields');
    }
  };
  
}
