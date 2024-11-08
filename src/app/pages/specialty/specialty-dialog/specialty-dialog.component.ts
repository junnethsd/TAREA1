import { Component, Inject, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';
import { Specialty } from '../../../model/specialty';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { SpecialtyService } from '../../../services/specialty.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-specialty-dialog',
  standalone: true,
  imports: [MaterialModule, FormsModule],
  templateUrl: './specialty-dialog.component.html',
  styleUrl: './specialty-dialog.component.css'
})
export class SpecialtyDialogComponent implements OnInit{
  specialty: Specialty;
  //specialties: Specialty[];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: Specialty,
    private _dialogRef: MatDialogRef<SpecialtyDialogComponent>,
    //private medicService: MedicService,
    private specialtyService: SpecialtyService
  ){}

  ngOnInit(): void {
      this.specialty = {... this.data}
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
    if(this.specialty != null && this.specialty.idSpecialty > 0){
      //UPDATE
      this.specialtyService.update(this.specialty.idSpecialty, this.specialty)
        .pipe(switchMap( () => this.specialtyService.findAll()))
        .subscribe(data => {
          this.specialtyService.setSpecialtyChange(data);
          this.specialtyService.setMessageChange('UPDATED!');
        });
    }else{
      //INSERT
      this.specialtyService.save(this.specialty)
      .pipe(switchMap( () => this.specialtyService.findAll()))
      .subscribe(data => {
        this.specialtyService.setSpecialtyChange(data);
        this.specialtyService.setMessageChange('CREATED!');
      });
    }

    this.close();
  }
}
