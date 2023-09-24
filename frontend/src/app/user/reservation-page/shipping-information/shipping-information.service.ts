import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';
import { Shipping } from '../../interfaces/shipping.interface';

const BACKEND_URL = environment.BASE_URL + '/user';

@Injectable({
  providedIn: 'root',
})
export class ShippingInformationService {
  constructor(private httpClient: HttpClient) {}

  onSubmit(shipping: Shipping, ticket: any, user: any) {
    return this.httpClient
      .post<any>(
        `${BACKEND_URL}/shipping`,
        { ...shipping, ticket, user },
        {
          withCredentials: true,
        }
      )
      .pipe(
        tap(() => {
          // inform the observers that the user's account information are now available
          // inform observers about account info availability
          // this.accountService.onUpdateAccount();
        })
      )
      .pipe(
        map((shippingData) => {
          return shippingData;
        })
      );
  }
}
