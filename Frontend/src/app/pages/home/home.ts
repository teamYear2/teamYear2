import { Component } from '@angular/core';
import { Hero } from './shared/hero/hero';
import { FeaturesCarousel } from './shared/features-carousel/features-carousel';
import { CtaSection } from './shared/cta-section/cta-section';


@Component({
  selector: 'app-home',
  imports: [Hero, FeaturesCarousel, CtaSection],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
