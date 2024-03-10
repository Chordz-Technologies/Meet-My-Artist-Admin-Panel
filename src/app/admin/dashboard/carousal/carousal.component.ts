import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { carousel_model } from 'src/app/models';
import { ServiceService } from 'src/app/shared/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-carousal',
  templateUrl: './carousal.component.html',
  styleUrls: ['./carousal.component.scss']
})
export class CarousalComponent implements OnInit {
  carouselForm!: FormGroup;
  
  base64Images: string[] = [];
  model: carousel_model = new carousel_model();
  
  
  imageFields: Array<keyof carousel_model> = ['image1', 'image2', 'image3', 'image4', 'image5'];
  images: any[] = [];

  

  constructor(private service: ServiceService, private router: Router, private fb: FormBuilder, public sanitizer: DomSanitizer,private toastr: ToastrService) { }
  ngOnInit(): void {
    this.carouselForm = this.fb.group({
      
    })
    
    this.fetchData();
  }

  
  onFileSelected(event: any, field: keyof carousel_model) {
    const file = event.target.files[0];
    this.convertToBase64(file, field);
  }


  
  convertToBase64(file: File, field: keyof carousel_model) {
    const reader = new FileReader();
    reader.onload = () => {
      let imgBase64 = reader.result as string;
      let commaIndex = imgBase64.indexOf(',');

      // Extract the substring starting from the index after the comma
      let cleanedString = imgBase64.substring(commaIndex + 1);
      this.model[field] = cleanedString;

    };
    reader.readAsDataURL(file);
  }

  

  postImages() {
    for (let key in this.model) {

      if (this.model.hasOwnProperty(key)) {
        if (this.model[key] === null) {
          delete this.model[key]; // Remove key with null value
        }
      }
    }
    this.service.postImage(this.model).subscribe(
      (response => {
        console.log('Images uploaded successfully:', response);
        this.toastr.success('Images uploaded successfully!', 'Success');
        if (response && response.status === 'success') {
          console.log('File paths:', response.saved_file_paths);
          if (response.saved_file_paths && Object.keys(response.saved_file_paths).length > 0) {
            // Do something with the file paths object
          } else {
            console.log('No file paths returned from the server.');
          }
        } else {
          console.error('Server returned an error:', response.message);
        }
      }),
      (error => {
        console.error('Error uploading images:', error);
      })
    );
  }

  
  fetchData() {
    this.service.getAllcarousals().subscribe(res => {
      // Convert the object into an array of objects
      this.images = Object.keys(res.base64images).map(key => ({ src: key, data: res.base64images[key] }));
    });
  }

  
}
