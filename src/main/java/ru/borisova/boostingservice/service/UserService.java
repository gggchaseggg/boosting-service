package ru.borisova.boostingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.models.Order;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.models.viewModels.ListOrder;
import ru.borisova.boostingservice.models.viewModels.LoginModel;
import ru.borisova.boostingservice.models.viewModels.RegisterModel;
import ru.borisova.boostingservice.models.viewModels.ViewUserModel;
import ru.borisova.boostingservice.repository.OrderRepository;
import ru.borisova.boostingservice.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    private final PasswordEncoder encoder;

    public User getUserInfo(String email) {
        User userFromDB = userRepository.findFirstByEmail(email);
        return new User(
                userFromDB.id,
                userFromDB.nickname,
                userFromDB.email,
                userFromDB.phone,
                null,
                userFromDB.role
        );
    }

    public String getUserNicknameByEmail(String email) {
        return userRepository.findFirstByEmail(email).nickname;
    }

    public Boolean getUserByEmail(String email) {
        return userRepository.findAllByEmail(email).size() == 0;
    }

    public String login(LoginModel model) {
        List<User> users = userRepository.
                findAllByEmailAndPasswordAndRoleNot(model.logEmail, model.logPassword, "block");
        return users.size() != 0
                ? users.get(users.size() - 1).role
                : "err";
    }

    public User register(RegisterModel model) {
        User user = new User(
                model.regNickname,
                model.regEmail,
                model.regPhone,
                encoder.encode(model.regPassword)
        );
        return userRepository.save(user);
    }

    public User changeRoleUserByEmail(String email, String role) {
        User userForBlock = userRepository.findFirstByEmail(email);
        userForBlock.role = role;
        userRepository.save(userForBlock);

        return new User(
                userForBlock.id,
                userForBlock.nickname,
                userForBlock.email,
                userForBlock.phone,
                null,
                userForBlock.role
        );

    }

    public ViewUserModel getUserOrders(String email) {

        User user = userRepository.findFirstByEmail(email);

        List<Order> orders = orderRepository.findAllByUserOrderByDateOfCreateDesc(user);

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
                user.nickname,
                user.email,
                user.phone,
                viewListOrders
        );
    }

    public ListOrder getNewOrderInfo(String email) {
        User user = userRepository.findFirstByEmail(email);

        Order order = orderRepository.findFirstByStatusNotInAndUser(
                new ArrayList<>(List.of("Выполнен", "Отменен")),
                user
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

    public ListOrder getStatusOrder(String email, String status) {
        User user = userRepository.findFirstByEmail(email);

        Order order = orderRepository.findFirstByStatusNotInAndUser(
                new ArrayList<>(List.of("Выполнен", "Отменен")),
                user
        );

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

}
