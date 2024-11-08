import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';
import { Specialty } from '../../model/specialty';

import { SpecialtyService } from '../../services/specialty.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { SpecialtyDialogComponent } from './specialty-dialog/specialty-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpecialtyDeleteDialogComponent } from './specialty-delete-dialog/specialty-delete-dialog.component';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './specialty.component.html',
  styleUrl: './specialty.component.css'
})
export class SpecialtyComponent implements OnInit{
  dataSource: MatTableDataSource<Specialty>;

  columnsDefinitions = [
    { def: 'idSpecialty', label: 'idSpecialty', hide: true},
    { def: 'nameSpecialty', label: 'nameSpecialty', hide: false},
    { def: 'descriptionSpecialty', label: 'descriptionSpecialty', hide: false},    
    { def: 'actions', label: 'actions', hide: false}
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private specialtyService: SpecialtyService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.specialtyService.findAll().subscribe(data => this.createTable(data));

    this.specialtyService.getSpecialtyChange().subscribe(data => this.createTable(data));
    this.specialtyService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));
  }

  createTable(data: Specialty[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getDisplayedColumns(){
    return this.columnsDefinitions.filter(cd => !cd.hide).map(cd => cd.def);
  }

  applyFilter(e: any){
    this.dataSource.filter = e.target.value.trim();    
  }

  openDialog(medic?: Specialty){
    this._dialog.open(SpecialtyDialogComponent, {
      width: '750px',
      data: medic
    });
  }

  delete(id: number){
    const dialogRef = this._dialog.open(SpecialtyDeleteDialogComponent, {
      width: '200px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Solo procede si result es true (el usuario confirmó)
        this.specialtyService.delete(id)
          .pipe(switchMap(() => this.specialtyService.findAll()))
          .subscribe(data => {
            this.specialtyService.setSpecialtyChange(data);
            this.specialtyService.setMessageChange('DELETED!');
          });
      }
    });
  }
}
