import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { artist_category_model, changePassword_model, subscription_model } from '../models';
import { product_model } from 'src/app/models';
import { environment } from 'environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // All User Counts
  getUsersCount(): Observable<any> {
    return this.http.get<any>(`${this.url}/userCount/`);
  }

  //User List API
  getUsersDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/usersList/`);

  }
  //User Detail API
  getUsersById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/userDetails/${id}`);

  }
  //artist List API
  getArtistDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/artistsList/`);

  }
  //organizer List API
  getOrganizerDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/organizersList/`);

  }

  // Subsription apis
  //Artist subscription Details API
  getArtistSubscriptionDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/artistSubscription/`);

  }
  //Organizer subscription Details API
  getOrganizerSubscriptionDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/organizerSubscriptions/`);

  }
  //User subscription Details API
  getUserSubscriptionDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/userSubscriptions/`);

  }
  getSubscriptionById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/subscriptionDetails/${id}`);

  }
  createSubscription(data: any): Observable<any> {
    return this.http.post<subscription_model>(`${this.url}/createSubscription/`, data);

  }
  deleteSubscription(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteSubscription/${id}`);

  }
  updateSubscription(id: number, subscriptiondata: subscription_model): Observable<any> {
    return this.http.put<subscription_model>(`${this.url}/updateSubscription/${id}/`, subscriptiondata);

  }


  //Products Details API
  getProductsDetails(): Observable<any> {
    return this.http.get<any>(`${this.url}/allProducts/`);
  }
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/productDetails/${id}/`);

  }
  ProductsPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createProduct/`, data);
  }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteProduct/${id}`);
  }
  updateProduct(productdata: any, id: number) {
    return this.http.put<any>(`${this.url}/updateProduct/${id}/`, productdata);
  }
  // product images api
  ProductsPostimage(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/addProductPhoto/`, data);
  }


  // Transaction Apis
  // artist transaction api
  artistTransactionPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createAtransaction/`, data);
  }
  // organizer transaction api
  organizerTransactionPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createOtransaction/`, data);
  }
  // user transaction api
  userTransactionPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createUtransaction/`, data);
  }

  //Carousal settings
  getAllcarousals(): Observable<any> {
    return this.http.get<any>(`${this.url}/getCarouselImages/`);
  }

  postImage(imageData: any): Observable<any> {
    return this.http.post<any>(`${this.url}/addCarouselImages/`, imageData);
  }

  // Category Edit apis
  // artist Category list
  getAllArtistCategories(): Observable<any> {
    return this.http.get<any>(`${this.url}/allAcategories/`)
  }

  getArtistCategoriesById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/acategoryDetails/${id}`)
  }

  postArtistCategories(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createAcategory/`, data)
  }

  updateArtistCategories(id: number, model: artist_category_model) {
    return this.http.put<artist_category_model>(`${this.url}/updateAcategory/${id}/`, model)
  }

  deleteArtistCategoriesById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteAcategory/${id}`)
  }

  // Organizer Category list
  getAllOrganizerCategories(): Observable<any> {
    return this.http.get<any>(`${this.url}/allBcategory/`)
  }

  getOrganizerCategoriesById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/bcategoryDetails/${id}`)
  }

  postOrganizerCategories(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/createBcategory/`, data)
  }

  updateOrganizerCategories(id: number, model: artist_category_model) {
    return this.http.put<artist_category_model>(`${this.url}/updateBcategory/${id}/`, model)
  }

  deleteOrganizerCategoriesById(id: number): Observable<any> {
    return this.http.delete<any>(`${this.url}/deleteBcategory/${id}`)
  }

  // Subscription status
  // artist status
  getArtistSubscriptionStatus(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/subscriptionforArtist/${id}`)
  }

  // Admin Change password api
  getAdminDataById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/adminDetails/${id}`)
  }
  updatePassword(id: number, data: any): Observable<any> {

    return this.http.put<changePassword_model>(`${this.url}/updateAdmin/${id}`, data)
  }

  // subscription ending soon api
  // artist subscription
  artistSubsEnd(): Observable<any> {
    return this.http.get<any>(`${this.url}/aSubsEndingSoon/`)
  }
  // artist subscription
  userSubsEnd(): Observable<any> {
    return this.http.get<any>(`${this.url}/uSubsEndingSoon/`)
  }
  // artist subscription
  organizerSubEnd(): Observable<any> {
    return this.http.get<any>(`${this.url}/oSubsEndingSoon/`)
  }

}
