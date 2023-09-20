package br.com.bubblesolutions.mybujo.controllers;

import br.com.bubblesolutions.mybujo.models.MonthlyLogItem;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MonthlyLogController {
    @GetMapping("/monthly")
    public MonthlyLogItem[] getMonthlyLogItems() {
        return new MonthlyLogItem[]{new MonthlyLogItem("1", "Monthly Log Task")};
    }

    @PostMapping("/monthly")
    public MonthlyLogItem addMonthlyLogItems() {
        return new MonthlyLogItem("1", "Monthly Log Task");
    }

    @PutMapping("/monthly")
    public MonthlyLogItem editMonthlyLogItems() {
        return new MonthlyLogItem("1", "Monthly Log Task");
    }
}
