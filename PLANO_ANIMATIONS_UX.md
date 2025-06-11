# Plano de Implementação de Animações e Transições CSS

**Objetivo:** Implementar animações e transições CSS otimizadas para uma experiência de usuário (UX) mais fluida e envolvente, focando na suavidade visual e feedback imediato em elementos interativos e transições de estado. Utilizar Tailwind CSS para classes utilitárias e CSS puro para animações complexas, garantindo alta performance e ausência de jank.

**Estratégia Geral:**
1.  **Tailwind CSS para Transições Simples:** Utilizar as classes de transição e transformação do Tailwind para efeitos de `hover` e `focus` em botões e links.
2.  **CSS Puro para Animações Complexas:** Definir `@keyframes` e classes CSS personalizadas para animações mais elaboradas, como `fade-in` da logo, `fade-in` do menu mobile e `slide-up/down` do modal.
3.  **Otimização de Performance:** Priorizar propriedades CSS que não causam reflow ou repaint (e.g., `transform`, `opacity`) e utilizar `will-change` quando apropriado.
4.  **Acessibilidade:** Garantir que as animações não prejudiquem a acessibilidade, oferecendo alternativas ou respeitando preferências de movimento reduzido.

## Detalhes do Plano:

### 1. Configuração do Tailwind CSS e Definição de Keyframes

*   **Ação:** Adicionar a configuração de `keyframes` e `animation` no script de configuração do Tailwind CSS no `index.html` para a animação `fade-in` da logo.
*   **Justificativa:** Centralizar a definição de animações complexas no Tailwind para facilitar a manutenção e reutilização.
*   **Arquivos Envolvidos:** [`index.html`](index.html)

### 2. Animações para Botões e Links (Interativos)

*   **Ação:** Aplicar transições com `translate` e `rotate` nos elementos `<a>` e `<button>` interativos.
*   **Detalhes:**
    *   Adicionar classes Tailwind como `transition`, `duration-300`, `ease-in-out` para suavidade.
    *   No `hover` e `focus`, aplicar `transform` com `translate-y` (para um leve movimento vertical) e `rotate` (para um giro sutil).
    *   Exemplos de elementos: links de navegação, botões da seção Hero, botões de contato, botões das lojas.
*   **Justificativa:** Proporcionar feedback visual vibrante e imediato, conforme solicitado.
*   **Arquivos Envolvidos:** [`index.html`](index.html)

### 3. Transição do Menu Mobile (`fade-in`)

*   **Ação:** Modificar a lógica de exibição do menu mobile para usar uma transição `fade-in` em vez de apenas `hidden`.
*   **Detalhes:**
    *   No `public/css/styles.css`, criar classes para `fade-in` e `fade-out` que controlam a opacidade.
    *   No `public/js/scripts.js`, ajustar a função de toggle para adicionar/remover essas classes, e usar `setTimeout` para gerenciar a remoção da classe `hidden` após a transição de `fade-out`.
*   **Justificativa:** Proporcionar uma transição mais suave e visualmente agradável para a abertura e fechamento do menu.
*   **Arquivos Envolvidos:** [`public/css/styles.css`](public/css/styles.css), [`public/js/scripts.js`](public/js/scripts.js), [`index.html`](index.html)

### 4. Transição do Modal de Imagens (`slide-up/down`)

*   **Ação:** Implementar transições `slide-up` na abertura e `slide-down` no fechamento do modal de imagens.
*   **Detalhes:**
    *   No `public/css/styles.css`, definir `@keyframes` para `slide-in-up` e `slide-out-down` que alteram a propriedade `transform: translateY()`.
    *   Ajustar a função `openModal` e `closeModal` no `public/js/scripts.js` para adicionar/remover as classes de animação e gerenciar a propriedade `display` após a conclusão da animação.
*   **Justificativa:** Criar uma experiência mais dinâmica e envolvente ao visualizar as imagens em destaque.
*   **Arquivos Envolvidos:** [`public/css/styles.css`](public/css/styles.css), [`public/js/scripts.js`](public/js/scripts.js)

### 5. Animação da Logo no Hero (`animate-fade-in`)

*   **Ação:** Definir os `@keyframes` para a animação `animate-fade-in` no script de configuração do Tailwind no `index.html`.
*   **Detalhes:** A animação deve fazer a logo aparecer suavemente, aumentando a opacidade de 0 para 1.
*   **Justificativa:** Manter a animação existente e garantir que ela seja definida corretamente.
*   **Arquivos Envolvidos:** [`index.html`](index.html)

### 6. Otimizações de Performance e Acessibilidade

*   **Ação:** Revisar todas as animações para garantir o uso de `transform` e `opacity` sempre que possível.
*   **Detalhes:**
    *   Adicionar `will-change: transform, opacity;` a elementos que serão animados para otimizar o desempenho do navegador.
    *   Considerar a adição de uma opção para desativar animações para usuários com preferências de movimento reduzido (embora não seja uma prioridade inicial, é uma boa prática).
*   **Justificativa:** Evitar "jank" e garantir uma experiência fluida em diferentes dispositivos.
*   **Arquivos Envolvidos:** [`public/css/styles.css`](public/css/styles.css)

## Diagrama de Fluxo (Exemplo para o Modal):

```mermaid
graph TD
    A[Usuário Clica em Imagem da Galeria] --> B{openModal() chamado};
    B --> C[focusedElementBeforeModal = document.activeElement];
    C --> D[modal.style.display = 'flex'];
    D --> E[document.body.style.overflow = 'hidden'];
    E --> F[Adiciona classe 'modal-slide-in-up' ao modal];
    F --> G[Aguarda animação 'modal-slide-in-up' completar];
    G --> H[Remove 'modal-slide-in-up'];
    H --> I[modal.focus()];
    I --> J[Usuário Clica em Fechar ou Tecla ESC];
    J --> K{closeModal() chamado};
    K --> L[Adiciona classe 'modal-slide-out-down' ao modal];
    L --> M[Aguarda animação 'modal-slide-out-down' completar];
    M --> N[modal.style.display = 'none'];
    N --> O[document.body.style.overflow = 'auto'];
    O --> P[focusedElementBeforeModal.focus()];