package ru.borisova.boostingservice.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.borisova.boostingservice.models.Review;

import java.util.List;

@Repository
@Transactional
public interface ReviewRepository extends JpaRepository<Review, Long> {

  List<Review> findFirst20ByOrderByWriteDateDesc();

}
