package ru.borisova.boostingservice.security;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.repository.UserRepository;

@Component
public class UserInfoDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        var user = userRepository.findFirstByEmail(email);
        if (user == null){
            throw new UsernameNotFoundException("User with email " + email + " is not found.");
        }
        return new UserInfoDetails(user);
    }
}
