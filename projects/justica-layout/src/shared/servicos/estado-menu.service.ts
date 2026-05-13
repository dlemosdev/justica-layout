import { Injectable, signal } from '@angular/core';

import { MenuItemJustica } from '../../core/modelos/menu-item.model';

@Injectable()
export class ServicoEstadoMenu {
  private readonly idsAbertosInterno = signal<readonly string[]>([]);

  estaAberto(id: string): boolean {
    return this.idsAbertosInterno().includes(id);
  }

  alternarRaiz(item: MenuItemJustica): void {
    if (this.estaAberto(item.id)) {
      this.fecharTudo();
      return;
    }

    this.idsAbertosInterno.set([item.id]);
  }

  fecharTudo(): void {
    this.idsAbertosInterno.set([]);
  }
}
