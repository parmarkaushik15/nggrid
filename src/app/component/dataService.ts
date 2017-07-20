import { Injectable } from '@angular/core'; 
import { Http , Response, Headers } from '@angular/http'; 
import { Observable } from 'rxjs/Observable'; 
import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/do'; 

@Injectable() 
export class DataService { 
   constructor(private _http: Http){} 
   i:number = 0;
   getRecord(pagesize:any, pageIndex:any){ 
        var data = [];
        for(this.i=0;this.i<pagesize;this.i++){
            var index = 0;
            if(pageIndex == 0){
                index = this.i + 1 ;
            }else{
                index = (pagesize * pageIndex) + (this.i + 1) ;
            }
            data.push({ "id": index,
                "city":"City - "+ index,
                "country":"Country - "+ index
            })
        }
        return {
                "totalRow":30,
                "content":data
            };
   } 
   private handleError(error: Response) { 
      console.error(error); 
      return Observable.throw(error.json().error()); 
   } 
} 