package ru.borisova.boostingservice.controllers;


import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import ru.borisova.boostingservice.models.Review;
import ru.borisova.boostingservice.models.viewModels.ReviewCreateModel;
import ru.borisova.boostingservice.service.ReviewService;

import java.util.List;

@RestController
@RequestMapping("api/review")
@AllArgsConstructor
public class ReviewController {

  public final ReviewService reviewService;

  @GetMapping
  public List<Review> getFirstReviews () {
    return reviewService.getFirstReviews();
  }

  @PostMapping
  public Review createReview (@RequestBody ReviewCreateModel model) {
    return reviewService.createReview(model);
  }
}
