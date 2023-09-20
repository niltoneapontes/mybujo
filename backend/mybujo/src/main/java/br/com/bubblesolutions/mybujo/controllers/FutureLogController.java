package br.com.bubblesolutions.mybujo.controllers;

import br.com.bubblesolutions.mybujo.models.MonthlyLogItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FutureLogController {
    @GetMapping("/future")
    public MonthlyLogItem[] getMonthlyLogItems() {
        return new MonthlyLogItem[]{new MonthlyLogItem("1", "Future Log Task")};
    }

    @PostMapping("/future")
    public MonthlyLogItem addMonthlyLogItems() {
        return new MonthlyLogItem("1", "Future Log Task");
    }

    @PutMapping("/future")
    public MonthlyLogItem editMonthlyLogItems() {
        return new MonthlyLogItem("1", "Future Log Task");
    }
}
