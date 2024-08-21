import { Component, EventEmitter, Input, Output } from '@angular/core';

interface CardType {
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
   @Input() cardData: CardType | any;
   @Input() index: any;
   @Output() handleDeleteItem = new EventEmitter<number>();
   @Output() setOnEditCard = new EventEmitter<boolean>();
   @Output() handleEditItem = new EventEmitter<CardType>();
    handleDelete(){
      this.handleDeleteItem.emit(this.index);
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
