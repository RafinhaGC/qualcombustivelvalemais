# ⛽ Etanol ou Gasolina? – Calculadora Inteligente de Combustíveis

[![PWA Ready](https://img.shields.io/badge/PWA-Ready-00D2BE?style=flat-square&logo=pwa)](https://developer.mozilla.org/pt-BR/docs/Web/Progressive_web_apps)
[![Security Headers](https://img.shields.io/badge/Security-A%2B%20Headers-success?style=flat-square)](https://securityheaders.com)
[![Offline First](https://img.shields.io/badge/Offline-100%25%20Functional-blue?style=flat-square)](https://developer.mozilla.org/pt-BR/docs/Web/API/Service_Worker_API)
[![Theme](https://img.shields.io/badge/Theme-Mercedes--AMG%20F1-00D2BE?style=flat-square)](#-identidade-visual)

Aplicativo web progressivo (PWA) de alto desempenho desenvolvido para calcular com exatidão a melhor opção de abastecimento no Brasil (**Etanol**, **Gasolina Comum**, **Gasolina Aditivada** ou **Gasolina Premium**).

Ao contrário de calculadoras genéricas que utilizam a ultrapassada "regra cega dos 70%", este aplicativo calcula a **paridade energética e o custo por quilômetro real** com base no consumo oficial de fábrica de cada veículo (tabela Inmetro / PBEV) e no perfil de condução (cidade, estrada ou percurso misto).

---

## 🏁 Destaques do Projeto

* 🏎️ **Tema Mercedes-AMG Petronas F1 Team**: Interface moderna em preto asfalto, fibra de carbono, acabamentos metálicos em prata e o icônico verde/azul turquesa Petronas (`#00D2BE`).
* 🍸 **Calculadora Exclusiva "Rabo de Galo" (Mistura 50/50)**: Determina a dosagem volumétrica exata de etanol e gasolina no tanque para atingir 50% de etanol e 50% de gasolina pura, compensando o etanol anidro já misturado na refinaria.
* 🚗 **Banco de Dados com 30+ Montadoras em Ordem Alfabética**: Mais de 100 veículos e versões oficiais do Inmetro com anos de geração, além de clássicos nacionais e esportivos.
* ⭐ **Veículo Padrão Pré-selecionado ("Focus do Rafa")**: Abre com métricas calibradas e fica fixado no topo em Destaque Especial para cálculos imediatos.
* 🛡️ **Segurança e Arquitetura Hardened**: 100% protegido contra injeção DOM-based XSS, com Service Worker blindado contra envenenamento de cache e cabeçalhos HTTP estritos (`CSP`, `X-Frame-Options`, `nosniff`, `Permissions-Policy`).
* 📴 **100% Offline (PWA)**: Funciona sem internet após o primeiro acesso e é instalável como app nativo no Android e iOS.

---

## 📱 Funcionalidades Principais

### 1. Comparativo Financeiro Preciso (R$/km)
- **Custo por km rodado**: Cálculo real baseado no consumo do veículo e nos preços informados por litro.
- **Ponto de equilíbrio dinâmico**: Informa o preço máximo em que o etanol ainda compensa financeiramente frente à gasolina.
- **Economia a cada 100 km**: Demonstra o valor poupado em reais a cada 100 km percorridos.
- **Média harmônica para percurso misto**: Modelação matemática precisa para percursos 50% cidade e 50% estrada ($Consumo_{misto} = \frac{2}{\frac{1}{C_{cidade}} + \frac{1}{C_{estrada}}}$).

### 2. Calculadora Rabo de Galo (Mistura 50/50 🍸🍹)
- Proporciona o cálculo para motoristas entusiastas que buscam aumentar a octanagem e a resistência à detonação abastecendo metade etanol e metade gasolina pura.
- **Compensação volumétrica real**: A gasolina comum/aditivada já possui **32% de etanol anidro** e a gasolina premium possui **25%**. O cálculo resolve a equação de balanço de massa para que a mistura final no tanque resulte rigorosamente em **50% de etanol total e 50% de gasolina pura**.
- Entrada com máscara numérica e validação de segurança entre **5 L e 150 L**.
- Exibição de custo total da mistura e preço médio equivalente por litro.

### 3. Base de Dados de Veículos por Montadora (Inmetro / PBEV)
- Organizada estritamente em **ordem alfabética**:
  - **Audi**, **BMW**, **Bugatti**, **Chevrolet**, **Chrysler**, **Citroën**, **Dodge**, **Ferrari**, **Fiat**, **Ford**, **Gurgel**, **Honda** (*Accord 9ª, 10ª e 11ª gerações - V6, 2.0 Turbo e Hybrid e:HEV*, Civic, City, Fit, HR-V), **Hyundai** (*Azera 3.3 V6 2010*, HB20, Creta, Tucson, ix35), **Jeep**, **Mercedes-AMG** (incluindo o hipercarro *AMG One*), **Mercedes-Benz**, **MG** (linha 2014 completa), **Mini**, **Mitsubishi**, **Nissan**, **Peugeot**, **Plymouth**, **Porsche**, **Puma**, **Renault** (*Sandero R.S.*, Kwid, Duster), **Suzuki**, **Toyota** (*Camry XV50, XV70 e XV80 - V6 e Hybrid*, Corolla, Yaris, Hilux), **Troller**, **Volkswagen**, **Volvo** (*XC60 T5 2016*).
- Ícones e nomes completos indicando a motorização, transmissão e intervalo de anos da geração (ex.: *Ford Focus Titanium 2.0 Direct Flex 2013 a 2019*, *Honda Accord 2.0 Turbo 2018 a 2022*, *Toyota Camry 3.5 V6 2012 a 2017*).
- **Busca em tempo real**: Campo de busca inteligente com normalização de acentos (encontra por modelo, montadora ou versão).

### 4. Gestão de Veículos Flex vs. Exclusivamente a Gasolina
- **Toggle "Veículo flex" no topo**:
  - *Ativado (padrão)*: Lista apenas veículos bicombustíveis (Flex).
  - *Desativado*: Filtra automaticamente a lista para exibir apenas veículos que rodam exclusivamente a gasolina, adaptando o título da página para *"Comum, aditivada ou premium?"*.
- **Opção manual "Informar consumo oficial do meu carro"**:
  - Permite inserir os dados de consumo de qualquer veículo não listado.
  - Possui alternador inteligente da calculadora de etanol quando o veículo for puramente a gasolina.
  - Valida apenas os campos visíveis, evitando travamentos em campos ocultos.

### 5. Seletor de Gasolina Premium por Marca/Bandeira
- Permite comparar as principais gasolinas de alta octanagem do mercado:
  - **Petrobras Podium** (RON 102)
  - **Shell V-Power Racing** (RON 100)
  - **Ipiranga Ipimax Pro** (RON 98)
  - **Petronas Primax Alta Octanagem** (RON 98+)
  - **Outra marca**
- Fator de eficiência calibrado de forma neutra (1.0), sem ganhos artificiais de consumo para veículos não compatíveis.

### 6. Alertas e Recomendações Técnicas
- **Alerta sobre Gasolina Aditivada**: Esclarece a ausência de exigência de percentual mínimo de aditivação nos postos e sugere a dosagem de aditivo avulso confiável na gasolina comum ou a escolha de gasolina premium.
- **Saúde do Motor e Viagens Curtas**: Explica por que percursos de menos de 15 minutos com etanol contaminam e degradam o óleo lubrificante precocemente.
- **Detecção de Veículo a Diesel**: Toggle no topo que desativa os cálculos de ciclo Otto e orienta sobre combustíveis incompatíveis.

---

## 🎨 Identidade Visual

O design foi estruturado com foco em elegância esportiva e alta legibilidade (WCAG AA):

| Elemento | Tom / Código | Descrição |
| :--- | :--- | :--- |
| **Paddock Black** | `#090d12` | Fundo principal escuro com degradê radial sutil |
| **Dark Carbon** | `#121822` / `#182230` | Cards e seções com bordas metálicas de profundidade |
| **Silver Arrows** | `#f1f5f9` / `#cbd5e1` | Tipografia em branco prateado de alto contraste |
| **Petronas Turquoise** | `#00D2BE` | Verde/Azul ciano característico da Mercedes-AMG F1 |
| **Petronas Hover** | `#00B4A2` | Tom mais denso para interações e foco |

---

## 🛡️ Segurança e Engenharia de Software

O aplicativo foi auditado contra vulnerabilidades comuns da web:

1. **Prevenção de DOM-based XSS (CWE-79)**:
   - Removida qualquer interpolação insegura via `innerHTML`.
   - Toda a interface dinâmica utiliza a função construtora `el()` com nós nativos (`document.createElement`, `textContent`, `append`).

2. **Cabeçalhos de Segurança HTTP (`_headers` - Netlify / Cloudflare)**:
   ```http
   /*
     Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; img-src 'self' data:;
     X-Frame-Options: DENY
     X-Content-Type-Options: nosniff
     Referrer-Policy: strict-origin-when-cross-origin
     Permissions-Policy: camera=(), microphone=(), geolocation=()
   ```

3. **Service Worker Blindado contra Cache Poisoning (`sw.js`)**:
   - Valida estritamente requisições de mesma origem (`origin === self.location.origin`).
   - Armazena em cache offline apenas respostas bem-sucedidas (`status === 200 && type === "basic"`), prevenindo a persistência acidental de páginas de erro 404, 500 ou 502.

4. **Máscaras de Entrada Inteligentes e Validações de Integridade**:
   - Prevenção do erro de vírgula precoce: números digitados como `189` tornam-se corretamente `1,89`.
   - Limite estrito de preços entre **R$ 2,00/L e R$ 10,00/L**, prevenindo cálculos com valores absurdos.
   - Proteção de campo numérico para o volume do Rabo de Galo (somente dígitos inteiros, entre 5 L e 150 L).

5. **Acessibilidade e PWA (Lighthouse Audit)**:
   - Labels ocultos para leitores de tela com `.visually-hidden`.
   - Ícones do Web Manifest com `purpose: "any"` e `purpose: "maskable"` separados conforme as boas práticas do Chromium.

---

## 📐 Fórmulas Matemáticas Utilizadas

### 1. Consumo Médio Harmônico (Percurso Misto)
Como o percurso é medido em km/L e metade da distância é percorrida em cada ciclo, a média correta é a **média harmônica**:
$$C_{\text{misto}} = \frac{2}{\frac{1}{C_{\text{cidade}}} + \frac{1}{C_{\text{estrada}}}}$$

### 2. Custo por Quilômetro
$$\text{Custo/km} = \frac{\text{Preço por Litro}}{C_{\text{percurso}}}$$

### 3. Ponto de Equilíbrio Financeiro do Etanol
$$\text{Preço Máximo do Etanol} = \text{Preço da Gasolina} \times \frac{C_{\text{etanol}}}{C_{\text{gasolina}}}$$

### 4. Balanço de Massa do Rabo de Galo 50/50
Para obter uma fração volumétrica final de etanol $F_e = 0{,}50$ em um volume total $V$ (sendo $E_g$ o teor de etanol anidro na gasolina, 0,32 para comum e 0,25 para premium):
$$V_{\text{gas}} = \frac{0{,}50}{1 - E_g} \times V$$
$$V_{\text{etanol}} = V - V_{\text{gas}}$$

---

## 📁 Estrutura de Arquivos

```text
├── index.html            # Estrutura semântica e acessível da aplicação
├── style.css             # Folha de estilos no tema Mercedes-AMG Petronas F1
├── app.js                # Lógica de cálculo, base de dados e manipulação segura do DOM
├── sw.js                 # Service Worker offline-first blindado (Cache v17)
├── manifest.webmanifest  # Configuração PWA para instalação no Android/iOS
├── _headers              # Cabeçalhos de segurança HTTP para hospedagem Netlify
├── icon-192.png          # Ícone do aplicativo em alta resolução (192x192)
├── icon-512.png          # Ícone do aplicativo em alta resolução (512x512)
├── gerar-pacote.ps1      # Script PowerShell para build de ícones e compactação do ZIP
└── README.md             # Documentação completa do projeto
```

---

## 🚀 Como Executar ou Publicar

### Opção 1: Netlify (Recomendada - Suporte nativo aos cabeçalhos `_headers`)
1. Acesse [Netlify Drop](https://app.netlify.com/drop).
2. Arraste a pasta do projeto (ou o arquivo `combustivel-site.zip`).
3. O site estará no ar em segundos com HTTPS automático e pontuação máxima em cabeçalhos de segurança.

### Opção 2: GitHub Pages
1. Crie um repositório no GitHub e envie os arquivos para a branch `main`.
2. Acesse **Settings** > **Pages** > **Branch**: `main` / `root` > **Save**.
3. O app estará disponível no endereço `https://<seu-usuario>.github.io/<repositorio>/`.

### Opção 3: Execução Local
Abra o arquivo `index.html` em qualquer navegador moderno. Para testar o Service Worker e recursos de PWA offline, utilize um servidor estático local:
```bash
# Python 3
python -m http.server 8080

# Node.js
npx serve .
```

---

## 📄 Licença

Distribuído sob a licença **MIT**. Sinta-se livre para utilizar, modificar e distribuir.
