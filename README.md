NG Grid

npm install

npm install typings --global

typings install dt~jquery --global --save

<grid [dataset]=cities 
    [enableFilter]=true 
    [enableDateRangeFilter] = true
    [dateFormat]="mm/dd/yyyy"
    [enableColumnFilter]=true  
    [currentSortField]="'city'" 
    [currentSortDirection]=1
    [allowDelete]=true
    [allowView]=true
    [allowFooter]=true
    [deleteIcon]="'fa-trash'"
    [allowPagination]=true 
    [pageSize]=pageSize
    [totalRows]=totalRowsData
    [pageGap]=10
    [styleClass]="'table table-striped table-bordered table-hover table-condensed'"
    (notifyDelete)="handleDelete($event)"
    (notifyView)="handleView($event)"
    (notify)="fetchRow($event)"
    >
        <column [width]="'10%'" [value]="'id'" [header]="'Id'" [type]="'text'" [search]=true [allowSorting]=true [placeholder]="'Id'"></column>
        <column [width]="'30%'" [value]="'city'" [header]="'Name'" [type]="'combo'" [search]=true [allowSorting]=true [placeholder]="'Select'" [comboSource]=columndata></column>
        <column [width]="'20%'" [value]="'country'" [header]="'Country'" [type]="'date'" [search]=true [allowSorting]=true [placeholder]="'dd/mm/yyyy'"></column>
        <column [width]="'20%'" [value]="'date'" [header]="'Independent'" [type]="'date'" [search]=true [allowSorting]=true [placeholder]="'dd/mm/yyyy'" [template]=tmplt></column>
    </grid>
    
