import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableConfig } from 'src/app/model/table-config';

@Component({
  selector: 'app-table-template',
  templateUrl: './table-template.component.html',
  styleUrls: ['./table-template.component.css']
})
export class TableTemplateComponent implements OnInit {

  @Input() tableConfig: TableConfig = {} as TableConfig;
  @Input() data: any = [];
  @Input() isPaging:boolean = false;

  
  @Output() clickRow = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  }

  clickRowItem(item:any){
    this.clickRow.emit(item);
  }

}
