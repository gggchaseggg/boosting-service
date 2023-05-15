package ru.borisova.boostingservice.models.viewModels;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginModel {
    public String logEmail;
    public String logPassword;
}
