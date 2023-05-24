package ru.borisova.boostingservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
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
    public boolean isUserHasOrders(Authentication auth) {
        return orderService.isUserHasOrders(auth.getName());
    }

    @PostMapping("create")
    public Order createNewOrder(@RequestBody Order viewOrder, Authentication auth) {
        return orderService.createNewOrder(viewOrder, auth.getName());
    }

    @PostMapping("check")
    public Order check(@RequestBody OrderViewModel viewOrder, Authentication auth) {
        return orderService.check(viewOrder, viewOrder.service, auth.getName());
    }
}
