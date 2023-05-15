package ru.borisova.boostingservice.models.viewModels;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class OrderViewModel {
    public String email;
    public String service;
    public Integer startMMR;
    public Integer endMMR;
    public Integer countLP;
    public Float cost;
}
