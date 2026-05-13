import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { LOGO_BASE64 } from '../../shared/constants/imagens-layout';

@Component({
  selector: 'justica-cabecalho',
  standalone: true,
  templateUrl: './justica-cabecalho.component.html',
  styleUrl: './justica-cabecalho.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CabecalhoJusticaComponent {
  private static readonly FORMATADOR_RELOGIO = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  readonly titulo = input.required<string>();
  readonly versao = input('');
  readonly barraLateralAberta = input(false);

  readonly alternarBarraLateral = output<void>();
  readonly acaoCabecalho = output<'notificacoes' | 'alertas' | 'sair'>();
  readonly dataHoraAtual = signal(this.formatarDataHoraAtual());
  readonly relogioCabecalho = computed(() => `Em Brasilia: ${this.dataHoraAtual()}`);
  readonly logo = computed(() => `data:image/png;base64,${LOGO_BASE64.trim()}`);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    const intervaloRelogio = setInterval(() => {
      this.dataHoraAtual.set(this.formatarDataHoraAtual());
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(intervaloRelogio));
  }

  emitirAlternanciaBarraLateral(): void {
    this.alternarBarraLateral.emit();
  }

  emitirAcaoCabecalho(acao: 'notificacoes' | 'alertas' | 'sair'): void {
    this.acaoCabecalho.emit(acao);
  }

  private formatarDataHoraAtual(): string {
    return CabecalhoJusticaComponent.FORMATADOR_RELOGIO.format(new Date()).replace(',', '');
  }
}


