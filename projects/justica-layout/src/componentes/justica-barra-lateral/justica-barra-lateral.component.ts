import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IMG_PROFILE } from '../../shared/constants/imagens-layout';
import { UsuarioJustica } from '../../core/modelos/usuario.model';

@Component({
  selector: 'justica-barra-lateral',
  standalone: true,
  templateUrl: './justica-barra-lateral.component.html',
  styleUrl: './justica-barra-lateral.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarraLateralJusticaComponent {
  readonly usuario = input<UsuarioJustica | null>(null);
  readonly aberta = input(false);
  readonly imagemFundo = computed(
    () => `url("data:image/png;base64,${IMG_PROFILE}")`,
  );
}


