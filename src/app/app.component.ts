import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AddcardComponent } from './addcard/addcard.component';
import { ViewcardComponent } from './viewcard/viewcard.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    FormsModule,
    AddcardComponent,
    ViewcardComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  onCreate: boolean = false;
  title = 'task2';
  onEdit: boolean = false;
  editObject:any ={
    firstname: '',  
    lastname: '',
    email: '',
    dob: '',
    description: '',
    gender: ''
  };
  cardsData = [
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'jhon@gmail.com',
      dob: '01/01/1990',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gender: 'Male',
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'jhon@gmail.com',
      dob: '01/01/1990',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gender: 'Male',
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'jhon@gmail.com',
      dob: '01/01/1990',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gender: 'Male',
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'jhon@gmail.com',
      dob: '01/01/1990',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gender: 'Male',
    },
    {
      firstname: 'John',
      lastname: 'Doe',
      email: 'jhon@gmail.com',
      dob: '01/01/1990',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      gender: 'Male',
    }
  ];
  setEditObject = (value: any): void => { 
    if(value){
    this.editObject = value;
    }
    else{
      this.editObject = {
        firstname: '',  
        lastname: '',
        email: '',
        dob: '',
        description: '',
        gender:''
      };
    }
    console.log(this.editObject);
  };
  setOnCreate = (value: any): void => {
    if (value) {
      scrollTo(0, 0);
    }
    this.onCreate = value;
  };
  setOnEdit = (value: any): void => {
    if (value) {
      scrollTo(0, 0);
    }
    this.onEdit = value;

  };
  handleDelete(index: number) {
    this.cardsData.splice(index, 1);
  }
}
