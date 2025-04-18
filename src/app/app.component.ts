import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlowbiteService } from './core/services/flowbite/flowbite.service';
import { HomeComponent } from "./pages/home/home.component";
import { NgxSpinnerComponent } from 'ngx-spinner';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(
    private flowbiteService: FlowbiteService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.flowbiteService.loadFlowbite(flowbite => {
          console.log('Flowbite loaded', flowbite);
        });
      }, 0);
    }
  }
  
}
