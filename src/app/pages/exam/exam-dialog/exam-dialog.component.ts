import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Exam } from '../../../model/exam';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { ExamService } from '../../../services/exam.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-exam-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './exam-dialog.component.html',
  styleUrl: './exam-dialog.component.css'
})
export class ExamDialogComponent implements OnInit{
  exam: Exam;
  //specialties: Specialty[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Exam,
    private _dialogRef: MatDialogRef<ExamDialogComponent>,
    //private medicService: MedicService,
    private examService: ExamService
  ){}

  ngOnInit(): void {
      this.exam = {... this.data}
      //this.medic = this.data;
      /*this.medic = new Medic();
      this.medic.idMedic = this.data.idMedic;
      this.medic.cmpMedic = this.data.cmpMedic;
      this.medic.primaryName = this.data.primaryName;
      this.medic.surname = this.data.surname;
      this.medic.photo = this.data.photo;
      this.medic.idSpecialty = this.data.idSpecialty;*/

      // this.specialtyService.findAll().subscribe(
      //   data => this.specialty = data
      // );
  }

  close(){
    this._dialogRef.close();
  }

  operate(){
    if(this.exam != null && this.exam.idExam > 0){
      //UPDATE
      this.examService.update(this.exam.idExam, this.exam)
        .pipe(switchMap( () => this.examService.findAll()))
        .subscribe(data => {
          this.examService.setExamChange(data);
          this.examService.setMessageChange('UPDATED!');
        });
    }else{
      //INSERT
      this.examService.save(this.exam)
      .pipe(switchMap( () => this.examService.findAll()))
      .subscribe(data => {
        this.examService.setExamChange(data);
        this.examService.setMessageChange('CREATED!');
      });
    }

    this.close();
  }
}
