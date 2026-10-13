"use strict";

/* ====================== Dados internos ====================== */

// Teores oficiais de etanol anidro na gasolina no Brasil
const ETANOL_NA_GASOLINA = {
  comum: 0.32,      // 32% de etanol anidro
  aditivada: 0.32,  // 32% de etanol anidro
  premium: 0.25     // 25% de etanol anidro
};

// Consumo real (km/L) dos veículos pré-cadastrados
const CARROS = {
  focus: {
    nome: "Ford Focus Titanium 2.0 2016 (Flex)",
    gasolina: { cidade: 8,  estrada: 13 },
    etanol:   { cidade: 6.7, estrada: 9 }
  },
  generico: {
    nome: "Carro flex genérico (etanol ≈ 70% da gasolina)",
    gasolina: { cidade: 10, estrada: 13 },
    etanol:   { cidade: 7,  estrada: 9.1 }
  },
  gasolina_generico: {
    nome: "Carro a gasolina genérico (apenas gasolina)",
    gasolina: { cidade: 10, estrada: 13.5 },
    etanol:   null
  }
};
const CARRO_PERSONALIZADO = "personalizado";
const NOME_CARRO_SELECT = {
  focus: "Ford Focus Titanium 2.0 2016 (Flex)",
  generico: "Carro flex genérico (etanol ≈ 70% da gasolina)",
  gasolina_generico: "Carro a gasolina genérico",
  [CARRO_PERSONALIZADO]: "Informar consumo oficial do meu carro"
};
const NOME_PERCURSO = { cidade: "Cidade", estrada: "Estrada", misto: "Misto" };

// Fator sobre o consumo da gasolina comum (1.00 = sem ganho).
const EFICIENCIA = {
  etanol:    { nome: "Etanol" },
  comum:     { nome: "Gasolina comum" },
  aditivada: { nome: "Gasolina aditivada", fator: 1.0 },
  premium: {
    nome: "Gasolina premium",
    marcas: {
      "Petrobras Podium":               1.035,
      "Shell V-Power Racing":           1.035,
      "Ipiranga Ipimax Pro":            1.025,
      "Petronas Primax Alta Octanagem": 1.025,
      "Outra marca":                    1.02
    }
  }
};
const MARCA_PADRAO = "Outra marca";

const BENEFICIOS_PREMIUM = [
  ["Maior octanagem:", "resiste melhor à compressão e reduz o risco de detonação (\"batida de pino\")."],
  ["Proteção do motor:", "evita pré-ignição, que pode danificar pistões e velas com o tempo."],
  ["Motor mais limpo:", "aditivos detergentes de alta qualidade ajudam a evitar depósitos em bicos injetores e válvulas."],
  ["Melhor desempenho:", "respostas mais rápidas do acelerador e potência estável em motores turbo, de alta compressão ou injeção direta."],
  ["Menor teor de etanol:", "contém 25% de etanol anidro (contra 32% da comum), aumentando a densidade energética."],
  ["Possível ganho de consumo:", "só ocorre em motores preparados para aproveitar a octanagem mais alta; em motores populares tende a ser modesto."]
];

/* ====================== Utilitários ====================== */

const $ = id => document.getElementById(id);
const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pct = n => (n * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";
const f1  = n => n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

const temProp = (obj, chave) => Object.prototype.hasOwnProperty.call(obj, chave);
const marcaValida = b => (typeof b === "string" && temProp(EFICIENCIA.premium.marcas, b)) ? b : MARCA_PADRAO;

function el(tag, props, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (k === "class") n.className = v; else n.setAttribute(k, v);
  }
  n.append(...filhos);
  return n;
}

/* ====================== Conversão de números ====================== */

