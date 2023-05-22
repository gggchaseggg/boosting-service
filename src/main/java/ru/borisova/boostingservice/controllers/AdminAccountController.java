package ru.borisova.boostingservice.controllers;

import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.service.UserService;

@RestController
@RequestMapping("api/admin")
@AllArgsConstructor
@PreAuthorize("hasAuthority('admin')")
public class AdminAccountController {

    private final UserService userService;

    @GetMapping("blockUser")
    public User blockUserByEmail(@RequestParam String email) {
        return userService.changeRoleUserByEmail(email, "block");
    }

    @GetMapping("unblockUser")
    public User unblockUserByEmail(@RequestParam String email) {
        return userService.changeRoleUserByEmail(email, "user");
    }

    @GetMapping("setrolebooster")
    public User setBoosterRole(@RequestParam String email) {
        return userService.changeRoleUserByEmail(email, "booster");
    }

}
