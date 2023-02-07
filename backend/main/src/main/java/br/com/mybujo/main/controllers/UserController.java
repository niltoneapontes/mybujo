package br.com.mybujo.main.controllers;

import br.com.mybujo.main.CustomUserDetailsService;
import br.com.mybujo.main.entities.User;
import br.com.mybujo.main.jwt.JwtUtils;
import br.com.mybujo.main.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;


@RestController
@RequestMapping(value="/users")
public class UserController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

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

    @PostMapping(value="/login")
    public ResponseEntity<String> login(@RequestBody User user, HttpServletResponse response) {
        try {
            if (user != null) {
                UserDetails userDetails = customUserDetailsService.loadUserByUsername(user.getUsername());
                String jwt = jwtUtils.generateToken(userDetails);
                Cookie cookie = new Cookie("jwt", jwt);
                cookie.setMaxAge(7 * 24 * 60 * 60); // expires in 7 days
//                cookie.setSecure(true);
                cookie.setHttpOnly(true);
                cookie.setPath("/"); // Global
                response.addCookie(cookie);
                return ResponseEntity.ok(jwt);
            }
            return ResponseEntity.status(400).body("Error authenticating");
        } catch(Exception e) {
            System.out.println(e);
            return ResponseEntity.status(400).body("Error: " + e.getMessage());
        }
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
