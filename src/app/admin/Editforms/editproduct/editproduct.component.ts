import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; // Import ActivatedRoute to get route parameters
import { product_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.scss']
})
export class EditproductComponent implements OnInit {

  productForm!:FormGroup;
  product_model:product_model=new product_model();
  productId!: number; // Variable to store the ID of the product to be edited

  showsubmit!:boolean;
  showupdate!:boolean;
  showdelete!:boolean;
  productimageData: File | null | undefined;

  constructor(private service:ServiceService, private fb:FormBuilder, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){}

  ngOnInit(): void {
    this.productForm=this.fb.group({
      id:[''],
      productsname:[''],
      brand:[''],
      price:[''],
      productImage:['']
    })
    // Get the ID of the product from the route parameters
    this.route.params.subscribe(val => {
      this.productId = val['id']; // Assuming the parameter name is 'id'
      // Fetch the product details using the ID and populate the form
      this.service.getProductById(this.productId).subscribe({
        next:(res)=>{
          this.onedit(res.product_details);
          console.log('Product Details:', res.product_details);
        },error:(err)=>{
          console.log(err)
        }
      });
      // return this.productId;
    }); 

    this.productForm.reset()
    this.showsubmit=true;
    this.showupdate=false;
    this.showdelete=false;
  }
  
  onedit(product:product_model){
    this.showsubmit=false;
    this.showupdate=true;
    this.showdelete=true;
    this.productForm.setValue({
      id:product.pid,
      productsname:product.pmodel,
      brand:product.pbrand,
      price:product.pprice,
      productImage:product.pimages
    })
    

  }
  // for event image
  onImageSelected(event: any) {

    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.productimageData = fileList[0];
      console.log('Selected image:', this.productimageData);
    } else {
      this.productimageData = null; // Reset file if no file is selected
    }

  }

  postproducts(){
    const productData = {
    pbrand:this.productForm.value.brand,
    pmodel:this.productForm.value.productsname,
    pprice:this.productForm.value.price,
    // pimages:this.productForm.value.productImage,
    pimages : this.productimageData
  };
  console.log("Before submitting the data is",productData);
  // let formData2 = new FormData();
  const formData: FormData = new FormData();
  for (const [key, value] of Object.entries(productData)) {
    console.log(key,value);
    
    formData.append(key,value)
  }
    this.service.ProductsPost(formData).subscribe(res=>{
      // alert('Successful Created')
      this.toastr.success('Product added Successful!', 'Success');
      this.productForm.reset();
      this.router.navigate(['/products'])
      console.log(res)
    
    })
  }

  deleteProduct(): void {
    this.service.deleteProduct(this.productId).subscribe(
      () => {
        // console.log('Product deleted successfully');
        this.toastr.success('Product deleted successfully!', 'Success');
        // Redirect the user to a different page after successful deletion
        this.router.navigate(['/products']);
      },
      error => {
        console.error('Error deleting product:', error);
      }
    );
  }

  updateproduct(){
    const productData = {
      pbrand:this.productForm.value.brand,
      pmodel:this.productForm.value.productsname,
      pprice:this.productForm.value.price,
      // pimages:this.productForm.value.productImage,
      pimages : this.productimageData
    };
    console.log("Before submitting the data is",productData);
    // let formData2 = new FormData();
    const formData: FormData = new FormData();
    for (const [key, value] of Object.entries(productData)) {
      console.log(key,value);
      
      formData.append(key,value)
    }

    this.service.updateProduct(formData, this.productId).subscribe(res=>{
      console.log(res)
      this.toastr.success('Product Updated successfully!', 'Success');
      // alert('updated')
      this.productForm.reset();
      this.router.navigate(['/home/products'])
    })

  }
  
  // file: File | null =null
  // // for product image
  // onImageSelected(event: any) {
  //   // this.file  = event.target.files[0] as File;
  //   // if (file) {
  //   //   this.ImageconvertToBase64(file);
  //   // }
  //   const fileList: FileList = event.target.files;
  // if (fileList.length > 0) {
  //   this.file = fileList[0];
  // } else {
  //   this.file = null; // Reset file if no file is selected
  // }

  // }

  // ImageconvertToBase64(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     if (event.target && typeof event.target.result === 'string') {
  //       this.profileimageData = event.target.result.split(',')[1]; // Extract base64 data after comma
  //     }
  //   };
  //   reader.readAsDataURL(file);
  // }

  // postImage() {
  //   if (!this.file) {
  //     console.error('No image data available.');
  //     return;
  //   }
    
  //   // const imageData: any = {
  //   //   productid: this.productId,
  //   //   photo: this.file
  //   // };
  //   const formData: FormData = new FormData();
  //   formData.append('productid', this.productId.toString());
  //   formData.append('photo', this.file);
  
    
  //   // Post imageData object containing image data to the server
  //   this.service.ProductsPostimage(formData).subscribe(
  //     (response => {
  //       console.log('Image uploaded successfully:', response);
  //       this.toastr.success('Image uploaded successfully!', 'Success');
  //       // Handle response as needed
  //     }),
  //     (error => {
  //       console.error('Error uploading image:', error);
  //     })
  //   );
  // }

}
