import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'nao-autorizado',
    title: 'Não Autorizado',
    loadComponent: () =>
      import('justica-layout').then((componente) => componente.JusticaNaoAutorizadoComponent),
  },
  {
    path: 'erro-interno',
    title: 'Erro Interno',
    loadComponent: () =>
      import('justica-layout').then((componente) => componente.JusticaoErroInternoComponent),
  },
  {
    path: 'pagina-nao-encontrada',
    title: 'Página Não Encontrada',
    loadComponent: () =>
      import('justica-layout').then((componente) => componente.JusticaNaoEncontradaComponent),
  },
  {
    path: '**',
    redirectTo: 'pagina-nao-encontrada',
  },
];
