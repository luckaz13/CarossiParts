--- /dev/null
+++ b/MELHORIAS.md
@@ -0,0 +1,114 @@
+# Sugestões de Melhoria para o Site CarossiParts
+
+Este documento apresenta sugestões para aprimorar o site da CarossiParts, com foco em performance, experiência do usuário (UX), SEO, acessibilidade e conversão.
+
+## 1. Performance
+
+Um site rápido melhora a experiência do usuário e o ranking no Google.
+
+*   **Otimização de Imagens:**
+    *   **Compressão:** Utilize ferramentas para comprimir todas as imagens (JPG, PNG) sem perda significativa de qualidade (ex: TinyPNG, Squoosh).
+    *   **Formatos Modernos:** Converta imagens para formatos como WebP, que oferecem melhor compressão e qualidade. Você já usa para `port22.webp`, expanda para outras.
+    *   **Dimensionamento Correto:** Sirva imagens nas dimensões em que serão exibidas para evitar que o navegador redimensione imagens grandes.
+    *   **Lazy Loading:** Implemente lazy loading para imagens abaixo da dobra (especialmente na galeria "Trabalhos"). Isso acelera o carregamento inicial da página.
+        ```html
+        <img src="placeholder.jpg" data-src="../public/images/port17.jpg" alt="Trabalho 17" class="lazyload w-full h-full object-cover cursor-pointer aspect-square" onclick="openModal('../public/images/port17.jpg', 'Trabalho 17', 'Peça decorativa com design contemporâneo.')">
+        ```
+        (Requer uma biblioteca JS para lazy loading, como lazysizes).
+
+*   **Tailwind CSS:**
+    *   **Build de Produção:** Em vez de usar o CDN do Tailwind, configure o Tailwind CLI para compilar e purgar (remover) estilos não utilizados no seu CSS. Isso reduzirá drasticamente o tamanho do arquivo CSS.
+        ```bash
+        npx tailwindcss -i ./src/input.css -o ./public/css/styles.css --minify
+        ```
+    *   Mova a configuração `tailwind.config` do `<script>` no HTML para um arquivo `tailwind.config.js` na raiz do projeto.
+
+*   **JavaScript:**
+    *   **Minificação:** Minifique seu arquivo `../public/js/scripts.js` para produção.
+    *   **Defer/Async:** Carregue scripts não críticos com `defer` ou `async` para não bloquear a renderização da página.
+        ```html
+        <script src="../public/js/scripts.js" defer></script>
+        ```
+
+## 2. SEO e Acessibilidade
+
+Melhorar o SEO ajuda a ser encontrado, e acessibilidade garante que todos possam usar o site.
+
+*   **Textos Alternativos (Alt Text):**
+    *   Revise os `alt` das imagens da galeria. Em vez de "Trabalho 17", use descrições mais ricas, como "Vaso geométrico branco impresso em 3D". Isso ajuda no SEO de imagens e leitores de tela.
+
+*   **Semântica HTML:**
+    *   A estrutura geral é boa. Considere usar `<figure>` e `<figcaption>` para as imagens da galeria, se apropriado.
+
+*   **Atributos ARIA:**
+    *   Para elementos interativos (modal, menu mobile, abas de carrossel), adicione atributos ARIA para melhorar a acessibilidade:
+        *   Botão do menu mobile: `aria-expanded`, `aria-controls="mobileMenu"`.
+        *   Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modalTitle"`, `aria-describedby="modalDescription"`.
+        *   Botões do carrossel: `aria-label` (ex: "Mídia anterior", "Próxima mídia").
+
+## 3. Experiência do Usuário (UX) e Conversão
+
+Facilitar a jornada do usuário aumenta as chances de contato e compra.
+
+*   **Call to Actions (CTAs):**
+    *   **WhatsApp:** Considere adicionar um botão flutuante de WhatsApp para acesso rápido em todas as páginas, ou torná-lo mais destacado na barra de navegação.
+    *   **Mensagem Pré-definida WhatsApp:** Facilite o primeiro contato:
+        ```html
+        <a href="https://api.whatsapp.com/send?phone=5554991886962&text=Ol%C3%A1!%20Gostaria%20de%20um%20or%C3%A7amento%20para%20um%20projeto%20de%20impress%C3%A3o%203D." target="_blank" class="...">
+            <i class="fab fa-whatsapp mr-2 text-green-500"></i> Solicitar orçamento via WhatsApp
+        </a>
+        ```
+
+*   **Modal da Galeria:**
+    *   **Navegação:** Adicione botões "anterior/próximo" dentro do modal para navegar pela galeria sem precisar fechá-lo.
+    *   **Fechar com ESC:** Garanta que o modal possa ser fechado com a tecla "Escape".
+    *   **Foco:** Gerencie o foco do teclado para que, ao abrir o modal, o foco vá para dentro dele e, ao fechar, retorne ao elemento que o abriu.
+
+*   **Seção "Trabalhos":**
+    *   **Carrossel de Mídia em Destaque:**
+        *   Indique visualmente qual item está ativo (imagem ou vídeo).
+        *   Considere autoplay opcional para o vídeo (com controle de mudo).
+
+*   **Prova Social:**
+    *   Se possível, adicione uma pequena seção de depoimentos de clientes satisfeitos ou logos de empresas parceiras. Isso aumenta a confiança.
+
+## 4. Código e Manutenção
+
+*   **Arquivo `tailwind.config.js`:**
+    *   Mova a configuração do Tailwind que está inline no HTML para um arquivo `tailwind.config.js` na raiz do projeto. Isso organiza melhor e é o padrão.
+    ```javascript
+    // tailwind.config.js
+    module.exports = {
+      darkMode: 'class',
+      content: ["./src/**/*.{html,js}"], // Adicione os caminhos dos seus arquivos
+      theme: {
+        extend: {
+          colors: {
+            primary: '#3B82F6',
+            secondary: '#10B981',
+            dark: '#1E293B',
+            mercadolivre: '#FFE600',
+            shopee: '#EE4D2D',
+            whatsapp: '#25D366',
+            instagram: '#E1306C',
+            'orange-light': '#FFDAB9',
+            'orange-dark': '#FFA07A',
+          }
+        }
+      },
+      plugins: [],
+    }
+    ```
+
+*   **Consistência de Caminhos:**
+    *   Os caminhos como `../public/images/` sugerem que o `index.html` está em `src/`. Certifique-se de que os caminhos estejam corretos em relação à estrutura final do site hospedado. Se `index.html` for para a raiz no deploy, os caminhos seriam `public/images/`.
+
+## 5. Conteúdo
+
+*   **Detalhes dos Materiais:** Na seção "Quem Somos", você menciona PLA e PETG. Considere adicionar uma breve explicação sobre as características e usos ideais de cada material, ou um link para uma página/seção com mais detalhes. Isso pode ajudar clientes a entenderem melhor as opções para seus projetos.
+*   **Ano do Copyright:** Atualize o ano no rodapé para o ano corrente dinamicamente ou manualmente. Atualmente está `© 2025`.
+
+Implementando essas sugestões, o site da CarossiParts pode se tornar ainda mais eficaz em atrair e converter clientes.
+
