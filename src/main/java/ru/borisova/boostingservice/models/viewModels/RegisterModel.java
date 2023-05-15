package ru.borisova.boostingservice.models.viewModels;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RegisterModel {
    public String regNickname;
    public String regEmail;
    public String regPhone;
    public String regPassword;
}
