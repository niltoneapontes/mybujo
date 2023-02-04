package br.com.mybujo.main.repositories;

import br.com.mybujo.main.entities.Item;
import br.com.mybujo.main.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