function parseNumero(v) {
  let s = String(v).trim().replace(/\s/g, "");
  if (!s) return null;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
  if (!/^\d*\.?\d*$/.test(s) || s === "." ) return null;
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/* ====================== Máscara dos campos ====================== */

function formatarCampo(bruto, cfg, apagando) {
  const s = bruto.replace(/\./g, ",").replace(/[^\d,]/g, "");
  const i = s.indexOf(",");
  let temVirgula = i >= 0;
  let inteiro = temVirgula ? s.slice(0, i) : s;
  let dec = temVirgula ? s.slice(i + 1).replace(/,/g, "") : "";

  if (!temVirgula && cfg.autoComma && !apagando) {
    const n = inteiro[0] === "1" ? 2 : 1;
    if (inteiro.length >= n) { dec = inteiro.slice(n); inteiro = inteiro.slice(0, n); temVirgula = true; }
  }
  inteiro = inteiro.slice(0, cfg.intMax);
  dec = dec.slice(0, cfg.decMax);
  return inteiro + (temVirgula ? "," + dec : "");
}

function aplicarMascara(e, cfg) {
  const input = e.target;
  const bruto = input.value;
  const pos = input.selectionStart == null ? bruto.length : input.selectionStart;
  const tipo = e.inputType || "";
  const apagando = tipo.startsWith("delete");
  const colado = tipo === "insertFromPaste" || tipo === "insertFromDrop";

  let novo;
  if (colado) {
    const n = parseNumero(bruto);
    const candidato = n !== null && n < 100 ? n.toFixed(cfg.decMax).replace(/0$/, "").replace(".", ",") : bruto;
    novo = formatarCampo(candidato, cfg, false);
  } else {
    novo = formatarCampo(bruto, cfg, apagando);
  }
  if (novo === bruto) return;

  const antes = bruto.slice(0, pos);
  const digitosAntes = antes.replace(/\D/g, "").length;
  const noFinal = pos >= bruto.length || colado;
  input.value = novo;

  let nova = novo.length;
  if (!noFinal) {
    if (antes.endsWith(",") && novo.includes(",")) {
      nova = novo.indexOf(",") + 1;
    } else if (digitosAntes === 0) {
      nova = 0;
    } else {
      let cont = 0;
      for (let k = 0; k < novo.length; k++) {
        if (/\d/.test(novo[k]) && ++cont === digitosAntes) { nova = k + 1; break; }
      }
    }
  }
  try { input.setSelectionRange(nova, nova); } catch (_) {}
}

const CFG_PRECO = { intMax: 2, decMax: 3, autoComma: true };
const CFG_KML   = { intMax: 2, decMax: 2, autoComma: false };

["etanol", "comum", "aditivada", "premium"].forEach(id =>
  $(id).addEventListener("input", e => aplicarMascara(e, CFG_PRECO)));
["kmGC", "kmGE", "kmEC", "kmEE"].forEach(id =>
  $(id).addEventListener("input", e => aplicarMascara(e, CFG_KML)));

/* ====================== Elementos de Estado ====================== */

const brandSel = $("brand");
Object.keys(EFICIENCIA.premium.marcas).forEach(m =>
  brandSel.appendChild(el("option", { value: m }, m)));

const carroSel = $("carro");
Object.entries(NOME_CARRO_SELECT).forEach(([k, nome]) =>
  carroSel.appendChild(el("option", { value: k }, nome)));

const toggleDieselEl = $("toggleDiesel");
const toggleEtanolEl = $("toggleEtanol");
const toggleRachadorEl = $("toggleRachador");
const litrosCariocaEl = $("litrosCarioca");

// Verifica se o veículo aceita etanol
function etanolAtivo() {
  if (toggleDieselEl.checked) return false;
  if (carroSel.value === "gasolina_generico") return false;
  if (carroSel.value === CARRO_PERSONALIZADO) return toggleEtanolEl.checked;
  return true; // Focus ou Flex genérico
}

const percursoAtual = () => {
  const r = document.querySelector('input[name="percurso"]:checked');
  return r ? r.value : "misto";
};

function mostrarErro(msg) {
  const box = $("error");
  box.textContent = msg;
  box.hidden = !msg;
}

function esconderResultado() { $("result").hidden = true; }

// Retorna { carro } ou { erro }
function obterCarro() {
  const escolha = carroSel.value;
  if (escolha !== CARRO_PERSONALIZADO) {
    return { carro: CARROS[temProp(CARROS, escolha) ? escolha : "focus"] };
  }
  const comEtanol = toggleEtanolEl.checked;
  const kmGC = parseNumero($("kmGC").value);
  const kmGE = parseNumero($("kmGE").value);

  if (kmGC === null || kmGC > 60 || kmGE === null || kmGE > 60) {
    return { erro: "Informe o consumo oficial de gasolina do seu carro em km/L (cidade e estrada)." };
  }

  if (!comEtanol) {
    return { carro: {
      nome: "Seu carro a gasolina (consumo oficial informado)",
      gasolina: { cidade: kmGC, estrada: kmGE },
      etanol: null
    } };
  }

  const kmEC = parseNumero($("kmEC").value);
  const kmEE = parseNumero($("kmEE").value);

  if (kmEC === null || kmEC > 60 || kmEE === null || kmEE > 60) {
    return { erro: "Informe os 4 consumos oficiais do seu carro em km/L (gasolina e etanol)." };
  }

  return { carro: {
    nome: "Seu carro flex (consumo oficial informado)",
    gasolina: { cidade: kmGC, estrada: kmGE },
    etanol:   { cidade: kmEC, estrada: kmEE }
  } };
}

function kmPorLitro(carro, k, brand, percurso) {
  if (k === "etanol" && !carro.etanol) return 0;
  const base = k === "etanol" ? carro.etanol : carro.gasolina;
  const fator = k === "aditivada" ? EFICIENCIA.aditivada.fator
              : k === "premium"   ? EFICIENCIA.premium.marcas[marcaValida(brand)] : 1;
  const v = percurso === "misto" ? 2 / (1 / base.cidade + 1 / base.estrada) : base[percurso];
  return v * fator;
}

function ranking(carro, prices, brand, percurso) {
  return Object.entries(prices)
    .filter(([k, v]) => v !== null && (k !== "etanol" || carro.etanol))
    .map(([k, price]) => {
      let nome = EFICIENCIA[k].nome;
      if (k === "premium") nome += " (" + brand + ")";
      const kmL = kmPorLitro(carro, k, brand, percurso);
      const custoKm = price / kmL;
      return { k, nome, price, kmL, custoKm, custo100: custoKm * 100 };
    })
    .sort((a, b) => a.custoKm - b.custoKm);
}

/* ====================== Modo Rachador (Mistura Carioca E50) ====================== */

/*
 * Para atingir 50% de etanol e 50% de gasolina pura no tanque:
 * Se a gasolina tem teor de etanol 'eg' (0.32 na comum, 0.25 na premium):
 * Litros de gasolina (y): y * (1 - eg) = 0.50 * V  =>  y = (0.50 / (1 - eg)) * V
 * Litros de etanol (x): x = V - y
 */
function calcularMisturaCarioca(litrosTotal, precoEtanol, precoGas, tipoGasolina) {
  const eg = ETANOL_NA_GASOLINA[tipoGasolina] || 0.32;
  const litrosGas = (0.50 / (1 - eg)) * litrosTotal;
  const litrosEtanol = litrosTotal - litrosGas;
  const custoTotal = (litrosGas * precoGas) + (litrosEtanol * precoEtanol);
  const precoMedioLitro = custoTotal / litrosTotal;

  return {
    litrosGas: Math.max(0, litrosGas),
    litrosEtanol: Math.max(0, litrosEtanol),
    custoTotal,
    precoMedioLitro,
    eg
  };
}

function atualizarModoRachador() {
  const container = $("rachadorResult");
  if (!toggleRachadorEl.checked || !etanolAtivo()) {
    container.replaceChildren();
    return;
  }

  const litros = parseNumero(litrosCariocaEl.value) || 40;
  const pEtanol = parseNumero($("etanol").value);
  const pComum = parseNumero($("comum").value);
  const pPremium = parseNumero($("premium").value);

  const cards = [];

  if (pEtanol === null || (pComum === null && pPremium === null)) {
    cards.push(el("div", { class: "tip" },
      "💡 Para calcular a mistura, informe o preço do ", el("b", {}, "Etanol"),
      " e de pelo menos uma gasolina (", el("b", {}, "Comum"), " ou ", el("b", {}, "Premium"), ")."
    ));
    container.replaceChildren(...cards);
    return;
  }

  // Mistura com Gasolina Comum (32% de etanol anidro)
  if (pComum !== null) {
    const res = calcularMisturaCarioca(litros, pEtanol, pComum, "comum");
    cards.push(el("div", { class: "rachador-card comum" },
      el("div", { class: "rachador-title" }, "🔥 Mistura Carioca 50/50 com Gasolina Comum"),
      el("div", { class: "rachador-grid" },
        el("div", { class: "rachador-metric" },
          el("small", {}, "Gasolina comum (32% etanol)"),
          el("b", {}, f1(res.litrosGas) + " L"),
          el("small", {}, brl(res.litrosGas * pComum))
        ),
        el("div", { class: "rachador-metric" },
          el("small", {}, "Etanol hidratado"),
          el("b", {}, f1(res.litrosEtanol) + " L"),
          el("small", {}, brl(res.litrosEtanol * pEtanol))
        )
      ),
      el("div", { class: "rachador-footer" },
        el("span", {}, "Custo total: " + brl(res.custoTotal)),
        el("span", {}, "Média: " + brl(res.precoMedioLitro) + "/L")
      )
    ));
  }

  // Mistura com Gasolina Premium (25% de etanol anidro)
  if (pPremium !== null) {
    const brand = marcaValida(brandSel.value);
    const res = calcularMisturaCarioca(litros, pEtanol, pPremium, "premium");
    cards.push(el("div", { class: "rachador-card premium" },
      el("div", { class: "rachador-title" }, "⚡ Mistura Carioca 50/50 com Premium (" + brand + ")"),
      el("div", { class: "rachador-grid" },
        el("div", { class: "rachador-metric" },
          el("small", {}, "Gasolina premium (25% etanol)"),
          el("b", {}, f1(res.litrosGas) + " L"),
          el("small", {}, brl(res.litrosGas * pPremium))
        ),
        el("div", { class: "rachador-metric" },
          el("small", {}, "Etanol hidratado"),
          el("b", {}, f1(res.litrosEtanol) + " L"),
          el("small", {}, brl(res.litrosEtanol * pEtanol))
        )
      ),
      el("div", { class: "rachador-footer" },
        el("span", {}, "Custo total: " + brl(res.custoTotal)),
        el("span", {}, "Média: " + brl(res.precoMedioLitro) + "/L")
      )
    ));
  }

  cards.push(el("p", { class: "note" },
    "Cálculo baseado no teor real de etanol da refinaria (32% na comum e 25% na premium) para obter exatamente 50% de etanol e 50% de gasolina pura no tanque final de " + f1(litros) + " L."
  ));

  container.replaceChildren(...cards);
}

/* ====================== Cálculo Principal ====================== */

function calcular(rolar) {
  mostrarErro("");
  if (toggleDieselEl.checked) return;

  const comEtanol = etanolAtivo();
  const prices = {
    etanol:    comEtanol ? parseNumero($("etanol").value) : null,
    comum:     parseNumero($("comum").value),
    aditivada: parseNumero($("aditivada").value),
    premium:   parseNumero($("premium").value)
  };
  const preenchidos = Object.values(prices).filter(v => v !== null);
  const minPrecos = comEtanol ? 2 : 1;

  if (preenchidos.length < minPrecos) {
    esconderResultado();
    return mostrarErro(comEtanol
      ? "Informe o preço de pelo menos 2 combustíveis para comparar."
      : "Informe o preço de pelo menos um tipo de gasolina.");
  }
  if (preenchidos.some(v => v > 30)) { esconderResultado(); return mostrarErro("Algum preço parece alto demais. Use o preço por litro (ex.: 5,89)."); }
  if (preenchidos.some(v => v < 1))  { esconderResultado(); return mostrarErro("Algum preço parece baixo demais. Use o preço por litro (ex.: 5,89)."); }

  const { carro, erro } = obterCarro();
  if (erro) { esconderResultado(); return mostrarErro(erro); }

  const brand = marcaValida(brandSel.value);
  const percurso = percursoAtual();
  const opcoes = ranking(carro, prices, brand, percurso);
  if (opcoes.length === 0) {
    esconderResultado();
    return mostrarErro("Nenhum combustível disponível para o cálculo.");
  }

  const melhor = opcoes[0];
  const segundo = opcoes.length > 1 ? opcoes[1] : null;
  const pior = opcoes.length > 2 ? opcoes[opcoes.length - 1] : null;

  let frase;
  if (!segundo) {
    frase = "Faz " + f1(melhor.kmL) + " km/L no percurso " + (NOME_PERCURSO[percurso] || "Misto").toLowerCase() + ". Custo estimado de " + brl(melhor.custoKm) + " por km.";
  } else {
    const econ = (segundo.custoKm - melhor.custoKm) / segundo.custoKm;
    frase = econ < 0.005
      ? "Praticamente empatado com " + segundo.nome + "."
      : "Custa " + pct(econ) + " menos por km que " + segundo.nome + ".";
    if (pior && pior !== segundo) {
      frase += " Até " + pct((pior.custoKm - melhor.custoKm) / pior.custoKm) + " mais barato que " + pior.nome + ".";
    }
  }

  const partes = [];
  partes.push(el("div", { class: "winner" },
    el("small", {}, (segundo ? "Mais vantajoso · " : "Resultado · ") + (NOME_PERCURSO[percurso] || "Misto")),
    el("h2", {}, melhor.nome),
    el("p", {}, frase)));

  opcoes.forEach((o, i) => partes.push(el("div", { class: "row" + (i === 0 ? " best" : "") },
    el("div", {},
      el("div", { class: "name" }, (opcoes.length > 1 ? (i + 1) + "º " : "") + o.nome),
      el("div", { class: "meta" }, brl(o.price) + "/L · faz " + f1(o.kmL) + " km/L")),
    el("div", { class: "val" }, brl(o.custo100), el("small", {}, "por 100 km")))));

  // Melhor opção em cada percurso ou rendimento por percurso
  if (opcoes.length > 1) {
    const porPercurso = el("div", { class: "tip" }, el("b", {}, "Melhor opção por percurso:"));
    ["cidade", "estrada", "misto"].forEach(p => porPercurso.append(
      el("br"), NOME_PERCURSO[p] + ": ", el("b", {}, ranking(carro, prices, brand, p)[0].nome)));
    partes.push(porPercurso);
  } else {
    const porPercurso = el("div", { class: "tip" }, el("b", {}, "Rendimento estimado por percurso:"));
    ["cidade", "estrada", "misto"].forEach(p => {
      const kmlP = kmPorLitro(carro, melhor.k, brand, p);
      const c100 = (melhor.price / kmlP) * 100;
      porPercurso.append(
        el("br"), NOME_PERCURSO[p] + ": ", el("b", {}, f1(kmlP) + " km/L"), " (" + brl(c100) + "/100 km)");
    });
    partes.push(porPercurso);
  }

  // Ponto de equilíbrio do etanol (apenas se etanol estiver ativo e informado)
  if (comEtanol && prices.etanol !== null && carro.etanol) {
    const gas = opcoes.find(o => o.k !== "etanol");
    if (gas) {
      const limite = gas.custoKm * kmPorLitro(carro, "etanol", brand, percurso);
      partes.push(el("div", { class: "tip" },
        "Para o etanol valer mais que ", el("b", {}, gas.nome),
        " (" + (NOME_PERCURSO[percurso] || "Misto").toLowerCase() + "), ele precisa custar até ",
        el("b", {}, brl(limite) + "/L"), " (hoje: " + brl(prices.etanol) + ")."));
    }
  }

  // Alerta de Gasolina Aditivada
  if (prices.aditivada !== null) {
    partes.push(el("div", { class: "tip warning" },
      el("b", {}, "⚠️ Alerta sobre Gasolina Aditivada: "),
      "Não existe uma regulamentação específica que determine uma proporção mínima ou máxima obrigatória de aditivo para que a gasolina seja vendida como aditivada no posto.",
      el("br"), el("br"),
      el("b", {}, "💡 Recomendação prática: "),
      "Vale muito mais a pena ",
      el("b", {}, "abastecer com gasolina comum e comprar o aditivo avulso à parte"),
      " (frasco de marca confiável) para colocar no tanque você mesmo, ou ",
      el("b", {}, "abastecer com combustível premium"),
      ", especialmente se você tiver um carro de alto padrão, turbo ou híbrido."
    ));
  }

  if (prices.premium !== null) {
    const ul = el("ul");
    BENEFICIOS_PREMIUM.forEach(([titulo, texto]) => ul.append(el("li", {}, el("b", {}, titulo), " " + texto)));
    partes.push(el("div", { class: "benefits" },
      el("h3", {}, "⭐ Principais benefícios da gasolina premium (" + brand + ")"),
      ul,
      el("p", { class: "note" }, "A gasolina premium possui 25% de etanol anidro (contra 32% da comum) e octanagem muito superior. Os benefícios mecânicos são expressivos em motores modernos, turbo, híbridos e com injeção direta.")));
  }

  // Disclaimer sobre viagens curtas e etanol
  partes.push(el("div", { class: "tip warning" },
    el("b", {}, "⚠️ Viagens curtas e saúde do motor: "),
    "Trajetos curtos (menos de 15 minutos) são altamente prejudiciais à saúde do motor a longo prazo, pois o propulsor não atinge a temperatura ideal de funcionamento, acumulando umidade no cárter e degradando precocemente o óleo lubrificante. O ",
    el("b", {}, "etanol é um forte agravante"),
    " nesse cenário, pois exige maior calor para vaporizar e condensa em excesso nas paredes frias dos cilindros."
  ));

  partes.push(el("p", { class: "note" }, "Simulação baseada em: " + carro.nome + ". Percurso misto = 50% cidade e 50% estrada."));

  const res = $("result");
  res.replaceChildren(...partes);
  res.hidden = false;
  if (rolar) res.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ====================== Eventos / Interface ====================== */

function atualizarTabela() {
  const { carro } = obterCarro();
  const tabela = $("effTable");
  if (!carro) {
    tabela.replaceChildren(
      el("tr", {}, el("td", { class: "note" }, "Preencha o consumo oficial do seu veículo acima para visualizar a tabela de rendimentos.")));
    return;
  }
  const linha = (nome, k, brand) => el("tr", {}, el("td", {}, nome),
    ...["cidade", "estrada", "misto"].map(p => el("td", {}, f1(kmPorLitro(carro, k, brand, p)))));
  const linhas = [
    el("tr", {}, el("th", {}, carro.nome + " (km/L)"), el("th", {}, "Cidade"), el("th", {}, "Estrada"), el("th", {}, "Misto"))
  ];
  if (carro.etanol) {
    linhas.push(linha("Etanol", "etanol"));
  }
  linhas.push(linha("Gasolina comum (32% etanol)", "comum"));
  linhas.push(linha("Gasolina aditivada (32% etanol)", "aditivada"));
  Object.keys(EFICIENCIA.premium.marcas).forEach(m => linhas.push(linha("Premium – " + m + " (25% etanol)", "premium", m)));
  tabela.replaceChildren(...linhas);
}

function atualizarCampos() {
  const isDiesel = toggleDieselEl.checked;

  if (isDiesel) {
    $("mainContent").hidden = true;
    $("dieselMessage").hidden = false;
    return;
  } else {
    $("mainContent").hidden = false;
    $("dieselMessage").hidden = true;
  }

  const custom = carroSel.value === CARRO_PERSONALIZADO;
  const comEtanol = etanolAtivo();

  // Atualiza título dinamicamente conforme o tipo de motorização
  const titleEl = $("mainTitle") || document.querySelector("h1");
  if (titleEl) {
    if (!comEtanol) {
      titleEl.textContent = "⛽ Comum, aditivada ou premium?";
      document.title = "Comum, aditivada ou premium? Calculadora";
    } else {
      titleEl.textContent = "⛽ Etanol ou Gasolina?";
      document.title = "Etanol ou Gasolina? Calculadora";
    }
  }

  $("brandField").hidden = parseNumero($("premium").value) === null;
  $("carroCustom").hidden = !custom;
  if (custom) {
    $("customEtanolFields").hidden = !comEtanol;
  }
  $("etanolField").hidden = !comEtanol;

  // Rachador: só funciona com diesel desligado e motores só a gasolina desligados (ou seja, quando etanolAtivo() é true)
  const rachadorDisponivel = comEtanol;
  $("rachadorSection").hidden = !rachadorDisponivel;
  if (!rachadorDisponivel) {
    toggleRachadorEl.checked = false;
    $("rachadorBox").hidden = true;
  } else {
    $("rachadorBox").hidden = !toggleRachadorEl.checked;
    if (toggleRachadorEl.checked) atualizarModoRachador();
  }

  atualizarTabela();
}

// Event Listeners
$("form").addEventListener("input", e => {
  if (e.target.name === "percurso") return;
  if (e.target.id === "litrosCarioca") {
    atualizarModoRachador();
    return;
  }
  esconderResultado();
  atualizarCampos();
});

toggleDieselEl.addEventListener("change", () => {
  esconderResultado();
  atualizarCampos();
});

toggleEtanolEl.addEventListener("change", () => {
  esconderResultado();
  atualizarCampos();
});

toggleRachadorEl.addEventListener("change", () => {
  $("rachadorBox").hidden = !toggleRachadorEl.checked;
  if (toggleRachadorEl.checked) atualizarModoRachador();
});

litrosCariocaEl.addEventListener("input", atualizarModoRachador);

carroSel.addEventListener("change", () => {
  esconderResultado();
  atualizarCampos();
});

$("form").addEventListener("submit", e => { e.preventDefault(); calcular(true); });
document.querySelectorAll('input[name="percurso"]').forEach(r =>
  r.addEventListener("change", () => { if (!$("result").hidden) calcular(false); }));

atualizarCampos();

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  navigator.serviceWorker.register("sw.js").catch(() => {});
}
