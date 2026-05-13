import { CommonModule, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';

import { MenuItemJustica } from '../../../core/modelos/menu-item.model';
import { CliqueForaDirective } from '../../../shared/diretivas/clique-fora.directive';

@Component({
  selector: 'justica-submenu',
  standalone: true,
  imports: [CommonModule, NgTemplateOutlet, CliqueForaDirective],
  templateUrl: './justica-submenu.component.html',
  styleUrl: './justica-submenu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmenuJusticaComponent {
  readonly itens = input<readonly MenuItemJustica[]>([]);
  readonly nivel = input(0);

  readonly itemSelecionado = output<MenuItemJustica>();
  readonly fechar = output<void>();
  private readonly idsAbertosInterno = signal<readonly string[]>([]);

  @ViewChild('listaRecursiva', { static: true })
  listaRecursivaRef!: TemplateRef<{
    $implicit: readonly MenuItemJustica[];
    nivelAtual: number;
    caminhoAtual: readonly string[];
  }>;

  selecionar(item: MenuItemJustica, caminhoAtual: readonly string[]): void {
    if (item.desabilitado) {
      return;
    }

    if (item.filhos?.length) {
      if (this.estaAberto(item.id)) {
        this.idsAbertosInterno.set(caminhoAtual);
        return;
      }

      this.idsAbertosInterno.set(this.proximoCaminho(caminhoAtual, item.id));
      return;
    }

    item.acao?.();
    this.itemSelecionado.emit(item);
  }

  estaAberto(id: string): boolean {
    return this.idsAbertosInterno().includes(id);
  }

  caminhoInicial(): readonly string[] {
    return [];
  }

  proximoCaminho(caminhoAtual: readonly string[] | null | undefined, id: string | null | undefined): readonly string[] {
    if (!id) {
      return caminhoAtual ?? [];
    }

    return [...(caminhoAtual ?? []), id];
  }

  solicitarFechamento(): void {
    this.idsAbertosInterno.set([]);
    this.fechar.emit();
  }
}


