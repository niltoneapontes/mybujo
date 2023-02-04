package br.com.mybujo.main.repositories;

import br.com.mybujo.main.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, String> {
}
