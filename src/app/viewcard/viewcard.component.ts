import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';

interface CardType {
  _id: string | any;
  firstname: string | any;
  lastname: string | any;
  email: string | any;
  dob: string | any;
  gender: string | any;
  description: string | any;
};

@Component({
  selector: 'app-viewcard',
  standalone: true,
  imports: [],
  templateUrl: './viewcard.component.html',
  styleUrl: './viewcard.component.scss'
})
export class ViewcardComponent {
  constructor(private apiservice : ApiService) {}
   @Input() cardData: CardType | any;
   @Input() index: any;
   @Output() handleDeleteItem = new EventEmitter<number>();
   @Output() setOnEditCard = new EventEmitter<boolean>();
   @Output() handleEditItem = new EventEmitter<CardType>();
    handleDelete(){
      this.apiservice.deleteUser(this.cardData._id).subscribe((res) => {  
        console.log("Successfully Deleted",res);
        this.handleDeleteItem.emit(this.index);
      }
    );
    };
    setEditCard(){
      const data = {
        index: this.index,
        ...this.cardData
      };
      this.handleEditItem.emit(data);
      this.setOnEditCard.emit(true);
    }
   
}
