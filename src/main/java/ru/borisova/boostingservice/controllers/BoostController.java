package ru.borisova.boostingservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
@PreAuthorize("hasAuthority('booster')")
public class BoostController {

    private final BoostService boostService;

    @GetMapping("getBoosterInfo")
    public ViewUserModel getOrderInfo(Authentication auth) {
        return boostService.getOrderInfo(auth.getName());
    }

    @GetMapping("getNewBoosterInfo")
    public ViewUserModel getNewOrderInfo(Authentication auth) {
        return boostService.getNewOrderInfo(auth.getName());
    }

    @GetMapping("getNewOrder")
    public ListOrder getNewOrder(@RequestParam Long orderid, Authentication auth) {
        return boostService.getNewOrderWithStatus(auth.getName(), orderid, "Ожидает оплаты");
    }

    @GetMapping("getOrderStatusCancel")
    public ListOrder getOrderStatusCancel(@RequestParam Long orderid, Authentication auth) {
        return boostService.getNewOrderWithStatus(auth.getName(), orderid, "Отменен");
    }

    @GetMapping("check")
    public ListOrder checkOrder(Authentication auth) {
        return boostService.checkOrder(auth.getName());
    }

    @GetMapping("getStatusComplete")
    public ListOrder getStatusComplete(Authentication auth) {
        return boostService.getStatusComplete(auth.getName());
    }
}
