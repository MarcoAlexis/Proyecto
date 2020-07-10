import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';

//services
import {ProductService } from '../../../services/product.service';
import { ToastrService} from 'ngx-toastr';
//product class
import { Product } from '../../../models/product';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(
    public productService: ProductService,
    private toast:ToastrService
    ) { }

  ngOnInit(): void {
    this.productService.getProducts();
    this.resetForm();
  }

  onSubmit(productForm:NgForm)
  {
    if(productForm.value.$key==null)
    this.productService.insertProduct(productForm.value),
    this.toast.success ('OPERACION EXITOSA','SE HA AGREGADO EL PRODUCTO');
    else 
    this.productService.updateProduct(productForm.value),
    this.toast.success ('OPERACION EXITOSA','SE HA MODIFICADO EL PRODUCTO');

    this.resetForm(productForm);

  }

  resetForm(productForm? : NgForm)
  {
    if(productForm!= null)
    productForm.reset();
    this.productService.selectedProduct=new Product();
  }
}
