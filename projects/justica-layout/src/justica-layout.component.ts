import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { MenuItemJustica } from './core/modelos/menu-item.model';
import { ServicoEstadoLayout } from './shared/servicos/estado-layout.service';
import { ServicoEstadoMenu } from './shared/servicos/estado-menu.service';
import { BarraLateralJusticaComponent } from './componentes/justica-barra-lateral/justica-barra-lateral.component';
import { CabecalhoJusticaComponent } from './componentes/justica-cabecalho/justica-cabecalho.component';
import { MenuJusticaComponent } from './componentes/justica-menu/justica-menu.component';
import { UsuarioJustica } from './core/modelos/usuario.model';

@Component({
  selector: 'justica-layout',
  standalone: true,
  imports: [
    CommonModule,
    CabecalhoJusticaComponent,
    MenuJusticaComponent,
    BarraLateralJusticaComponent,
  ],
  templateUrl: './justica-layout.component.html',
  styleUrl: './justica-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ServicoEstadoLayout, ServicoEstadoMenu],
})
export class JusticaLayoutComponent {
  private static readonly LARGURA_BARRA_LATERAL = 250;
  private static readonly ALTURA_BARRA_SUPERIOR = 56;
  private static readonly ALTURA_MENU = 37;

  readonly titulo = input.required<string>();
  readonly versao = input('');
  readonly usuario = input<UsuarioJustica | null>(null);
  readonly menu = input<readonly MenuItemJustica[]>([]);
  readonly barraLateralInicialmenteAberta = signal(false);

  readonly estadoLayout = inject(ServicoEstadoLayout);
  readonly larguraBarraLateralCss = computed(
    () => `${JusticaLayoutComponent.LARGURA_BARRA_LATERAL}px`,
  );
  readonly alturaBarraSuperiorCss = computed(
    () => `${JusticaLayoutComponent.ALTURA_BARRA_SUPERIOR}px`,
  );
  readonly alturaMenuCss = computed(() => `${JusticaLayoutComponent.ALTURA_MENU}px`);

  constructor() {
    effect(
      () => {
        if (this.barraLateralInicialmenteAberta()) {
          this.estadoLayout.abrirBarraLateral();
        } else {
          this.estadoLayout.fecharBarraLateral();
        }
      },
      { allowSignalWrites: true },
    );
  }
}



