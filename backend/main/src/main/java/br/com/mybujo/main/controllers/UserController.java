package br.com.mybujo.main.controllers;

import br.com.mybujo.main.entities.Item;
import br.com.mybujo.main.entities.User;
import br.com.mybujo.main.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/users")
public class UserController {

    private BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @GetMapping(value="/{userId}")
    public List<User> findByUserId(@PathVariable String userId) {
        User user = new User();
        user.setId(userId);

        Example<User> example = Example.of(user);

        return userRepository.findAll(
            example
        );
    }

    @PostMapping
    public User createItem(@RequestBody User user) {
        User possibleUser = new User();
        possibleUser.setUsername(user.getUsername());

        Example<User> example = Example.of(possibleUser);

        List<User> existsUser = userRepository.findAll(example);

        if(existsUser.size() > 0) {
            throw new Error("User already exists!");
        }

        user.setPassword(passwordEncoder().encode(user.getPassword()));

        return userRepository.save(user);
    }
}
