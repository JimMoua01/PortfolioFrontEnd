import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  
  // api = "http://localhost:3000";
  // api = "https://portfolioprojectbackend.onrender.com";
  // api = "https://localhost:7293/api/portfolio";
  api = "https://portfoliobackendapi-mgz0.onrender.com/api/portfolio"

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${this.api}/contactData`);
  }

  addContact(contact: Contact) {
    return this.http.post(`${this.api}/contactData`, contact);
  }
}
