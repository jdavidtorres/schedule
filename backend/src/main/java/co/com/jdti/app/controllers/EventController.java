package co.com.jdti.app.controllers;

import co.com.jdti.app.dtos.Event;
import co.com.jdti.app.models.entities.EventEntity;
import co.com.jdti.app.models.entities.InstructorEntity;
import co.com.jdti.app.services.IEventServices;
import co.com.jdti.app.services.IInstructorServices;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Slf4j
@CrossOrigin({ "*" })
@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired
	private IEventServices iEventServices;

	@Autowired
	private IInstructorServices iInstructorServices;

	@GetMapping
	public ResponseEntity<List<EventEntity>> findAll() {
		List<EventEntity> eventEntities = iEventServices.findAll();
		if (eventEntities.isEmpty()) {
			return ResponseEntity.noContent().build();
		}
		return ResponseEntity.ok(eventEntities);
	}

	@DeleteMapping
	public ResponseEntity<Void> delete(@RequestParam String idEvent, @RequestParam String idInstructor) {
		Optional<EventEntity> objEvent = iEventServices.findEventById(idEvent);
		if (objEvent.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		Optional<InstructorEntity> objInstructor = iInstructorServices.findInstructorById(idInstructor);
		if (objInstructor.isEmpty()) {
			return ResponseEntity.noContent().build();
		}

		var instructorEntity = objInstructor.get();
		// instructorEntity.removeEvent(objEvent.get());

		iInstructorServices.save(instructorEntity);
		return ResponseEntity.ok().build();
	}

	@PutMapping
	public ResponseEntity<EventEntity> editEvent(@RequestParam String idInstructor, @RequestParam String idEvent,
			@Valid @RequestBody Event event, BindingResult result) {
		if (result.hasErrors()) {
			log.error("Error");
			return ResponseEntity.badRequest().build();
		}

		Optional<InstructorEntity> instructor = iInstructorServices.findInstructorById(idInstructor);
		if (instructor.isEmpty()) {
			log.warn("editEvent(): Instructor not found");
			return ResponseEntity.noContent().build();
		}

		Optional<EventEntity> optionalEvent = iEventServices.findEventById(idEvent);
		if (optionalEvent.isEmpty()) {
			log.warn("editEvent(): Event not found");
			return ResponseEntity.noContent().build();
		}

		if (event.getEnd().before(event.getStart())) {
			return ResponseEntity.badRequest().build();
		}

		var eventEntity = optionalEvent.get();
		eventEntity.setTitle(event.getTitle());
		eventEntity.setDescription(event.getDescription());
		eventEntity.setStart(event.getStart());
		eventEntity.setEnd(event.getEnd());

		return ResponseEntity.ok(iEventServices.edit(eventEntity));
	}
}
