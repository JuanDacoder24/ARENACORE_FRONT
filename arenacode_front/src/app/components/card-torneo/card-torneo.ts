import { Component, Input } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-torneo',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './card-torneo.html',
  styleUrls: ['./card-torneo.css']
})
export class CardTorneoComponent {
  @Input() torneo: any;
}
