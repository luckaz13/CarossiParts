# Plano de Ação Detalhado para Auditoria e Otimização Mobile - CarossiParts

**Objetivo:** Conduzir uma auditoria abrangente e implementar otimizações críticas para a experiência do usuário mobile no projeto CarossiParts, focando em performance, usabilidade (UX/UI), acessibilidade e eficiência de dados, e documentar o plano de ação no arquivo `MOBILE.md`.

**Público-alvo:** Usuários de dispositivos móveis em geral, sem dados específicos de perfil, o que exige uma abordagem de otimização ampla.

**Ferramentas de Análise:** Será necessário utilizar ferramentas de auditoria de performance como o Google Lighthouse para medir o impacto das otimizações.

---

### **1. Performance (Velocidade de Carregamento e Responsividade)**

**Diagnóstico Inicial:**
*   O `index.html` já utiliza `loading="lazy"` e `srcset`/`sizes` para algumas imagens, o que é um bom começo.
*   O Tailwind CSS é carregado via CDN, o que pode impactar o First Contentful Paint (FCP) e Largest Contentful Paint (LCP).
*   Há um vídeo (`corneta.mp4`) que pode ser grande e impactar o carregamento.

**Plano de Ação:**

*   **1.1. Otimização de Imagens e Mídia:**
    *   **Ação:** Auditar todas as imagens (`public/images/`) e vídeos (`public/videos/`) para garantir que estão otimizados para a web.
    *   **Detalhes:**
        *   **Imagens da Primeira Dobra:** Removido `loading="lazy"` e adicionado `rel="preload"` para `fundohero.jpg`, `logohero.webp` e `logoquemsomos.png` (na navegação) para carregamento prioritário.
        *   **Compressão:** **Recomendação:** Utilizar ferramentas de compressão de imagem (ex: TinyPNG, Squoosh) para reduzir o tamanho dos arquivos sem perda perceptível de qualidade.
        *   **Formatos Modernos:** **Recomendação:** Converter imagens para formatos mais eficientes como WebP (já parcialmente utilizado) e AVIF, e vídeos para formatos como WebM, oferecendo `fallback` para navegadores mais antigos.
        *   **`srcset` e `sizes`:** Revisado e confirmado que `srcset` e `sizes` estão aplicados corretamente para a maioria das imagens responsivas.
        *   **`loading="lazy"`:** Confirmado que `loading="lazy"` está aplicado a todas as imagens e vídeos que *não* estão na primeira dobra.
        *   **Vídeos:** O `corneta.mp4` já possui um atributo `poster`. **Recomendação:** Considerar a compressão do `corneta.mp4` para reduzir o tamanho do arquivo.
    *   **Métricas:** Redução do tempo de carregamento de imagens, melhoria no LCP.

*   **1.2. Otimização de CSS e JavaScript:**
    *   **Ação:** Otimizar o carregamento e o tamanho dos arquivos CSS e JavaScript.
    *   **Detalhes:**
        *   **Tailwind CSS:** **Recomendação:** Em vez de carregar via CDN, considerar a instalação local do Tailwind CSS e a purgação de CSS não utilizado para reduzir o tamanho final do arquivo CSS. Isso exigiria um ambiente de build.
        *   **Minificação:** **Recomendação:** Minificar `public/css/styles.css` e `public/js/scripts.js`. Isso exigiria um ambiente de build.
        *   **Remoção de Código Não Utilizado:** **Recomendação:** Identificar e remover estilos e scripts que não são mais necessários.
        *   **Carregamento Assíncrono/Diferido:** O `public/js/scripts.js` já é carregado no final do `<body>`. Para scripts não críticos para a renderização inicial, adicionar atributos `defer` ou `async` às tags `<script>`.
        *   **Fontes:** Otimizado o carregamento de fontes do Google Fonts com `media="print" onload="this.media='all'"`.
    *   **Métricas:** Redução do tempo de carregamento de recursos, melhoria no FCP e Time to Interactive (TTI).

*   **1.3. Cache do Navegador:**
    *   **Ação:** Implementar cabeçalhos de cache HTTP apropriados para assets estáticos.
    *   **Detalhes:** **Recomendação:** Configurar o servidor web (se aplicável, ou via `.htaccess` para Apache/Nginx) ou o serviço de hospedagem para cachear CSS, JS, imagens e fontes por um período adequado.
    *   **Métricas:** Redução do tempo de carregamento em visitas subsequentes.

**Diagrama de Fluxo - Otimização de Assets:**

