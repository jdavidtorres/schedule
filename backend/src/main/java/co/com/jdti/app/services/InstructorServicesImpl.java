package co.com.jdti.app.services;

import co.com.jdti.app.models.entities.EventEntity;
import co.com.jdti.app.models.entities.InstructorEntity;
import co.com.jdti.app.models.repositories.IInstructorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
public class InstructorServicesImpl implements IInstructorServices {

	@Autowired
	private IInstructorRepository iInstructorRepository;

	@Transactional(readOnly = true)
	@Override
	public List<InstructorEntity> findAllInstructors() {
		return iInstructorRepository.findAll();
	}

	@Transactional
	@Override
	public InstructorEntity save(InstructorEntity instructor) {
		return iInstructorRepository.save(instructor);
	}

	@Transactional
	@Override
	public InstructorEntity assignEvent(InstructorEntity instructorWithEvent) {
		return iInstructorRepository.save(instructorWithEvent);
	}

	@Transactional(readOnly = true)
	@Override
	public Optional<InstructorEntity> findInstructorById(String idInstructor) {
		return iInstructorRepository.findById(idInstructor);
	}

	@Transactional(readOnly = true)
	@Override
	public Long overallDuration(InstructorEntity instructor) {
		var minutesT = 0L;
		List<EventEntity> events = instructor.getEvents();
		for (EventEntity event : events) {
			var dateInit = event.getStart().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
			var dateEnd = event.getEnd().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
			var month = dateInit.getMonth();
			var actualMont = new Date().toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime().getMonth();
			if (month.equals(actualMont)) {
				long minutes = ChronoUnit.MINUTES.between(dateInit, dateEnd.plusDays(1));
				minutesT += minutes;
			}
		}
		return TimeUnit.DAYS.convert(minutesT, TimeUnit.MINUTES);
	}
}
