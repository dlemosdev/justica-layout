import { spawn, spawnSync } from 'node:child_process';

const compilacaoInicial = spawnSync('npm run build:lib', {
  stdio: 'inherit',
  shell: true,
});

if (compilacaoInicial.status !== 0) {
  process.exit(compilacaoInicial.status ?? 1);
}

const observadorLayout = spawn('npm run watch:justica-layout', {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
});

const processosFilhos = [observadorLayout];
let encerrando = false;
let demonstracaoIniciada = false;
let servidorDemonstracao = null;

const iniciarServidorDemonstracao = () => {
  if (demonstracaoIniciada) return;
  demonstracaoIniciada = true;

  servidorDemonstracao = spawn('npm run serve:demonstracao', {
    stdio: 'inherit',
    shell: true,
  });

  processosFilhos.push(servidorDemonstracao);
  servidorDemonstracao.on('exit', (codigo) => {
    if (!encerrando && codigo && codigo !== 0) encerrar(codigo);
  });
};

const encerrar = (codigo = 0) => {
  if (encerrando) return;
  encerrando = true;

  for (const processo of processosFilhos) {
    if (!processo.killed) processo.kill('SIGTERM');
  }

  setTimeout(() => process.exit(codigo), 300);
};

const padraoLayoutCompilado = /(Built Angular Package|Built justica-layout)/;

observadorLayout.stdout?.on('data', (trecho) => {
  const texto = trecho.toString();
  process.stdout.write(texto);
  if (padraoLayoutCompilado.test(texto)) {
    iniciarServidorDemonstracao();
  }
});

observadorLayout.stderr?.on('data', (trecho) => {
  process.stderr.write(trecho.toString());
});

observadorLayout.on('exit', (codigo) => {
  if (!encerrando && codigo && codigo !== 0) encerrar(codigo);
});

process.on('SIGINT', () => encerrar(0));
process.on('SIGTERM', () => encerrar(0));
