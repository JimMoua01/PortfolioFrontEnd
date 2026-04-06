import { Component, ElementRef, ViewChild, Output, ChangeDetectorRef, EventEmitter } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project-service';

@Component({
  selector: 'app-add-project-form',
  imports: [FormsModule],
  templateUrl: './add-project-form.html',
  styleUrl: './add-project-form.css',
})
export class AddProjectForm {
  @Output() projectAdded = new EventEmitter<void>();
  @ViewChild('imageInput') imageInput!: ElementRef;
  newProject = {
    id: 0,
    title: '',
    description: '',
    type: 'Programming',
    link: '',
    image: ''
  };

  constructor(private projectService: ProjectService, private cdr: ChangeDetectorRef) {
  }

  submitProject(form: NgForm) {
    if (form.invalid) {
      console.log("Form could not be accepted");
      return;
    }

    this.projectService.addProject(this.newProject).subscribe(() => {
      this.projectAdded.emit();

      form.resetForm({
        projectTitle: "",
        projectDescription: "",
        projectType: "Programming",
        projectLink: ""
      });

      this.newProject.id = 0;
      this.newProject.image = "";
      this.imageInput.nativeElement.value = "";
    });

    console.log("The Project has been submitted");
  }

  async onFileSelected(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.newProject.image = await this.readFileAsDataURL(file);
    }
    else {
      this.newProject.image = "";
    }

    this.cdr.detectChanges();
  };

  readFileAsDataURL (file: File): Promise<string>  {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
    });
  };
}
