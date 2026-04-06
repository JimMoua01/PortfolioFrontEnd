import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { ContactService } from '../../services/contact-service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-contact-form',
  imports: [FormsModule],
  templateUrl: './add-contact-form.html',
  styleUrl: './add-contact-form.css',
})
export class AddContactForm {
  @Output() contactAdded = new EventEmitter<void>();
  newContact = {
    id: 0,
    company: '',
    firstname: '',
    lastname: '',
    city: 'Wausau',
    state: 'WI',
    zip: '',
    phonenumber: '',
    email: '',
    comment: ''
  };

  constructor(private contactService: ContactService, private cdr: ChangeDetectorRef) {}

  submitContact(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.contactService.addContact(this.newContact).subscribe(() => {
      console.log(this.newContact);
      this.contactAdded.emit();

      form.resetForm({
        contactCompany: "",
        contactFirstName: "",
        contactLastName: "",
        contactCity: "Wausau",
        contactState: "WI",
        contactZip: "",
        contactPhoneNumber: "",
        contactEmail: "",
        contactComment: ""
      });

    });

    console.log("Contact Form has been submitted");
  }
}