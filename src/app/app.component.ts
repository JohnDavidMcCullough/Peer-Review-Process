import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface IDealer {
  dealerCodeID: Int16Array,
  dealerCode: string,
  assignedByUser: string,
  assignedDAte: Date,
  chosenMarket: string;



}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private http: HttpClient) {

  }

  title = 'FinalCSProjectAngular';
  dealerCode = "";
  userName = "";
  displayName = "";
  assignedByUser = "";
  dateAssigned: Date = new Date();
  assignedFrom = "Dealer Code Manager";
  chosenMarket = "";

  popUp: boolean = false;
  submit() {
    if (this.assignedByUser == "" || this.userName == "" || this.displayName == "") {
      this.popUp = !this.popUp;
     
    }
   
   else {
    console.log(this.chosenMarket);
    console.log(this.dealerCode);
    console.log(this.userName);
    console.log(this.displayName);
    console.log(this.assignedByUser)
    console.log(this.assignedFrom);
    console.log(this.dateAssigned);
    const model = {
      "market": this.chosenMarket,
      "assignDate": this.dateAssigned,
      "assignedFrom": this.assignedFrom,
      "assignUser": this.assignedByUser,
      "userName": this.userName,
      "displayName": this.displayName
    };
      this.http.post("https://localhost:7105/Database", model).subscribe(
        {
          next: (data) => {



          }
        }
      )
    }
  }
  marketSelect: boolean = false;

  showRestAll(): void {
    this.showRest1();
    this.showRest();
  }

  showRest1(): void {
    this.marketSelect = !this.marketSelect;
  }
  showRest(): void {
    console.log(this.chosenMarket)
    
    this.http.get("https://localhost:7105/Database?market=" + this.chosenMarket).subscribe(
      {
        next: (data) => {
          let dealer = data as IDealer
          console.log(dealer.dealerCode);
          this.dealerCode = dealer.dealerCode;


        }
      }
    )
  }
  
}






