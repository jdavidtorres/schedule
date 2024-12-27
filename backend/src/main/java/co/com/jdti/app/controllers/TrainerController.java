package co.com.jdti.app.controllers;

import co.com.jdti.app.dtos.Event;
import co.com.jdti.app.dtos.Instructor;
import co.com.jdti.app.models.entities.EventEntity;
import co.com.jdti.app.models.entities.InstructorEntity;
import co.com.jdti.app.services.IInstructorServices;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Slf4j
@CrossOrigin({"*"})
@RestController
@RequestMapping("/instructor")
@RequiredArgsConstructor
public class TrainerController {

    private final IInstructorServices iInstructorServices;

    @GetMapping
    public ResponseEntity<List<InstructorEntity>> findAll() {
        List<InstructorEntity> instructorEntityList = iInstructorServices.findAllInstructors();
        if (instructorEntityList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(instructorEntityList);
    }

    @GetMapping("/instructor")
    public ResponseEntity<InstructorEntity> findInstructorById(@RequestParam String idInstructor) {
        Optional<InstructorEntity> instructorOptional = iInstructorServices.findInstructorById(idInstructor);
        if (instructorOptional.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(instructorOptional.get());
    }

    @PostMapping
    public ResponseEntity<InstructorEntity> save(@Valid @RequestBody Instructor instructor, BindingResult result) {
        if (result.hasErrors()) {
            return ResponseEntity.badRequest().build();
        }

        var instructorSave = InstructorEntity.builder()
            .name(instructor.getName())
            .surname(instructor.getSurname())
            .birthday(instructor.getBirthday())
            .build();

        return ResponseEntity.status(HttpStatus.CREATED).body(iInstructorServices.save(instructorSave));
    }

    @PostMapping("/assign-event")
    public ResponseEntity<InstructorEntity> assignEvent(@RequestParam String idInstructor, @Valid @RequestBody Event event, BindingResult result) {
        if (result.hasErrors()) {
            log.error("Error: Bad request");
            return ResponseEntity.badRequest().build();
        }

        Optional<InstructorEntity> instructor = iInstructorServices.findInstructorById(idInstructor);
        if (instructor.isEmpty()) {
            log.warn("assign-event(): Instructor not found");
            return ResponseEntity.noContent().build();
        }

        var newEvent = EventEntity.builder()
            .title(event.getTitle())
            .start(event.getStart())
            .end(event.getEnd())
            .description(event.getDescription())
            .build();

        var instructorEvent = InstructorEntity.builder()
            .id(instructor.get().getId())
            .name(instructor.get().getName())
            .surname(instructor.get().getSurname())
            .birthday(instructor.get().getBirthday())
            .build();

        instructor.get().getEvents().add(newEvent);
        instructorEvent.setEvents(instructor.get().getEvents());
        log.info("assign-event(): Without errors");
        return ResponseEntity.status(HttpStatus.CREATED).body(iInstructorServices.assignEvent(instructorEvent));
    }

    @GetMapping("/overall")
    public ResponseEntity<Long> getOverall(@RequestParam String idInstructor) {
        Optional<InstructorEntity> instructor = iInstructorServices.findInstructorById(idInstructor);
        if (instructor.isEmpty()) {
            log.warn("overall(): Instructor not found");
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.OK).body(iInstructorServices.overallDuration(instructor.get()));
    }
}
