import {Http, Response} from '@angular/http';
import {Subject}    from 'rxjs/Subject';
import {Observable}     from 'rxjs/Observable';
import {Injectable, Component, Input, Pipe, OnChanges, Output,EventEmitter } from '@angular/core';
import {GridColumnComponent} from './gridcolumn.component';
declare var $: any;

@Component({
  selector: 'grid',
  templateUrl: './grid.html',
  styleUrls: ['./grid.css']

})
export class GridComponent implements OnChanges{ 
   pages : any = [];//Dummy array to load the pagination
   data : any = [];//Main data container
   width:string;
   Math: any;
  @Input() dataset:any[] = [];
  @Input() enableFilter = false;
  @Input() enableDateRangeFilter = false;
  @Input() dateFormat = "YYYY/MM/DD";
  @Input() currentSortField:any;
  @Input() currentSortDirection:number = 1;
  @Input() enableColumnFilter = false;
  @Input() allowDelete = false;
  @Input() allowFooter = false;
  @Input() allowView = false;
  @Input() deleteIcon:any = "fa-trash";
  @Input() viewIcon:any = "fa-eye";
  @Input() styleClass:any = "table table-striped table-bordered table-hover table-condensed";
  @Input() allowPagination = true;
  @Input() pageGap = 5;
  @Input() pageSize:any = 10;
  @Input() totalRows: number = 0;//To control the start page index
  @Input() pageIndex : number = 0;//To control the start page index
  public pageIndexChanged$ = new Subject<any>();//Subscribe to this to handle "page index change" event
  public pageSizeChanged$ = new Subject<any>();//Subscribe to this to handle "page size change" event

  @Output() notifyDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() notifyView: EventEmitter<any> = new EventEmitter<any>();
  @Output() notify: EventEmitter<any> = new EventEmitter<any>();

  startDate:Date;
  endDate:Date;
  query = "";
  daterange = "";
  filteredList :any[] = [];
  columns: GridColumnComponent[] = [];
  searchflag = false;
  filterColumnData : any[] = [];
  eventOutput = {
         page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
       }

  ngOnChanges(changes:any) {
      this.range(this.Math.round(this.totalRows/this.pageSize), this.pageIndex, this.pageIndex + this.pageGap);
  }
  fireEvent(start:any, end:any, label:any){
    this.startDate = start;
    this.endDate = start;
     this.notify.next({
          page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
       });
  }
ngAfterViewInit() {  
    var self = this;
    $(".datepicker").datepicker({ dateFormat: self.dateFormat.toLowerCase,
     onSelect: function() {
       var flag = true;
       for(var i=0; i < self.filterColumnData.length; i++){
        if(self.filterColumnData[i].column == $(this).attr('id')){
          self.filterColumnData[i].value = $(this).val()
          flag = false;
        }
       }
       if(flag == true){
        self.filterColumnData.push({
          "column": $(this).attr('id'),
          "value": new Date($(this).val()).getTime(),
          "type":"date"
        })
       }

       self.notify.next({
          page:self.pageIndex,
         size:self.pageSize,
         dateRange:{
            endDate:self.endDate,
            startDate:self.startDate,
         },
         keyword:self.query,
         columnFilter:self.filterColumnData
       });
    }})
    ;
    $('input[name="daterange"]').daterangepicker(
    {
        locale: {
          format: self.dateFormat
        },
        startDate: new Date(),
        endDate:  new Date()
    }, 
    function(start:any, end:any, label:any) {
       self.fireEvent(new Date(start).getTime(), new Date(end).getTime(), label)
    })


    $(".dropdown dt a").on('click', function() {
      $(".dropdown dd ul").slideToggle('fast');
    });

    $(".dropdown dd ul li a").on('click', function() {
      $(".dropdown dd ul").hide();
    });

    $(document).bind('click', function(e:any) {
      var $clicked = $(e.target);
      if (!$clicked.parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
    });

  }
fireEventMy(){
  alert();
}
setHtml(html:any, id:any){
  $("#template"+id).html(html);
}

  checkboxFire(field:any){
     var checkboxval: any[] = [];
      $('.mutliSelect input[type="checkbox"]:checked').each(function(){
          checkboxval.push($(this).val());
      });
      console.log(checkboxval.join(","));
        $(".multiSel").html(checkboxval.join(", "));
      if($(".multiSel").html() == ""){
        $(".hida").show();
      }else{
        $(".hida").hide();
      }
      var flag = true;
       for(var i=0; i < this.filterColumnData.length; i++){
        if(this.filterColumnData[i].column == field){
          this.filterColumnData[i].value = checkboxval
          flag = false;
        }
       }
       if(flag == true){
        this.filterColumnData.push({
          "column": field,
          "value": checkboxval,
          "type":"combo"
        })
       }

       this.notify.next({
          page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
       });
  }
  
  addColumn(column:any){
    this.columns.push(column);
  }

  viewRecord(row:any){
    this.notifyView.emit(row);
  }

  deleteRecord(row:any){
    this.notifyDelete.emit(row);
  }


  range(size:any, start:any, end:any){
        var ret = [];   
        //debugger;     
        if (size < end) {
            end = size;
            start = size-this.pageGap;
        }
        for (var i = start; i <= end; i++) {
            ret.push(i);
        }        
        return ret;
  }

  prevPage(){
     if(this.pageIndex > 0){
       this.pageIndex = this.pageIndex - 1;
       this.notify.next({
         page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
       });
     }
  }

  nextPage(){
     if(this.pageIndex < (this.totalRows / this.pageSize) - 1){
       this.pageIndex = this.pageIndex + 1;
       this.notify.next({
         page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
       });
     }
  }

  getData(){
    if(this.query != ""){
      return this.filteredList;
    }else if(this.searchflag == true){
        return this.filteredList;
    }else{
      return this.dataset;  
    }
  }
   constructor() {
     this.Math = Math;
    this.dataset.sort((a:any, b:any) => {
        return 1;
    });
  }

  onPageIndexChange(index:number)
  {
    this.pageIndex = index-1;
    this.data = [];
    this.pageIndexChanged$.next(index-1);
    this.notify.next({
       page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
    });
  }

  changePageSize(){
    this.notify.next({
       page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
    });
  }

  ngOnInit(){
  }
  
  onSort(field:any, direction:any){
      this.currentSortField = field;
      this.currentSortDirection = direction;
  }

  filterColumn(value:String, field:any){
     /* if(value == ""){
          this.searchflag = false;
      }else{
            this.filteredList = this.dataset.filter(function(el:any){
            var result="";
            result = ""+el[field];
            console.log(result);
            return result.toLowerCase().indexOf(value.toLowerCase()) > -1;
            }.bind(this));
            this.searchflag = true;
    }
    console.log(this.filteredList);*/

      var flag = true;
       for(var i=0; i < this.filterColumnData.length; i++){
        if(this.filterColumnData[i].column == field){
          this.filterColumnData[i].value = $(this).val()
          flag = false;
        }
       }
       if(flag == true){
        this.filterColumnData.push({
          "column": field,
          "value": value,
          "type":"text"
        })
       }

       this.notify.next({
          page:this.pageIndex,
         size:this.pageSize,
         dateRange:{
            endDate:this.endDate,
            startDate:this.startDate,
         },
         keyword:this.query,
         columnFilter:this.filterColumnData
       });

  }

 
  filter(){
   /* this.filteredList = this.dataset.filter(function(el:any){
      var result="";
        for(var key in el){
          result+= el[key];
        }
        return result.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    }.bind(this));*/
  }
}