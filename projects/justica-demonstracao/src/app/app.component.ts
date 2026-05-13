import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faBookOpen,
  faCircleQuestion,
  faFilePen,
  faFileLines,
  faGear,
  faGaugeHigh,
  faMagnifyingGlass,
  faShieldHalved,
  faUsers,
} from '@fortawesome/fontawesome-pro';
import { UsuarioJustica, MenuItemJustica, JusticaLayoutComponent } from 'justica-layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JusticaLayoutComponent, FontAwesomeModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly iconeAcessoRapido = faMagnifyingGlass;

  readonly usuario: UsuarioJustica = {
    nome: 'Maria Clara Nunes',
    local: 'Treina06',
    descricaoLocal: 'Gabinete Da Ministra Maria Thereza De Assis Moura',
  };

  readonly menu: readonly MenuItemJustica[] = [
    {
      id: 'escaninho',
      rotulo: 'Escaninho',
      icone: faGaugeHigh,
      rota: '/painel',
    },
    {
      id: 'chancela',
      rotulo: 'Chancela',
      icone: faFilePen,
      rota: '/processos',
    },
    {
      id: 'documentos',
      rotulo: 'Documentos',
      icone: faFileLines,
      rota: '/relatorios',
    },
    {
      id: 'gestao',
      rotulo: 'Gestao',
      icone: faGear,
      filhos: [
        {
          id: 'usuarios',
          rotulo: 'Usuarios',
          icone: faUsers,
          acao: () => this.registrarAcao('Usuarios'),
        },
        {
          id: 'perfis',
          rotulo: 'Perfis de acesso',
          icone: faShieldHalved,
          acao: () => this.registrarAcao('Perfis de acesso'),
        },
      ],
    },
    {
      id: 'biblioteca',
      rotulo: 'Biblioteca',
      icone: faBookOpen,
      urlExterna: 'https://angular.dev',
    },
    {
      id: 'ajuda',
      rotulo: 'Ajuda',
      icone: faCircleQuestion,
      acao: () => this.registrarAcao('Ajuda'),
    },
  ];

  mensagemAcao = 'Selecione um item do menu ou navegue entre as paginas de demonstracao.';

  private registrarAcao(contexto: string): void {
    this.mensagemAcao = `Acao de demonstracao executada em: ${contexto}.`;
  }
}


