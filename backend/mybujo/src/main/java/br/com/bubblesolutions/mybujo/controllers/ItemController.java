package br.com.bubblesolutions.mybujo.controllers;

import br.com.bubblesolutions.mybujo.models.Item;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.List;

@RestController
public class ItemController {
    @GetMapping("/items")
    public Item[] getItems() {
        return new Item[]{new Item("1", "Content of Item 1"), new Item("2", "Content of Item 2")};
    }

    @PostMapping("/items")
    public Item addItem() {
        return new Item("1", "Content of Item 1");
    }

    @PutMapping("/items")
    public Item editItem(@RequestParam(value = "newValue") String newValue) {
        return new Item("1", "Content of Item 1");
    }
}
