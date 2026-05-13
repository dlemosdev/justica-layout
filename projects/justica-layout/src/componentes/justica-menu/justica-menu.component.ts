import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, output } from '@angular/core';

import { MenuItemJustica } from '../../core/modelos/menu-item.model';
import { CliqueForaDirective } from '../../shared/diretivas/clique-fora.directive';
import { ServicoEstadoMenu } from '../../shared/servicos/estado-menu.service';
import { MenuItemJusticaComponent } from './justica-menu-item/justica-menu-item.component';
import { SubmenuJusticaComponent } from './justica-submenu/justica-submenu.component';

@Component({
  selector: 'justica-menu',
  standalone: true,
  imports: [CommonModule, CliqueForaDirective, MenuItemJusticaComponent, SubmenuJusticaComponent],
  templateUrl: './justica-menu.component.html',
  styleUrl: './justica-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuJusticaComponent {
  readonly menu = input<readonly MenuItemJustica[]>([]);
  readonly itemSelecionado = output<MenuItemJustica>();

  readonly estadoMenu = inject(ServicoEstadoMenu);

  selecionarItem(item: MenuItemJustica): void {
    if (item.filhos?.length) {
      this.estadoMenu.alternarRaiz(item);
      return;
    }

    item.acao?.();
    this.estadoMenu.fecharTudo();
    this.itemSelecionado.emit(item);
  }
}



