import { Component } from '@angular/core';
import { NavigationBar } from '../../components/navigation-bar/navigation-bar';

@Component({
  selector: 'app-home-page',
  imports: [NavigationBar],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {}
