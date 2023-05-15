package ru.borisova.boostingservice.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.borisova.boostingservice.models.Order;
import ru.borisova.boostingservice.models.User;

import java.util.List;

@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order,Long> {
    List<Order> findAllByUser(User user);
    List<Order> findAllByBooster(User booster);
    List<Order> findFirst10ByBoosterOrderByDateOfCreateDesc(User booster);
    List<Order> findAllByUserOrderByDateOfCreateDesc(User user);
    List<Order> findAllByStatus(String status);
    Order findFirstByStatusNotInAndBooster(List<String> statuses, User booster);
    Order findFirstByStatusNotInAndUser(List<String> statuses, User user);
}
