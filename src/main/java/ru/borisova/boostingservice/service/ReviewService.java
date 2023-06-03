package ru.borisova.boostingservice.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.borisova.boostingservice.models.Review;
import ru.borisova.boostingservice.models.viewModels.ReviewCreateModel;
import ru.borisova.boostingservice.repository.ReviewRepository;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class ReviewService {

  private final ReviewRepository reviewRepository;

  public List<Review> getFirstReviews () {
    return reviewRepository.findFirst20ByOrderByWriteDateDesc();
  }

  public Review createReview(ReviewCreateModel model) {
    return reviewRepository.save(
      new Review(
        model.name,
        model.text,
        LocalDate.now()
        )
    );
  }

}
