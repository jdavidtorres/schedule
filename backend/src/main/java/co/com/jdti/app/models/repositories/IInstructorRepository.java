package co.com.jdti.app.models.repositories;

import co.com.jdti.app.models.entities.InstructorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IInstructorRepository extends JpaRepository<InstructorEntity, String> {
}
