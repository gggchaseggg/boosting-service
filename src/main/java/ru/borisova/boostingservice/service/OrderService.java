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

@Component
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;

    public boolean isUserHasOrders(String email) {
        User user = userRepository.findFirstByEmail(email);
        if (user.role == "user") {
            Integer countActualOrders = orderRepository
                    .findAllByUser(user)
                    .stream().filter(order -> order.status != "Выполнен" && order.status != "Отменен")
                    .toList()
                    .size();
            return countActualOrders > 0;
        }
        else if (user.role == "booster") {
            Integer countActualOrders = orderRepository
                    .findAllByBooster(user)
                    .stream().filter(order -> order.status != "Выполнен" && order.status != "Отменен")
                    .toList()
                    .size();
            return countActualOrders > 0;
        }
        else return false;
    }

    public Order createNewOrder(OrderViewModel viewModel) {
        User client = userRepository.findFirstByEmail(viewModel.email);
        Service service = serviceRepository.findFirstByName(viewModel.service);

        Order order = new Order(
                client,
                service,
                LocalDate.now(),
                viewModel.startMMR,
                viewModel.endMMR,
                viewModel.countLP,
                Math.round(viewModel.cost),
                "Ожидает подтверждения"
        );
        return orderRepository.save(order);
    }
}
