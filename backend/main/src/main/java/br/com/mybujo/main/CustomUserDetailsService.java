package br.com.mybujo.main;

import br.com.mybujo.main.entities.User;
import br.com.mybujo.main.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User existsUser = userRepository.findByUsername(username);

        if(existsUser == null) {
            throw new Error("User does not exist!");
        }

        return UserPrincipal.create(existsUser);
    }
}
