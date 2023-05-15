package ru.borisova.boostingservice.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.borisova.boostingservice.models.Service;

@Repository
@Transactional
public interface ServiceRepository extends JpaRepository<Service,Long> {
    Service findFirstByName(String name);
}
