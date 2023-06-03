package ru.borisova.boostingservice.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@Entity
@Table(name="reviews")
@AllArgsConstructor
@NoArgsConstructor
public class Review {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  public Long id;
  public String name;
  public String text;
  public LocalDate writeDate;

  public Review(String name, String text, LocalDate writeDate) {
    this.name = name;
    this.text = text;
    this.writeDate = writeDate;
  }
}