```mermaid
graph TD
    A[Auditoria de Imagens/Vídeos] --> B{Compressão e Formatos Modernos};
    B --> C{Aplicação de srcset/sizes};
    C --> D{Adição de loading="lazy"};
    D --> E[Otimização de CSS/JS];
    E --> F{Purge/Minificação};
    F --> G{Carregamento Assíncrono};
    G --> H[Configuração de Cache HTTP];
    H --> I[Re-avaliação com Lighthouse];
```

---

### **2. Usabilidade (UX/UI) Mobile**

**Diagnóstico Inicial:**
*   O site já possui um menu mobile e um modal de imagens, indicando preocupação com a responsividade.
*   As microinterações e animações já estão sendo planejadas (`PLANOUX.md`, `PLANO_ANIMATIONS_UX.md`).

**Plano de Ação:**

*   **2.1. Teste de Responsividade Abrangente:**
    *   **Ação:** Testar o layout e a funcionalidade em uma variedade de tamanhos de tela e orientações (retrato/paisagem) em emuladores de navegador e, se possível, em dispositivos reais.
    *   **Detalhes:** **Recomendação:** Prestar atenção a quebras de layout inesperadas, tamanhos de fonte e espaçamento que dificultam a leitura, elementos interativos (botões, links) que são muito pequenos ou muito próximos para toque, e fluxos de usuário em telas pequenas (formulários, navegação).
    *   **Métricas:** Redução de erros de layout, aumento da taxa de conclusão de tarefas em mobile.

*   **2.2. Otimização de Elementos Interativos (Touch Targets):**
    *   **Ação:** Garantir que todos os elementos clicáveis/tocáveis tenham um tamanho mínimo adequado para toque (recomenda-se 48x48px) e espaçamento suficiente.
    *   **Detalhes:** Revisado. Os botões, links de navegação e itens da galeria já possuem tamanhos de área de toque adequados devido ao uso de classes Tailwind CSS e ajustes em media queries.

*   **2.3. Melhoria da Navegação Mobile:**
    *   **Ação:** Avaliar a usabilidade do menu mobile existente.
    *   **Detalhes:** Revisado. O menu mobile já possui transições suaves, atributos ARIA e itens de menu com padding adequado, garantindo boa usabilidade.

*   **2.4. Otimização de Formulários para Mobile:**
    *   **Ação:** Melhorar a experiência de preenchimento de formulários em dispositivos móveis.
    *   **Detalhes:** Revisado. O formulário de contato já utiliza tipos de input HTML5 apropriados (`type="tel"`, `type="email"`) e rótulos corretamente associados. O padding e o tamanho da fonte dos campos são adequados.

*   **2.5. Microinterações e Animações (Refinamento):**
    *   **Ação:** Implementar as microinterações e animações planejadas nos documentos `.md`, garantindo que sejam sutis e não intrusivas em mobile.
    *   **Detalhes:** Revisado. As animações já estão configuradas no Tailwind e as classes `will-change` são aplicadas dinamicamente no JavaScript para otimização. As transições do modal e do menu mobile são suaves.

**Diagrama de Fluxo - Otimização de Usabilidade:**

```mermaid
graph TD
    A[Teste de Responsividade] --> B{Identificação de Problemas de Layout/Toque};
    B --> C[Otimização de Touch Targets];
    C --> D[Melhoria da Navegação Mobile];
    D --> E[Otimização de Formulários];
    E --> F[Refinamento de Microinterações];
    F --> G[Teste de Usabilidade com Usuários Reais (se possível)];
```

---

### **3. Acessibilidade**

**Diagnóstico Inicial:**
*   O `index.html` já utiliza atributos `alt` para imagens e `aria-label` para botões, o que é positivo.
*   O modal e o carrossel de imagens já possuem alguma lógica de acessibilidade (trap de foco, `aria-hidden`).

**Plano de Ação:**

*   **3.1. Auditoria de Acessibilidade (WCAG):**
    *   **Ação:** Realizar uma auditoria de acessibilidade usando ferramentas como Lighthouse (seção de Acessibilidade) e extensões de navegador (ex: axe DevTools).
    *   **Detalhes:** Focar em:
        *   **Contraste de Cores:** Garantir que o contraste de texto e elementos interativos atenda aos padrões WCAG AA.
        *   **Navegação por Teclado:** Assegurar que todos os elementos interativos sejam acessíveis e operáveis via teclado (tab, enter, espaço).
        *   **Leitores de Tela:** Verificar a semântica HTML e o uso de atributos ARIA para garantir que o conteúdo seja compreendido por leitores de tela.
        *   **Estrutura de Títulos:** Garantir uma hierarquia de títulos (`<h1>` a `<h6>`) lógica e consistente.
        *   **Alternativas para Mídia:** Confirmar que imagens e vídeos possuem descrições textuais (`alt` para imagens, transcrições/legendas para vídeos).

