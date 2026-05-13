import { Directive, ElementRef, NgZone, OnDestroy, OnInit, inject, output } from '@angular/core';

@Directive({
  selector: '[justicaCliqueFora]',
  standalone: true,
})
export class CliqueForaDirective implements OnInit, OnDestroy {
  readonly cliqueFora = output<Event>();

  private readonly elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly ngZone = inject(NgZone);
  private removerListeners: Array<() => void> = [];

  ngOnInit(): void {
    const documento = this.elementRef.nativeElement.ownerDocument;
    if (!documento) {
      return;
    }

    const handler = (event: Event) => {
      if (!this.estaDentroDoElemento(event)) {
        this.ngZone.run(() => this.cliqueFora.emit(event));
      }
    };

    const eventos: ReadonlyArray<keyof DocumentEventMap> = ['pointerdown', 'click'];
    this.removerListeners = eventos.map((nomeEvento) => {
      documento.addEventListener(nomeEvento, handler, true);
      return () => documento.removeEventListener(nomeEvento, handler, true);
    });
  }

  ngOnDestroy(): void {
    for (const remover of this.removerListeners) {
      remover();
    }
    this.removerListeners = [];
  }

  private estaDentroDoElemento(event: Event): boolean {
    const elemento = this.elementRef.nativeElement;
    const caminho = typeof event.composedPath === 'function' ? event.composedPath() : [];
    if (caminho.length) {
      return caminho.includes(elemento);
    }

    const alvo = event.target;
    return alvo instanceof Node ? elemento.contains(alvo) : false;
  }

}
