import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AddcardComponent } from './addcard/addcard.component';
import { ViewcardComponent } from './viewcard/viewcard.component';
import { ApiService } from './services/api.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InfiniteScrollDirective } from './infiniteScrollWrapper/infinitescrollwrapper.component';
import { error } from 'console';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    InfiniteScrollDirective,
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
  editObject: any = {
    firstname: '',
    lastname: '',
    email: '',
    dob: '',
    description: '',
    gender: '',
  };
  cardsData = [];
  page = 1;
  limit = 5;
  isLoading=false;
  isEnd=false;
  filename='';
  errorMails=[];
  file:File | any;
  constructor(private apiService: ApiService) {}
  ngOnInit(): void {
    this.getPaginatedUsers();
  }
  getPaginatedUsers() {
    const data = {
      pageNumber: this.page,
      pageSize: this.limit,
    };
    this.apiService.getSplitUsers(data).subscribe({
      next: (res: any) => {
        console.log('PAGINATION', res);
        res.data.forEach((element: never) => {
          this.cardsData.push(element);
        });
        this.page = this.page + 1;
      },
      error: (err: any) => {
       this.isEnd=true;
        console.log('error', err);
      },
    });
  }
  setEditObject = (value: any): void => {
    if (value) {
      this.editObject = value;
    } else {
      this.editObject = {
        firstname: '',
        lastname: '',
        email: '',
        dob: '',
        description: '',
        gender: '',
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

  onScrollDown() {
    this.isLoading=true;
    this.getPaginatedUsers();
    console.log('scrolled down!!');
    this.isLoading=false;
  }
  
  onFileChange(event: any) {  
    const file = event.target.files[0]; 
    if(file)
      {
        this.filename=file.name;
        console.log("File",this.filename);
        this.file=file;
      } 
      console.log(file);  
    }
    
    onUpload(){ 
      
      this.apiService.uploadFile(this.file).subscribe((res) => {
        console.log("File Uploaded",res); 
        alert("File Uploaded Successfully!");
      },
      error=>{
        if(error.status==400)
        {
          this.errorMails=error.error.data;
          this.showDuplicateEmailsAlert();
        }
      
        console.log("Error in uploading file",error); 
      } 
      );
      this.filename='';
    }
     showDuplicateEmailsAlert() {
      let duplicateEmails=this.errorMails;
      if (duplicateEmails.length > 0) {
        // Join the emails into a single string, separated by newlines
        const emailList = duplicateEmails.join('\n');
        // Show an alert with the duplicate emails
        alert(`The following emails are duplicated:\n\n${emailList}`);
      } else {
        alert("No duplicate emails found.");
      }
    }
  }
  