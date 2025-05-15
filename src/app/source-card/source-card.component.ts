import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Source } from '../data/interfaces/profile.interface';

@Component({
  selector: 'app-source-card',
  imports: [CommonModule],
  templateUrl: './source-card.component.html',
  styleUrl: './source-card.component.scss'
})
export class SourceCardComponent {
  @Input() source!: Source;
}
