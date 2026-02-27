import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Torneo } from '../../models/torneo';

@Component({
  selector: 'app-card-torneo',
  imports: [],
  templateUrl: './card-torneo.html',
  styleUrl: './card-torneo.css',
})
export class CardTorneo {
  router = inject(Router)
  http = inject(HttpClient)

  @Input() torneo!: Torneo

  inscribirse() {
    this.http.post(`http://localhost:3000/torneos/${this.torneo.id}/inscribir`, { usuario_id: 1 })
      .subscribe({
        next: () => alert('¡Inscripción exitosa!'),
        error: (err) => alert(err.error.message)
      })
  }
}