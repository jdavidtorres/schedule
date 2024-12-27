import { ConfirmationService, MessageService } from 'primeng/api';

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Event } from './models/Event';
import { Instructor } from './models/Instructor';
import { EventService } from './services/event.service';
import { InstructorService } from './services/instructor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Schedule';

  instructors: Instructor[];
  instructor: Instructor;
  newInstructor: Instructor = {
    id: null,
    name: null,
    surname: null,
    birthday: null,
    events: null
  };

  overall: number;

  events: Event[];
  event: Event = {
    id: null,
    title: null,
    description: null,
    start: null,
    end: null
  };
  eventItem: Event;

  options: any;

  eventDialogTable: boolean = false;
  submitted: boolean = true;

  maxDate: Date;

  constructor(private instructorService: InstructorService, private eventServices: EventService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.eventServices.findAll().subscribe(events => {
      this.events = events;
    });

    this.instructorService.findAll().subscribe(instructors => {
      this.instructors = instructors;
    });
    this.maxDate = new Date();
  }

  assignEvent(fomAssign: NgForm) {
    this.instructorService.assignEventToInstructor(this.event, this.instructor.id).subscribe(
      (result: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Event created' });
        fomAssign.reset();
      },
      error => {
        console.error("Something went wrong");
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
      });
  }

  getOverall(idInstructor: string) {
    this.instructorService.getOverall(idInstructor).subscribe(result => {
      this.overall = result;
    });
  }

  editEvent(eventEdit: Event) {
    this.eventItem = {
      id: eventEdit.id,
      title: eventEdit.title,
      description: eventEdit.description,
      start: eventEdit.start,
      end: eventEdit.end
    };
    this.eventDialogTable = true;
  }

  saveUpdated(eventDialog: Event) {
    this.submitted = true;
    console.log(this.eventItem.title);
    console.log(this.eventItem.description);
    console.log(eventDialog.start);
    console.log(eventDialog.end);
    this.eventServices.updateEvent(this.instructor.id, this.eventItem.id, this.eventItem).subscribe();
    this.instructorService.getInstructor(this.instructor.id).subscribe(instructor => {
      this.instructor = instructor;
      this.events = this.instructor.events;
    });
    this.events = [...this.events];
    this.eventDialogTable = false;
  }

  deleteEvent(event: Event) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete it?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventServices.deleteEvent(event.id, this.instructor.id).subscribe(
          (result: any) => {
            this.instructorService.getInstructor(this.instructor.id).subscribe(instructor => {
              this.instructor = instructor;
              this.events = this.instructor.events;
            });
          }
        );
        this.events = this.instructor.events;
      }
    });
  }

  hideDialog() {
    this.eventDialogTable = false;
    this.submitted = false;
  }

  saveInstructor(instructor: Instructor) {
    this.instructors.push(instructor);
    this.instructorService.saveInstructor(instructor).subscribe();
    this.newInstructor = {
      id: null,
      name: null,
      surname: null,
      birthday: null,
      events: null
    };
  }
}
