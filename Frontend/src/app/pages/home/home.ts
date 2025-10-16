import { Component } from '@angular/core';
import { Hero } from './shared/hero/hero';
import { FeaturesCarousel } from './shared/features-carousel/features-carousel';
import { CtaSection } from './shared/cta-section/cta-section';
import { ContactForm } from './shared/contact-form/contact-form';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [Hero, FeaturesCarousel, CtaSection, ContactForm, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home {

}
