import { Component } from '@angular/core';
import { CarouselComponent } from "../../components/carousel/carousel.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { FeatureComponent } from "../../components/feature/feature.component";
import { PromotionComponent } from "../../components/promotion/promotion.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselComponent, NavbarComponent, FooterComponent, FeatureComponent, PromotionComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
