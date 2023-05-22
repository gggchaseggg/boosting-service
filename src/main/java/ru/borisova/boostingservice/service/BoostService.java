package ru.borisova.boostingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.models.Order;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.models.viewModels.ListOrder;
import ru.borisova.boostingservice.models.viewModels.ViewUserModel;
import ru.borisova.boostingservice.repository.OrderRepository;
import ru.borisova.boostingservice.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class BoostService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public ViewUserModel getOrderInfo(String email) {

        User booster = userRepository.findFirstByEmail(email);

        List<Order> orders = orderRepository.findFirst10ByBoosterOrderByDateOfCreateDesc(booster);

        List<ListOrder> viewListOrders = new ArrayList<ListOrder>();

        for (Order order : orders) {
            viewListOrders.add(
                    new ListOrder(order.id,
                            order.startMMR,
                            order.endMMR,
                            order.countLP,
                            order.cost,
                            order.status
                    )
            );
        }
        return new ViewUserModel(
                booster.nickname,
                booster.email,
                booster.phone,
                viewListOrders
        );
    }

    public ViewUserModel getNewOrderInfo(String email) {

        User booster = userRepository.findFirstByEmail(email);

        List<Order> orders = orderRepository.findAllByStatus("Ожидает подтверждения");

        List<ListOrder> viewListOrders = new ArrayList<ListOrder>();

        for (Order order : orders) {
            viewListOrders.add(
                    new ListOrder(order.id,
                            order.startMMR,
                            order.endMMR,
                            order.countLP,
                            order.cost,
                            order.status
                    )
            );
        }
        return new ViewUserModel(
                booster.nickname,
                booster.email,
                booster.phone,
                viewListOrders
        );
    }

    public ListOrder getNewOrderWithStatus(String email, Long orderid, String status) {
        User boosterFromDB = userRepository.findFirstByEmail(email);

        Order order = orderRepository.findById(orderid).get();

        order.booster = boosterFromDB;
        order.status = status;
        orderRepository.save(order);

        return new ListOrder(
                order.id,
                order.startMMR,
                order.endMMR,
                order.countLP,
                order.cost,
                order.status
        );
    }

    public ListOrder checkOrder(String email) {
        User booster = userRepository.findFirstByEmail(email);


        Order order = orderRepository.findFirstByStatusNotInAndBooster(
                new ArrayList<>(List.of("Выполнен", "Отменен")),
                booster
        );

        return order == null
                ? null
                : new ListOrder(
                order.id,
                order.startMMR,
                order.endMMR,
                order.countLP,
                order.cost,
                order.status
        );


    }

    public ListOrder getStatusComplete(String email) {
        User booster = userRepository.findFirstByEmail(email);

        Order order = orderRepository.findFirstByStatusNotInAndBooster(
                new ArrayList<>(List.of("Выполнен", "Отменен")),
                booster
        );

        if (booster == null || order == null) return null;

        order.status = "Выполнен";
        orderRepository.save(order);

        return new ListOrder(
                order.id,
                order.startMMR,
                order.endMMR,
                order.countLP,
                order.cost,
                order.status
        );
    }
}
