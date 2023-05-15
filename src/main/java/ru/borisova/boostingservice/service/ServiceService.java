package ru.borisova.boostingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.models.Service;
import ru.borisova.boostingservice.repository.ServiceRepository;

import java.util.List;

@Component
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public List<Service> getAll(){
        return serviceRepository.findAll();
    }
}
