package ru.borisova.boostingservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.borisova.boostingservice.models.viewModels.ListOrder;
import ru.borisova.boostingservice.models.viewModels.ViewUserModel;
import ru.borisova.boostingservice.service.UserService;

@RestController
@RequestMapping("api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("getUserInfo")
    public ViewUserModel getUserInfo(String email) {
        return userService.getUserOrders(email);
    }

    @GetMapping("getNewOrderInfo")
    public ListOrder getNewOrderInfo(@RequestParam String email) {
        return userService.getNewOrderInfo(email);
    }

    @GetMapping("getStatusInProcess")
    public ListOrder getStatusInProcess(@RequestParam String email) {
        return userService.getStatusOrder(email, "Выполняется");
    }

    @GetMapping("getStatusDelete")
    public ListOrder getStatusDelete(@RequestParam String email) {
        return userService.getStatusOrder(email, "Отменен");
    }
}
