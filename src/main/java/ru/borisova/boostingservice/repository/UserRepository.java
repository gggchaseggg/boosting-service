package ru.borisova.boostingservice.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.borisova.boostingservice.models.User;

import java.util.List;

@Repository
@Transactional
public interface UserRepository extends JpaRepository<User,Long> {
    User findFirstByEmail(String email);
    List<User> findAllByEmail(String email);
    List<User> findAllByEmailAndPasswordAndRoleNot(String email, String password, String role);
}
