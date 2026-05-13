import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { MenuItemJustica } from '../../../core/modelos/menu-item.model';

@Component({
  selector: 'justica-menu-item',
  standalone: true,
  imports: [CommonModule, RouterLink, FontAwesomeModule],
  templateUrl: './justica-menu-item.component.html',
  styleUrl: './justica-menu-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemJusticaComponent {
  readonly item = input.required<MenuItemJustica>();
  readonly ativo = input(false);
  readonly expandido = input(false);
  readonly orientacao = input<'horizontal' | 'vertical'>('horizontal');

  readonly acionar = output<MenuItemJustica>();
  readonly apontar = output<MenuItemJustica>();

  readonly possuiFilhos = () => !!this.item().filhos?.length;

  emitirAcao(): void {
    if (!this.item().desabilitado) {
      this.acionar.emit(this.item());
    }
  }

  emitirApontamento(): void {
    if (!this.item().desabilitado) {
      this.apontar.emit(this.item());
    }
  }
}
