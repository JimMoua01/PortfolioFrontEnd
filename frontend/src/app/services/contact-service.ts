import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contactList = new BehaviorSubject<Contact[]>([]);
  contacts$ = this.contactList.asObservable();


  // api = "http://localhost:3000";
  // api = "https://portfolioprojectbackend.onrender.com";
  // api = "https://localhost:7293/api/portfolio";
  api = "https://portfoliobackendapi-mgz0.onrender.com/api/portfolio"

  constructor(private http: HttpClient) {
    this.loadContact();
  }

  loadContact() {
    this.http.get<Contact[]>(`${this.api}/contactData`).subscribe(data => {
      this.contactList.next(data.sort((a, b) => a.id - b.id));
    });
  }

  addContact(contact: Contact) {
    this.http.post(`${this.api}/contactData`, contact).subscribe(() => {
      this.loadContact();
    });
  }
}
