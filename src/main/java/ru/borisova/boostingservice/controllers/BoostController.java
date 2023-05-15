package ru.borisova.boostingservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.borisova.boostingservice.models.viewModels.ListOrder;
import ru.borisova.boostingservice.models.viewModels.ViewUserModel;
import ru.borisova.boostingservice.service.BoostService;

@RestController
@RequestMapping("api/booster")
@AllArgsConstructor
public class BoostController {

    private final BoostService boostService;

    @GetMapping("getBoosterInfo")
    public ViewUserModel getOrderInfo(@RequestParam String email) {
        return boostService.getOrderInfo(email);
    }

    @GetMapping("getNewBoosterInfo")
    public ViewUserModel getNewOrderInfo(@RequestParam String email) {
        return boostService.getNewOrderInfo(email);
    }

    @GetMapping("getNewOrder")
    public ListOrder getNewOrder(@RequestParam String email, @RequestParam Long orderid) {
        return boostService.getNewOrderWithStatus(email, orderid, "Ожидает оплаты");
    }

    @GetMapping("getOrderStatusCancel")
    public ListOrder getOrderStatusCancel(@RequestParam String email, @RequestParam Long orderid) {
        return boostService.getNewOrderWithStatus(email, orderid, "Отменен");
    }

    @GetMapping("check")
    public ListOrder checkOrder(@RequestParam String email) {
        return boostService.checkOrder(email);
    }

    @GetMapping("getStatusComplete")
    public ListOrder getStatusComplete(@RequestParam String email) {
        return boostService.getStatusComplete(email);
    }
}