*   **3.2. Melhoria da Semântica HTML:**
    *   **Ação:** Refinar o uso de tags HTML5 semânticas (`<header>`, `<main>`, `<section>`, `<footer>`, `<nav>`, `<aside>`, `<article>`) para melhorar a estrutura do documento para leitores de tela e SEO.
    *   **Detalhes:** Revisado. O `index.html` já utiliza tags semânticas de forma adequada, com boa hierarquia de títulos e atributos ARIA em componentes interativos.

*   **3.3. Gerenciamento de Foco:**
    *   **Ação:** Aprimorar a gestão do foco para usuários de teclado, especialmente em componentes complexos como o modal e o carrossel.
    *   **Detalhes:** Revisado. O `public/js/scripts.js` já implementa um robusto gerenciamento de foco para o modal, incluindo armazenamento do elemento focado, movimentação do foco para o modal e retorno do foco ao elemento original, além de um "trap de foco" eficaz.

*   **3.4. Preferências de Usuário (`prefers-reduced-motion`):**
    *   **Ação:** Adicionar suporte à media query `prefers-reduced-motion` para desativar ou simplificar animações para usuários que preferem menos movimento.
    *   **Detalhes:** Adicionado suporte no `public/css/styles.css` para desativar animações para usuários com `prefers-reduced-motion: reduce`.

**Diagrama de Fluxo - Otimização de Acessibilidade:**

```mermaid
graph TD
    A[Auditoria de Acessibilidade (Lighthouse/axe)] --> B{Identificação de Problemas};
    B --> C[Melhoria de Contraste/Cores];
    C --> D[Otimização de Navegação por Teclado];
    D --> E[Refinamento de Semântica HTML/ARIA];
    E --> F[Implementação de prefers-reduced-motion];
    F --> G[Teste com Leitores de Tela];
```

---

### **4. Eficiência de Dados**

**Diagnóstico Inicial:**
*   O site é estático, o que já contribui para a eficiência de dados ao evitar requisições de banco de dados.
*   As otimizações de imagem e vídeo (Seção 1.1) são cruciais para a eficiência de dados.

**Plano de Ação:**

*   **4.1. Minificação e Compressão (Gzip/Brotli):**
    *   **Ação:** Garantir que todos os arquivos de texto (HTML, CSS, JS, JSON) sejam servidos com compressão Gzip ou Brotli pelo servidor web.
    *   **Detalhes:** **Recomendação:** Isso reduz significativamente o tamanho dos arquivos transferidos pela rede e deve ser configurado no servidor web (ex: Apache, Nginx) ou serviço de hospedagem.

*   **4.2. Otimização de Requisições de Rede:**
    *   **Ação:** Minimizar o número de requisições HTTP.
    *   **Detalhes:**
        *   **Concatenação/Bundling:** O projeto já possui CSS e JS relativamente consolidados. **Recomendação:** Para projetos maiores, considerar a concatenação/bundling.
        *   **Remoção de Recursos Não Utilizados:** **Recomendação:** Eliminar quaisquer scripts, estilos ou assets que não são mais necessários.
        *   **CDNs:** **Recomendação:** Avaliar se o uso de CDNs para Tailwind e Font Awesome é a melhor estratégia para o público-alvo. Para um site pequeno e estático, pode ser mais eficiente empacotar tudo localmente se o cache do CDN não for aproveitado.

*   **4.3. Otimização de Fontes:**
    *   **Ação:** Otimizar o carregamento de fontes para reduzir o impacto no desempenho.
    *   **Detalhes:** Otimização já realizada na seção 1.2 com a adição de `media="print" onload="this.media='all'"` para o Google Fonts.

**Diagrama de Fluxo - Eficiência de Dados:**

```mermaid
graph TD
    A[Auditoria de Requisições de Rede] --> B{Habilitação de Gzip/Brotli};
    B --> C{Minificação de HTML/CSS/JS};
    C --> D{Otimização de Fontes};
    D --> E{Remoção de Recursos Inutilizados};
    E --> F[Re-avaliação com Ferramentas de Rede];