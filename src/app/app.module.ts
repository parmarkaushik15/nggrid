import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { HttpModule }      from '@angular/http';
import { FormsModule } from '@angular/forms';
import {GridComponent} from './component/grid.component';
import {GridColumnComponent} from './component/gridcolumn.component';
import { OrderrByPipe } from './component/orderby.pipe';

@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule ],
  declarations: [ AppComponent,GridComponent,GridColumnComponent,OrderrByPipe ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
