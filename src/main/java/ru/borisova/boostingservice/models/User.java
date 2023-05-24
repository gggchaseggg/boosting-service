package ru.borisova.boostingservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="users")
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String nickname;
    public String email;
    public String phone;
    public String password;
    public String role;
    public String avatar;

    public User(String nickname, String email, String phone, String password)
    {
        this.nickname = nickname;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.role = "user";
        this.avatar = "";
    }

    public User(Long id, String nickname, String email, String phone, String role) {
        this.id = id;
        this.nickname = nickname;
        this.email = email;
        this.phone = phone;
        this.role = role;
        this.avatar = "";
    }
}
