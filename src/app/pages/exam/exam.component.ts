import { Component, OnInit, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material/material.module';
import { MatTableDataSource } from '@angular/material/table';

import { ExamService } from '../../services/exam.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ExamDialogComponent } from './exam-dialog/exam-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamDeleteDialogComponent } from './exam-delete-dialog/exam-delete-dialog.component';
import { switchMap } from 'rxjs';
import { Exam } from '../../model/exam';

@Component({
  selector: 'app-exam',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.css'
})
export class ExamComponent implements OnInit{
  dataSource: MatTableDataSource<Exam>;

  columnsDefinitions = [
    { def: 'idExam', label: 'idExam', hide: true},
    { def: 'nameExam', label: 'nameExam', hide: false},
    { def: 'descriptionExam', label: 'descriptionExam', hide: false},    
    { def: 'actions', label: 'actions', hide: false}
  ];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private examService: ExamService,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ){}

  ngOnInit(): void {
    this.examService.findAll().subscribe(data => this.createTable(data));

    this.examService.getExamChange().subscribe(data => this.createTable(data));
    this.examService.getMessageChange().subscribe(data => this._snackBar.open(data, 'INFO', {duration: 2000}));
  }

  createTable(data: Exam[]){
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

  openDialog(exam?: Exam){
    this._dialog.open(ExamDialogComponent, {
      width: '750px',
      data: exam
    });
  }

  delete(id: number){
    const dialogRef = this._dialog.open(ExamDeleteDialogComponent, {
      width: '200px',
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) { // Solo procede si result es true (el usuario confirmó)
        this.examService.delete(id)
          .pipe(switchMap(() => this.examService.findAll()))
          .subscribe(data => {
            this.examService.setExamChange(data);
            this.examService.setMessageChange('DELETED!');
          });
      }
    });
  }
}
