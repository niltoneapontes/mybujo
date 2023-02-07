package br.com.mybujo.main.repositories;

import br.com.mybujo.main.entities.Item;
import br.com.mybujo.main.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, String> {
    @Query("SELECT u from User u where username = :username")
    User findByUsername(@Param("username") String username);
}
