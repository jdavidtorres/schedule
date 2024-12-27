package co.com.jdti.app.models.repositories;

import co.com.jdti.app.models.entities.EventEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IEventRepository extends JpaRepository<EventEntity, String> {
}
