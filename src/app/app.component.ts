import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms'

import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import { Instructor } from './models/instructor';
import { InstructorService } from './services/instructor.service';
import { EventService } from './services/event.service';
import { Event } from './models/event';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

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
    lastname: null,
    birthday: null,
    events: null
  };

  overal: number;

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

  displayAssigDialog: boolean = false;
  eventDialogTable: boolean = false;
  submitted: boolean = true;

  constructor(private instructorService: InstructorService, private eventServices: EventService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.eventServices.findAll().subscribe(events => {
      this.events = events;
    });
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      height: 700,
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      }
    };
    this.instructorService.findAll().subscribe(instructors => {
      this.instructors = instructors;
    });
  }

  assignEvent(fomAssign: NgForm) {
    this.instructorService.assignEventToInstructor(this.event, this.instructor.id).subscribe(
      (result: any) => {
        this.messageService.add({ severity: 'success', summary: 'Exitoso', detail: 'Se asigno el evento al instructor' });
        fomAssign.reset();
      },
      error => {
        console.error("Error al intentar asignar el evento");
        console.error(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al intentar asignar el evento' });
      });
  }

  getOverall(idInstructor: string) {
    this.instructorService.getOverall(idInstructor).subscribe(result => {
      this.overal = result;
    });
  }

  editEvent(eventEdit: Event) {
    this.eventItem = {
      id: eventEdit.id,
      title: eventEdit.title,
      description: eventEdit.description,
      start: new Date(eventEdit.start),
      end: new Date(eventEdit.end)
    };
    this.eventDialogTable = true;
  }

  saveUpdated() {
    this.submitted = true;
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
      message: 'Seguro que desea eliminar el elemento?',
      header: 'Confirmacion',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.eventServices.deleteEvent(event.id).subscribe();
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
      lastname: null,
      birthday: null,
      events: null
    };
  }
}
