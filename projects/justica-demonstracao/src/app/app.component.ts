import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UsuarioJustica, MenuItemJustica, JusticaLayoutComponent } from 'justica-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JusticaLayoutComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly usuario: UsuarioJustica = {
    nome: 'Maria Clara Nunes',
    local: 'Treina06',
    descricaoLocal: 'Gabinete Da Ministra Maria Thereza De Assis Moura',
  };

  readonly menu: readonly MenuItemJustica[] = [
    {
      id: 'escaninho',
      rotulo: 'Escaninho',
      icone: 'fa-regular fa-gauge-high',
      rota: '/painel',
    },
    {
      id: 'chancela',
      rotulo: 'Chancela',
      icone: 'fa-regular fa-file-pen',
      rota: '/processos',
    },
    {
      id: 'documentos',
      rotulo: 'Documentos',
      icone: 'fa-regular fa-file-lines',
      rota: '/relatorios',
    },
    {
      id: 'gestao',
      rotulo: 'Gestao',
      icone: 'fa-regular fa-gear',
      filhos: [
        {
          id: 'usuarios',
          rotulo: 'Usuarios',
          icone: 'fa-regular fa-users',
          acao: () => this.registrarAcao('Usuarios'),
        },
        {
          id: 'perfis',
          rotulo: 'Perfis de acesso',
          icone: 'fa-regular fa-shield-halved',
          acao: () => this.registrarAcao('Perfis de acesso'),
        },
      ],
    },
    {
      id: 'biblioteca',
      rotulo: 'Biblioteca',
      icone: 'fa-regular fa-book-open',
      urlExterna: 'https://angular.dev',
    },
    {
      id: 'ajuda',
      rotulo: 'Ajuda',
      icone: 'fa-regular fa-circle-question',
      acao: () => this.registrarAcao('Ajuda'),
    },
  ];

  mensagemAcao = 'Selecione um item do menu ou navegue entre as paginas de demonstracao.';

  private registrarAcao(contexto: string): void {
    this.mensagemAcao = `Acao de demonstracao executada em: ${contexto}.`;
  }
}


