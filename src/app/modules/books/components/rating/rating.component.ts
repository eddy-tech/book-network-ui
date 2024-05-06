import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input()
  rating: number = 0;
  maxRating: number = 5;

  get fullStars(): number {
    return Math.floor(this.rating);
  }

  get hasHalfStar(): boolean {
    return this.rating % 1!== 0;
  }

  get emptyStars(): number {
    return this.maxRating - Math.ceil(this.rating);
  }

  constructor() { }

  ngOnInit() {
  }

}
