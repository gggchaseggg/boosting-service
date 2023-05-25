package ru.borisova.boostingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.models.Order;
import ru.borisova.boostingservice.models.Service;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.models.viewModels.OrderViewModel;
import ru.borisova.boostingservice.repository.OrderRepository;
import ru.borisova.boostingservice.repository.ServiceRepository;
import ru.borisova.boostingservice.repository.UserRepository;

import java.time.LocalDate;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    public boolean isUserHasOrders(String email) {
        User user = userRepository.findFirstByEmail(email);
        if (Objects.equals(user.role, "user")) {
            Integer countActualOrders = orderRepository
                    .findAllByUser(user)
                    .stream().filter(order -> (!Objects.equals(order.status, "Выполнен") && !Objects.equals(order.status, "Отменен")))
                    .toList()
                    .size();
            return countActualOrders > 0;
        }
        else if (Objects.equals(user.role, "booster")) {
            Integer countActualOrders = orderRepository
                    .findAllByBooster(user)
                    .stream().filter(order -> !Objects.equals(order.status, "Выполнен") && !Objects.equals(order.status, "Отменен"))
                    .toList()
                    .size();
            return countActualOrders > 0;
        }
        else return false;
    }

    public Order createNewOrder(Order viewModel, String email) {
        User client = userRepository.findFirstByEmail(email);

        viewModel.setUser(client);

        return orderRepository.save(viewModel);
    }

    public Order check(OrderViewModel model, String type, String email) {
        Service service = serviceRepository.findFirstByName(type);
        User client = userRepository.findFirstByEmail(email);

        Order order;

        if (Objects.equals(type, "boost")) {
            order = new Order(
                    client,
                    service,
                    LocalDate.now(),
                    model.startMMR,
                    model.endMMR,
                    model.countLP,
                    Math.round((model.endMMR - model.startMMR) * service.cost * service.discount),
                    "Ожидает подтверждения"
            );
        } else if (Objects.equals(type, "lp")) {
            order = new Order(
                    client,
                    service,
                    LocalDate.now(),
                    model.startMMR,
                    model.endMMR,
                    model.countLP,
                    Math.round(model.countLP * service.cost * service.discount),
                    "Ожидает подтверждения"
            );

        } else {
            order = new Order(
                    client,
                    service,
                    LocalDate.now(),
                    model.startMMR,
                    model.endMMR,
                    model.countLP,
                    Math.round(service.cost * service.discount),
                    "Ожидает подтверждения"
            );
        }

        return order;
    }
}
