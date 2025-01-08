package co.com.jdti.app.services;

import co.com.jdti.app.models.entities.InstructorEntity;

import java.util.List;
import java.util.Optional;

public interface IInstructorServices {

	List<InstructorEntity> findAllInstructors();

	InstructorEntity save(InstructorEntity instructor);

	InstructorEntity assignEvent(InstructorEntity instructorWithEvent);

	Optional<InstructorEntity> findInstructorById(String idInstructor);

	Long overallDuration(InstructorEntity instructor);
}
