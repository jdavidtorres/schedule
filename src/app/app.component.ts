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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Schedule';

  instructors: Instructor[];
  instructor: Instructor;

  events: Event[];
  event: Event = {
    id: null,
    title: null,
    description: null,
    start: null,
    end: null
  };

  options: any;

  displayAssigDialog: boolean = false;

  constructor(private instructorService: InstructorService, private eventServices: EventService, private messageService: MessageService) { }

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
}
