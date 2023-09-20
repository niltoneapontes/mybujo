package br.com.bubblesolutions.mybujo.services;

import br.com.bubblesolutions.mybujo.entities.Item;
import br.com.bubblesolutions.mybujo.repositories.ItemRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Service;

import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ItemService implements ApplicationRunner {

    private static final Logger LOGGER = Logger.getLogger(ItemService.class.getName());

    private final ItemRepository repository;

    public ItemService(ItemRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        var item = new Item("Gaspar Barancelli Junior");

        LOGGER.log(Level.INFO, "Persist");
        repository.save(item);
        LOGGER.log(Level.INFO, item.toString());

        LOGGER.log(Level.INFO, "Find");
        repository.findById(item.getId()).ifPresent(it -> {
            LOGGER.log(Level.INFO, item.toString());
        });

        var item2 = new Item("Rodrigo Barancelli");

        LOGGER.log(Level.INFO, "Persist");
        repository.save(item2);
        LOGGER.log(Level.INFO, item2.toString());

        item2.setContent("Rodrigo Dalla Valle Barancelli");
        LOGGER.log(Level.INFO, "Update");
        repository.save(item2);
        LOGGER.log(Level.INFO, item2.toString());

        LOGGER.log(Level.INFO, "FindAll");
        repository.findAll().forEach(it -> LOGGER.log(Level.INFO, it.toString()));

        LOGGER.log(Level.INFO, "Delete");
        repository.delete(item2);
        LOGGER.log(Level.INFO, item2.toString());
    }
}