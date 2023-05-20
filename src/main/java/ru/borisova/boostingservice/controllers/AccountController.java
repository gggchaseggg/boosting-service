package ru.borisova.boostingservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.models.viewModels.LoginModel;
import ru.borisova.boostingservice.models.viewModels.RegisterModel;
import ru.borisova.boostingservice.service.UserService;

@RestController
@RequestMapping("api/account")
@AllArgsConstructor
public class AccountController {

    private final UserService userService;

    @GetMapping("getUserInfo")
    public User getUserInfo(Authentication auth) {
        return userService.getUserInfo(auth.getName());
    }

    @GetMapping("getnickname")
    public String getUserNicknameByEmail(Authentication auth) {
        return userService.getUserNicknameByEmail(auth.getName());
    }

    @GetMapping("existsemail")
    public Boolean getUserByEmail(@RequestParam String email) {
        return userService.getUserByEmail(email);
    }

//    @PostMapping("login")
//    public String login(@RequestBody LoginModel model) {
//        return userService.login(model);
//    }

    @PostMapping("register")
    public User register(@RequestBody RegisterModel model) {
        return userService.register(model);
    }
}
