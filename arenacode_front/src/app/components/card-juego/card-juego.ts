import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-juego',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-juego.html',
  styleUrls: ['./card-juego.css']
})
export class CardJuegoComponent {
  @Input() juego: any;
}
