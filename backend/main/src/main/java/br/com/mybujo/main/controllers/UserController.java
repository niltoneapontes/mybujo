package br.com.mybujo.main.controllers;

import br.com.mybujo.main.entities.User;
import br.com.mybujo.main.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value="/users")
public class UserController {

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
        return userRepository.save(user);
    }
}
