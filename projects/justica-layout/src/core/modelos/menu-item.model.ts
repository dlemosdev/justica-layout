export interface MenuItemJustica {
  id: string;
  rotulo: string;
  icone?: string;
  rota?: string;
  urlExterna?: string;
  desabilitado?: boolean;
  expandido?: boolean;
  filhos?: readonly MenuItemJustica[];
  acao?: () => void;
  permissao?: string;
  rotuloAria?: string;
  identificadorTeste?: string;
  dados?: Readonly<Record<string, unknown>>;
}
