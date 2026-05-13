import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { compile } from 'sass';

const entrada = resolve('projects/justica-layout/src/styles.scss');
const saida = resolve('dist/justica-layout/styles.css');
const destinoWebfonts = resolve('dist/justica-layout/webfonts');
const origemWebfonts = resolve('node_modules/@fortawesome/fontawesome-pro/webfonts');
const entradasFontAwesome = [
  'node_modules/@fortawesome/fontawesome-pro/css/fontawesome.css',
  'node_modules/@fortawesome/fontawesome-pro/css/regular.css',
  'node_modules/@fortawesome/fontawesome-pro/css/solid.css',
];

const resultado = compile(entrada, {
  style: 'expanded',
  sourceMap: false,
});

const estilosFontAwesome = await Promise.all(
  entradasFontAwesome.map(async (arquivo) => {
    const conteudo = await readFile(resolve(arquivo), 'utf8');

    return conteudo.replaceAll('../webfonts/', './webfonts/');
  }),
);

await mkdir(dirname(saida), { recursive: true });
await cp(origemWebfonts, destinoWebfonts, { recursive: true });
await writeFile(saida, [...estilosFontAwesome, resultado.css].join('\n\n'));
