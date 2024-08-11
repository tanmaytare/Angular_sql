import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { SqlServiceService } from './Service/sql-service.service';
import { response } from 'express';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  studentInfo:any;
  isEdit:boolean = false;
  stdRoll :string|null = null;
  students:any[]=[];

  constructor(private service :SqlServiceService) {}
  
  studentForm:FormGroup = new FormGroup(
    {
      roll: new FormControl("",[Validators.required]),
      name: new FormControl("",[Validators.required]),
      fees: new FormControl("",[Validators.required]),
      medium: new FormControl("",[Validators.required]),
    }
  );

  OnSubmit()
  {
    this.studentInfo = this.studentForm.value;
    if(this.studentForm.valid)
    {
      if(this.isEdit)
      {
        this.service.update(this.stdRoll,this.studentInfo).subscribe({
          next:(response :any) =>
          {
            console.log(response);
            this.isEdit = false;
            alert("Updated Succesfully!");
            this.studentForm.reset();
            this.getAll();
          },
          error:(error:any) =>
          {
            console.error('Failed to Update student', error);
            alert('Failed to Update student. Please try again later.');
          }
        })
      }
      else
      {
        this.service.addStudent(this.studentInfo).subscribe({
          next:(response : any)=>
          {
            console.log(response);
            alert("Student added Succcesfully");
            this.studentForm.reset();
            this.getAll();
          },
          error:(error : any)=>
          {
            console.error('Failed to Add student', error);
            alert('Failed to Add student. Please try again later.');
          }
        })
      }
    }
  }

  getAll()
  {
    this.service.getStudents().subscribe({
      next: (respone: any) => {
        this.students = respone;
      },
      error: (error:any) => {
        console.error('Failed to fetch students', error);
        alert('Failed to fetch students. Please try again later.');
      }
    });
  }

  updateStudent(student:any)
  {
    this.isEdit = true;
    this.stdRoll = student.roll;
    this.studentForm.patchValue(student);
  }

  deleteStudent(data:any)
  {
    this.service.delete(data).subscribe({
      next:(response:any)=> 
      {
        alert("Deleted succesfully !");
        this.getAll();
      },
      error:(error:any)=>
      {
        console.error('Failed to delete student', error);
          alert('Failed to delete student. Please try again later.');
      }
    })
  }

}
