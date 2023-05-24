package ru.borisova.boostingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.models.Order;
import ru.borisova.boostingservice.models.User;
import ru.borisova.boostingservice.models.viewModels.*;
import ru.borisova.boostingservice.repository.OrderRepository;
import ru.borisova.boostingservice.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

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
                userFromDB.role,
                userFromDB.avatar
        );
    }

    public String getUserNicknameByEmail(String email) {
        return userRepository.findFirstByEmail(email).nickname;
    }

    public Boolean getUserByEmail(String email) {
        return userRepository.findAllByEmail(email).size() == 0;
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
                userForBlock.role,
                userForBlock.avatar
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
                user.avatar,
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

        if (user == null || order == null) return null;

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

    public User changeInfo(ChangeInfoModel model, String email) {
        User user = userRepository.findFirstByEmail(email);

        user.setAvatar(model.avatar);
        user.setNickname(model.nickname);
        user.setPhone(model.phone);
        if (!Objects.equals(model.password, "") && !Objects.equals(model.password, " ")) {
            user.setPassword(encoder.encode(model.password));
        }

        return userRepository.save(user);
    }

}
