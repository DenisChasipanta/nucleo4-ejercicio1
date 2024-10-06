import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { FooterComponent } from "../../components/footer/footer.component";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from '@angular/common';


@Component({
  selector: 'app-producto',
  standalone: true,
  imports: [FooterComponent, NavbarComponent, FormsModule, CommonModule],
  providers: [ProductService],
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  products: any[] = [];
  selectedProduct: any = null;
  isNightMode = false;
  viewMode: 'grid' | 'table' = 'grid';
  filterCategory: string = '';
  language: 'es' | 'en' = 'es';

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadProducts();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.loadProductDetails(params['id']);
      }
    });
  }

  loadProducts() {
    this.productService.getProducts().subscribe(
      data => {
        this.products = data;
        console.log('Productos cargados:', this.products);
      },
      error => console.error('Error al obtener los productos', error)
    );
  }

  loadProductDetails(id: string) {
    this.productService.getProductById(id).subscribe(
      data => {
        this.selectedProduct = data;
        this.selectedProduct.imageUrl = this.getProductImageUrl(this.selectedProduct.id);
        console.log('Producto seleccionado:', this.selectedProduct);
      },
      error => console.error('Error al obtener los detalles del producto', error)
    );
  }

  getProductImageUrl(productId: number): string {
    return `assets/images/${productId}.jpg`;
  }

  toggleNightMode() {
    this.isNightMode = !this.isNightMode;
  }

  toggleViewMode() {
    this.viewMode = this.viewMode === 'grid' ? 'table' : 'grid';
  }

  toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
  }

  filterProducts() {
    if (!this.filterCategory) {
      return this.products;
    }
    return this.products.filter(product => product.categoria === this.filterCategory);
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }

  getTranslation(key: string): string {
    const translations: { [key: string]: { es: string, en: string } } = {
      'price': { es: 'Precio', en: 'Price' },
      'category': { es: 'Categoría', en: 'Category' },
      'brand': { es: 'Marca', en: 'Brand' },
      'availability': { es: 'Disponibilidad', en: 'Availability' },
      'inStock': { es: 'En stock', en: 'In stock' },
      'outOfStock': { es: 'Agotado', en: 'Out of stock' },
      'viewDetails': { es: 'Ver detalles', en: 'View details' },
      'changeMode': { es: 'Cambiar modo', en: 'Change mode' },
      'changeView': { es: 'Cambiar vista', en: 'Change view' },
      'changeLanguage': { es: 'Cambiar idioma', en: 'Change language' },
      'allCategories': { es: 'Todas las categorías', en: 'All categories' },
      'close': { es: 'Cerrar', en: 'Close' }
    };
    return translations[key][this.language];
  }

  handleImageError(event: any) {
    event.target.src = 'assets/images/placeholder.jpg';
  }
}
