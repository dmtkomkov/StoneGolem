import { Component, OnInit } from '@angular/core';
import { StepService } from '../services/step.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'sg-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  steps: any[] = [];

  constructor(
    private stepService: StepService,
  ) { }

  ngOnInit(): void {
    this.stepService.getSteps().subscribe({
      next: (response) => {
        this.steps = response;
      }
    });
  }
}
