package ru.borisova.boostingservice.models.viewModels;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ChangeInfoModel {
    public String avatar;
    public String nickname;
    public String phone;
    public String password;
}
