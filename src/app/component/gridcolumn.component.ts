import {Component, Input} from '@angular/core';
import {GridComponent} from './grid.component';
 
@Component({
  selector: 'column',
  template: ``,
 
})
export class GridColumnComponent {
	@Input() value:any;
	@Input() header:any;
  @Input() search=false;
  @Input() allowSorting=false;
  @Input() type:any;
  @Input() width:any;
  @Input() placeholder:any;
  @Input() comboSource: any;
  @Input() template:any = '';
	constructor(table: GridComponent) {
    	   table.addColumn(this)
  	}
}