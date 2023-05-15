package ru.borisova.boostingservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;


@Data
@Entity
@Table(name="orders")
@AllArgsConstructor
@NoArgsConstructor
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    @ManyToOne
    public User user;
    @ManyToOne
    public User booster;
    @ManyToOne
    public Service service;
    public LocalDate dateOfCreate;
    public Integer startMMR;
    public Integer endMMR;
    public Integer countLP;
    public Integer cost;
    public String status;

    public Order(User user, Service service, LocalDate dateOfCreate, Integer startMMR, Integer endMMR, Integer countLP, Integer cost, String status) {
        this.user = user;
        this.service = service;
        this.dateOfCreate = dateOfCreate;
        this.startMMR = startMMR;
        this.endMMR = endMMR;
        this.countLP = countLP;
        this.cost = cost;
        this.status = status;
    }
}
