package br.com.mybujo.main.controllers;

import br.com.mybujo.main.entities.Item;
import br.com.mybujo.main.repositories.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.*;

import java.text.MessageFormat;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping(value="/items")
public class ItemController {

    @Autowired
    private ItemRepository itemRepository;

    @GetMapping
    public List<Item> findAll() {
        return itemRepository.findAll();
    }

    @GetMapping(value="/{userId}")
    public List<Item> findByUserId(@PathVariable String userId) {
        Item item = new Item();
        item.setUserId(userId);

        Example<Item> example = Example.of(item);

        return itemRepository.findAll(
            example
        );
    }

    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemRepository.save(item);
    }
}
