package ru.borisova.boostingservice.models.viewModels;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ViewUserModel {
    public String nickname;
    public String email;
    public String phone;
    public List<ListOrder> orders;
}
