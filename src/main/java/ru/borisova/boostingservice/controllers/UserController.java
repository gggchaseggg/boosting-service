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
import ru.borisova.boostingservice.service.UserService;

@RestController
@RequestMapping("api/user")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("getUserInfo")
    public ViewUserModel getUserInfo(Authentication auth) {
        return userService.getUserOrders(auth.getName());
    }

    @GetMapping("getNewOrderInfo")
    public ListOrder getNewOrderInfo(Authentication auth) {
        return userService.getNewOrderInfo(auth.getName());
    }

    @GetMapping("getStatusInProcess")
    public ListOrder getStatusInProcess(Authentication auth) {
        return userService.getStatusOrder(auth.getName(), "Выполняется");
    }

    @GetMapping("getStatusDelete")
    public ListOrder getStatusDelete(Authentication auth) {
        return userService.getStatusOrder(auth.getName(), "Отменен");
    }
}
