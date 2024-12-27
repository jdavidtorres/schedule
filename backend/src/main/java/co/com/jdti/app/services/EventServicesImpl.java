package co.com.jdti.app.services;

import co.com.jdti.app.models.entities.EventEntity;
import co.com.jdti.app.models.repositories.IEventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EventServicesImpl implements IEventServices {

    @Autowired
    private IEventRepository iEventRepository;

    @Transactional(readOnly = true)
    @Override
    public List<EventEntity> findAll() {
        return iEventRepository.findAll();
    }

    @Transactional(readOnly = true)
    @Override
    public Optional<EventEntity> findEventById(String idEvent) {
        return iEventRepository.findById(idEvent);
    }

    @Transactional
    @Override
    public EventEntity edit(EventEntity event) {
        return iEventRepository.save(event);
    }

    @Transactional
    @Override
    public void delete(String idEvent) {
        iEventRepository.deleteById(idEvent);
    }
}
