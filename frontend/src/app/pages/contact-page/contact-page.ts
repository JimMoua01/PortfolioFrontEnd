import { Component } from '@angular/core';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';
import { AddContactForm } from '../../components/add-contact-form/add-contact-form';
import { Observable } from 'rxjs';
import { Contact } from '../../models/contact';
import { ContactService } from '../../services/contact-service';

@Component({
  selector: 'app-contact-page',
  imports: [NavigationBar, AddContactForm],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  contacts$!: Observable<Contact[]>;
  
  constructor(private contactService: ContactService) {
    this.contacts$ = this.contactService.getContacts();
  };

  reloadContacts() {
    this.contacts$ = this.contactService.getContacts();
  };
}
