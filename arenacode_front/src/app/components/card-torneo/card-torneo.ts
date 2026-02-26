import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Torneo } from '../../models/torneo';

@Component({
  selector: 'app-card-torneo',
  imports: [],
  templateUrl: './card-torneo.html',
  styleUrl: './card-torneo.css',
})
export class CardTorneo {
  router = inject(Router)

  @Input() torneo!: Torneo
}