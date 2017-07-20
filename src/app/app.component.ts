import {Http, Response} from '@angular/http';
import {Injectable, Component,ViewChild } from '@angular/core';
import {GridComponent} from './component/grid.component';
import { DataService } from './component/dataService';

import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Component({
  selector: 'my-app',
  templateUrl: './appview.html',
   providers: [DataService]
})
export class AppComponent  { 
  cities:any[] = [];
  c:any;
  pageSize:number = 10;
  pageIndex:number = 0;
  totalRowsData:number = 0;
  columndata = "City1,City2,City3,City4";
  tmplt = "<button class='btn btn-info btn-xs' onclick='fireEventMy()'>Information</button>"
  constructor(private _data: DataService) {
  }
  ngOnInit() : void { 
      this.fetchRows(this.pageSize, this.pageIndex);
  }
  
  ngAfterViewInit() {
     function fireEventMy(){
      alert("component");
    }
  }
  fetchRows(pageSize:any, pageIndex:any){
    var record = this._data.getRecord(this.pageSize,this.pageIndex);
    this.cities = record.content;
    this.totalRowsData = record.totalRow;
  }
  fetchRow(data:any){
    console.log(data);
   this.pageIndex = parseInt(data.page);
    this.pageSize =  parseInt(data.size);
    this.fetchRows(parseInt(data.size), parseInt(data.page))
  }

  handleDelete(data:any){
    console.log(data);
  }

  
  handleView(data:any){
    console.log(data);
  }
}
