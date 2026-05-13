import { Injectable, signal } from '@angular/core';

@Injectable()
export class ServicoEstadoLayout {
  readonly barraLateralAberta = signal(true);

  alternarBarraLateral(): void {
    this.barraLateralAberta.update((aberta) => !aberta);
  }

  abrirBarraLateral(): void {
    this.barraLateralAberta.set(true);
  }

  fecharBarraLateral(): void {
    this.barraLateralAberta.set(false);
  }
}
