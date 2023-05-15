package ru.borisova.boostingservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.borisova.boostingservice.models.Order;
import ru.borisova.boostingservice.models.viewModels.OrderViewModel;
import ru.borisova.boostingservice.service.OrderService;

@RestController
@RequestMapping("api/order")
@AllArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @GetMapping("isUserHasOrders")
    public boolean isUserHasOrders(@RequestParam("email") String email) {
        return orderService.isUserHasOrders(email);
    }

    @PostMapping("create")
    public Order createNewOrder(@RequestBody OrderViewModel viewOrder) {
        return orderService.createNewOrder(viewOrder);
    }
}
