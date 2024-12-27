package co.com.jdti.app.services;

import co.com.jdti.app.models.entities.EventEntity;

import java.util.List;
import java.util.Optional;

public interface IEventServices {

    List<EventEntity> findAll();

    Optional<EventEntity> findEventById(String idEvent);

    EventEntity edit(EventEntity event);

    void delete(String idEvent);
}
