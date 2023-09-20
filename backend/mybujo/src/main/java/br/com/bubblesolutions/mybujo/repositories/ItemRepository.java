package br.com.bubblesolutions.mybujo.repositories;

import br.com.bubblesolutions.mybujo.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, String> {
}
