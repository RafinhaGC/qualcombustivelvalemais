# Calculadora: Etanol ou Gasolina? (Versão 6)

## Novidades e Atualizações Implementadas:

1. **Métrica de Carro a Gasolina Genérico**:
   - Adicionada opção pré-cadastrada `"Carro a gasolina genérico"` (10,0 km/L na cidade e 13,5 km/L na estrada).
   - Ao selecionar esta opção, o app desativa automaticamente a calculadora de etanol e oculta os campos irrelevantes.

2. **Toggle para Veículos a Diesel**:
   - Interruptor no topo do formulário: *"Meu veículo é a diesel"*.
   - Ao ativar, oculta todos os campos da calculadora e exibe a mensagem de aviso:
     > *"Por que você quer comparar gasolina e etanol sendo que seu carro é diesel? 🤨"*
     > Detalhando que motores a diesel utilizam exclusivamente óleo diesel e seriam seriamente danificados com gasolina ou etanol.

3. **Rabo de Galo (50/50)**:
   - Toggle dedicado para cálculo de misturas de alto desempenho.
   - **Restrição**: Disponível apenas quando os modos Diesel e Gasolina pura estão desligados (ou seja, veículos Flex).
   - O usuário informa o volume total desejado da mistura no tanque (ex.: 40 litros).
   - O sistema calcula a proporção real de Etanol e Gasolina para que a mistura final no tanque atinja **50% de etanol e 50% de gasolina pura**, compensando o etanol já presente na gasolina da refinaria:
     - Com **Gasolina Comum** (contém 32% de etanol): calcula os litros exatos de gasolina comum e de etanol hidratado, custo total e custo médio por litro.
     - Com **Gasolina Premium** (contém 25% de etanol): calcula os litros exatos de gasolina premium e de etanol hidratado, custo total e custo médio por litro.
     - Caso o usuário preencha tanto Comum quanto Premium, exibe **ambas as misturas separadas em cartões dedicados**.

4. **Teor Oficial de Etanol Corrigido**:
   - Gasolina comum e aditivada: **32% de etanol anidro**.
   - Gasolina premium: **25% de etanol anidro**.

5. **Alerta Técnico sobre Gasolina Aditivada**:
   - Esclarece que **não há regulamentação da ANP** que fixe percentual mínimo ou máximo obrigatório de aditivo para o combustível ser vendido como aditivado.
   - Recomenda abastecer com **gasolina comum e dosar um frasco de aditivo avulso** de marca confiável, ou optar por **combustível premium** (com maior octanagem e aditivação comprovada, ideal para veículos de alto padrão, turbo ou híbridos).

6. **Disclaimer sobre Saúde do Motor e Viagens Curtas**:
   - Alerta que trajetos curtos (<15 minutos) não permitem ao motor atingir a temperatura ideal de trabalho, contaminando o óleo lubrificante com água e combustível.
   - Destaca que o **etanol é um forte agravante**, devido ao seu alto calor de vaporização e condensação excessiva nas paredes frias dos cilindros.

7. **Service Worker e Cache Atualizados**:
   - Versão do cache elevada para `combustivel-v6` no `sw.js`.

8. **Título Dinâmico Adaptativo**:
   - Quando o veículo é exclusivamente a gasolina (toggle de etanol desligado ou "Carro a gasolina genérico" selecionado), o título principal da página muda automaticamente de *"⛽ Etanol ou Gasolina?"* para **"⛽ Comum, aditivada ou premium?"** (e restaura quando flex).
