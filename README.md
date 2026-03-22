# Teclado Yiddish — transliteração

Aplicação web estática para escrever em **Yiddish** com o alfabeto hebraico (ortografia Yiddish) e obter **transliteração** para o alfabeto latino. A interface está em português.

## O que o projeto faz

- **Teclado virtual**: botões inserem letras, ligaduras e combinações usuais no Yiddish (por exemplo אַ, אָ, פּ, פֿ, טש, וו) diretamente na área de texto, respeitando a posição do cursor.
- **Digitação em latim → hebraico**: ao digitar no campo de texto, a função `transcrire()` (em `Script/script.js`) converte sequências de teclas latinas em caracteres hebraicos em tempo real (estilo inspirado em ferramentas Lexilogos).
- **Transliteração hebraico/Yiddish → latim**: o botão **Transcrever** chama `transliterar()` (em `Script/Transcribir.js`), que acrescenta ao final do texto a transliteração entre parênteses, segundo regras de ortografia iídiche e um dicionário de exceções (ex.: שלום → sholem).
- **Copiar**: usa a biblioteca **Clipboard.js** (incluída no final de `Script/script.js`) e a inicialização em `Script/copy.js`.
- **Apagar**: limpa o conteúdo do campo de texto.

## Estrutura de pastas

| Caminho | Função |
|--------|--------|
| `index.html` | Página principal, formulário, teclado e carregamento dos scripts |
| `Style/style.css` | Estilos da interface |
| `Script/script.js` | Inserção de caracteres (`alpha`), conversão latim→hebraico (`transcrire`), Google Analytics, utilitário `save()` para download como `.txt`, bundle Clipboard |
| `Script/Transcribir.js` | `limparTexto`, `transliterar` e motor `transliterarTextoIidiche` |
| `Script/copy.js` | Liga o botão **Copiar** ao Clipboard |

Opcionalmente, o HTML referencia `Imagem/ki.png` para um banner; se a pasta `Imagem` não existir, essa imagem não será exibida até você adicionar o ficheiro.

## Requisitos e execução

Não há `package.json` nem passo de compilação: é **HTML, CSS e JavaScript** puro.

1. Abra `index.html` num navegador moderno (Chrome, Firefox, Edge, etc.).
2. Para evitar limitações de `file://` com alguns recursos, pode servir a pasta com um servidor HTTP local (por exemplo `npx serve .` ou a extensão “Live Server” do VS Code).

**JavaScript tem de estar ativado** (a página avisa com `<noscript>` se estiver desligado).

## Notas técnicas

- O texto do teclado segue direção **RTL** (classe `rtl` no HTML).
- `index.html` aponta `favicon` e RSS para caminhos relativos à pasta **pai** (`../favicon.ico`, `../rss.xml`), herdados do contexto Lexilogos; numa cópia autónoma pode ajustar ou remover essas linhas.
- O rastreamento **Google Analytics** (`UA-122422-1`) está presente em `script.js`; remova ou substitua se não quiser telemetria.

## Licença e origem

O código mistura componentes típicos de páginas Lexilogos (conversão, estilo de teclado) com lógica própria de transliteração Yiddish em `Transcribir.js`. Confirme licenças e atribuições se for redistribuir ou integrar em outro sistema.

## Próximos passos (importante)

O sistema ainda vai ser validado por um especialista em yiddish, ainda está em validação.
