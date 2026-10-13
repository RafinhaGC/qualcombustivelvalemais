"use strict";

/* ============================================================
   BASE DE DADOS DE VEÍCULOS NO BRASIL POR MONTADORA (INMETRO / PBEV)
   Consumo oficial em km/L (Gasolina / Etanol) com anos de geração
   ============================================================ */

// Carro de destaque especial solicitado pelo usuário
const CARRO_DESTAQUE = {
  "focus_do_rafa": {
    nome: "Focus do Rafa",
    gasolina: { cidade: 7.0, estrada: 16.0 },
    etanol:   { cidade: 5.8, estrada: 11.0 }
  }
};

const MONTADORAS = {
  "Audi": {
    "audi_a3_sedan_flex": {
      nome: "Audi A3 Sedan 1.4 TFSI Flex (2015 a 2020)",
      gasolina: { cidade: 11.7, estrada: 14.2 },
      etanol:   { cidade: 8.1, estrada: 9.8 }
    },
    "audi_a4_20_tfsi": {
      nome: "Audi A4 2.0 TFSI Gasolina (2016 a 2023)",
      gasolina: { cidade: 11.0, estrada: 14.3 },
      etanol:   null
    },
    "audi_q3_14_flex": {
      nome: "Audi Q3 1.4 TFSI Flex (2016 a 2020)",
      gasolina: { cidade: 10.7, estrada: 12.5 },
      etanol:   { cidade: 7.3, estrada: 8.7 }
    },
    "audi_q5_20_2014": {
      nome: "Audi Q5 2.0 TFSI quattro Gasolina (2013 a 2017)",
      gasolina: { cidade: 8.5, estrada: 10.7 },
      etanol:   null
    },
    "audi_q5_20_2018": {
      nome: "Audi Q5 2.0 TFSI quattro Gasolina (2018 a 2024)",
      gasolina: { cidade: 8.9, estrada: 11.2 },
      etanol:   null
    }
  },
  "BMW": {
    "bmw_320i_f30_flex": {
      nome: "BMW 320i 2.0 Turbo ActiveFlex (F30) (2014 a 2018)",
      gasolina: { cidade: 9.8, estrada: 13.6 },
      etanol:   { cidade: 6.8, estrada: 9.5 }
    },
    "bmw_320i_f30_gas": {
      nome: "BMW 320i 2.0 Turbo Gasolina (F30) (2012 a 2014)",
      gasolina: { cidade: 9.8, estrada: 14.0 },
      etanol:   null
    },
    "bmw_320i_g20_flex": {
      nome: "BMW 320i 2.0 Turbo Flex (G20) (2019 a 2026)",
      gasolina: { cidade: 10.7, estrada: 13.2 },
      etanol:   { cidade: 7.4, estrada: 9.2 }
    },
    "bmw_118i_flex": {
      nome: "BMW 118i / 120i 2.0 Turbo ActiveFlex (2014 a 2019)",
      gasolina: { cidade: 10.5, estrada: 13.8 },
      etanol:   { cidade: 7.3, estrada: 9.6 }
    },
    "bmw_x1_s20i": {
      nome: "BMW X1 sDrive20i 2.0 Turbo ActiveFlex (2015 a 2022)",
      gasolina: { cidade: 10.3, estrada: 13.0 },
      etanol:   { cidade: 7.0, estrada: 9.0 }
    },
    "bmw_m3_f80": {
      nome: "BMW M3 3.0 Biturbo Gasolina (2014 a 2018)",
      gasolina: { cidade: 7.2, estrada: 10.5 },
      etanol:   null
    }
  },
  "Bugatti": {
    "bugatti_veyron": {
      nome: "Bugatti Veyron 16.4 8.0 W16 Quad-Turbo Gasolina (2005 a 2015)",
      gasolina: { cidade: 3.4, estrada: 6.0 },
      etanol:   null
    },
    "bugatti_chiron": {
      nome: "Bugatti Chiron 8.0 W16 Quad-Turbo Gasolina (2016 a 2024)",
      gasolina: { cidade: 3.8, estrada: 6.3 },
      etanol:   null
    },
    "bugatti_tourbillon": {
      nome: "Bugatti Tourbillon 8.3 V16 Híbrido Gasolina (2026+)",
      gasolina: { cidade: 5.5, estrada: 8.5 },
      etanol:   null
    }
  },
  "Cadillac": {
    "cadillac_eureka": {
      nome: "Cadillac Eureka Funeral Coach 7.0 / 8.2 V8 Gasolina (1965 a 1976)",
      gasolina: { cidade: 3.5, estrada: 6.0 },
      etanol:   null
    },
    "cadillac_escalade_62": {
      nome: "Cadillac Escalade 6.2 V8 Gasolina (2015 a 2024)",
      gasolina: { cidade: 5.8, estrada: 8.5 },
      etanol:   null
    }
  },
  "Caoa Chery": {
    "chery_tiggo5x_15": {
      nome: "Caoa Chery Tiggo 5X Pro 1.5 Turbo Flex (2022 a 2026)",
      gasolina: { cidade: 10.9, estrada: 13.0 },
      etanol:   { cidade: 7.6, estrada: 9.1 }
    },
    "chery_tiggo7_16": {
      nome: "Caoa Chery Tiggo 7 Pro 1.6 TGDI Flex / Hybrid (2022 a 2026)",
      gasolina: { cidade: 10.0, estrada: 12.0 },
      etanol:   { cidade: 7.0, estrada: 8.5 }
    },
    "chery_arrizo6_15": {
      nome: "Caoa Chery Arrizo 6 Pro 1.5 Turbo Flex (2021 a 2026)",
      gasolina: { cidade: 11.0, estrada: 13.6 },
      etanol:   { cidade: 7.6, estrada: 9.4 }
    },
    "chery_tiggo2_15": {
      nome: "Caoa Chery Tiggo 2 1.5 16V Flex (2018 a 2021)",
      gasolina: { cidade: 10.0, estrada: 11.5 },
      etanol:   { cidade: 7.0, estrada: 8.0 }
    }
  },
  "Chevrolet (GM)": {
    "camaro_ss": {
      nome: "Chevrolet Camaro SS 6.2 V8 Gasolina (2010 a 2024)",
      gasolina: { cidade: 6.4, estrada: 9.6 },
      etanol:   null
    },
    "opala_41": {
      nome: "Chevrolet Opala / Comodoro / Diplomata 4.1 6 cil Gasolina (1971 a 1992)",
      gasolina: { cidade: 5.5, estrada: 8.2 },
      etanol:   null
    },
    "opala_25": {
      nome: "Chevrolet Opala 2.5 4 cil Gasolina (1968 a 1992)",
      gasolina: { cidade: 7.0, estrada: 10.0 },
      etanol:   null
    },
    "chevette_14": {
      nome: "Chevrolet Chevette 1.4 Gasolina (1973 a 1982)",
      gasolina: { cidade: 9.0, estrada: 12.5 },
      etanol:   null
    },
    "chevette_16": {
      nome: "Chevrolet Chevette 1.6 Gasolina (1982 a 1993)",
      gasolina: { cidade: 8.6, estrada: 12.1 },
      etanol:   null
    },
    "onix_10_g1": {
      nome: "Chevrolet Onix 1.0 Joy / LT Flex (2012 a 2019)",
      gasolina: { cidade: 12.9, estrada: 15.3 },
      etanol:   { cidade: 9.1, estrada: 10.8 }
    },
    "onix_10_turbo_g2": {
      nome: "Chevrolet Onix 1.0 Turbo Premier Flex (2019 a 2026)",
      gasolina: { cidade: 11.9, estrada: 15.1 },
      etanol:   { cidade: 8.3, estrada: 10.7 }
    },
    "onix_plus_turbo": {
      nome: "Chevrolet Onix Plus 1.0 Turbo Premier Flex (2019 a 2026)",
      gasolina: { cidade: 12.0, estrada: 15.7 },
      etanol:   { cidade: 8.6, estrada: 10.9 }
    },
    "prisma_14": {
      nome: "Chevrolet Prisma 1.4 LT / LTZ Flex (2013 a 2019)",
      gasolina: { cidade: 12.5, estrada: 15.3 },
      etanol:   { cidade: 8.8, estrada: 10.7 }
    },
    "celta_10": {
      nome: "Chevrolet Celta 1.0 VHC-E Flex (2009 a 2015)",
      gasolina: { cidade: 13.0, estrada: 15.8 },
      etanol:   { cidade: 9.0, estrada: 11.0 }
    },
    "classic_10": {
      nome: "Chevrolet Classic 1.0 VHC-E Flex (2010 a 2016)",
      gasolina: { cidade: 12.6, estrada: 15.0 },
      etanol:   { cidade: 8.5, estrada: 10.2 }
    },
    "cobalt_18": {
      nome: "Chevrolet Cobalt 1.8 LTZ Flex (2011 a 2020)",
      gasolina: { cidade: 11.1, estrada: 14.4 },
      etanol:   { cidade: 7.6, estrada: 10.0 }
    },
    "cruze_14_turbo": {
      nome: "Chevrolet Cruze 1.4 Turbo LT / LTZ Flex (2016 a 2023)",
      gasolina: { cidade: 11.2, estrada: 14.0 },
      etanol:   { cidade: 7.6, estrada: 9.9 }
    },
    "tracker_10_turbo": {
      nome: "Chevrolet Tracker 1.0 Turbo Premier Flex (2020 a 2026)",
      gasolina: { cidade: 11.2, estrada: 13.4 },
      etanol:   { cidade: 7.8, estrada: 9.6 }
    },
    "tracker_12_turbo": {
      nome: "Chevrolet Tracker 1.2 Turbo Premier Flex (2020 a 2024)",
      gasolina: { cidade: 11.2, estrada: 13.5 },
      etanol:   { cidade: 7.7, estrada: 9.5 }
    },
    "spin_18": {
      nome: "Chevrolet Spin 1.8 LTZ / Premier Flex (2012 a 2024)",
      gasolina: { cidade: 10.3, estrada: 12.8 },
      etanol:   { cidade: 7.2, estrada: 9.0 }
    },
    "montana_12_turbo": {
      nome: "Chevrolet Montana 1.2 Turbo Premier Flex (2023 a 2026)",
      gasolina: { cidade: 11.1, estrada: 13.3 },
      etanol:   { cidade: 7.7, estrada: 9.3 }
    },
    "s10_25_flex": {
      nome: "Chevrolet S10 2.5 Ecotec Flex (2014 a 2021)",
      gasolina: { cidade: 8.3, estrada: 9.5 },
      etanol:   { cidade: 5.6, estrada: 6.7 }
    },
    "s10_24_flex": {
      nome: "Chevrolet S10 2.4 8V Flexpower (2007 a 2016)",
      gasolina: { cidade: 7.5, estrada: 9.0 },
      etanol:   { cidade: 5.0, estrada: 6.2 }
    },
    "astra_20_flex": {
      nome: "Chevrolet Astra 2.0 8V Flexpower (2004 a 2011)",
      gasolina: { cidade: 9.5, estrada: 12.5 },
      etanol:   { cidade: 6.5, estrada: 8.6 }
    },
    "vectra_20_flex": {
      nome: "Chevrolet Vectra 2.0 8V Flexpower (2005 a 2011)",
      gasolina: { cidade: 9.0, estrada: 12.0 },
      etanol:   { cidade: 6.2, estrada: 8.2 }
    },
    "zafira_20_flex": {
      nome: "Chevrolet Zafira 2.0 8V Flexpower (2004 a 2012)",
      gasolina: { cidade: 8.8, estrada: 11.5 },
      etanol:   { cidade: 6.0, estrada: 7.8 }
    },
    "meriva_14_18_flex": {
      nome: "Chevrolet Meriva 1.4 / 1.8 Flex (2003 a 2012)",
      gasolina: { cidade: 10.2, estrada: 12.5 },
      etanol:   { cidade: 7.0, estrada: 8.7 }
    },
    "agile_14_flex": {
      nome: "Chevrolet Agile 1.4 8V Econoflex (2009 a 2014)",
      gasolina: { cidade: 11.5, estrada: 13.5 },
      etanol:   { cidade: 8.0, estrada: 9.5 }
    },
    "cruze_18_flex": {
      nome: "Chevrolet Cruze 1.8 16V Ecotec Flex (2011 a 2016)",
      gasolina: { cidade: 9.8, estrada: 12.5 },
      etanol:   { cidade: 6.8, estrada: 8.7 }
    },
    "tracker_14_turbo_flex": {
      nome: "Chevrolet Tracker 1.4 Turbo Flex (2017 a 2020)",
      gasolina: { cidade: 10.6, estrada: 11.7 },
      etanol:   { cidade: 7.3, estrada: 8.2 }
    },
    "montana_14_flex": {
      nome: "Chevrolet Montana 1.4 Econoflex (2011 a 2021)",
      gasolina: { cidade: 11.7, estrada: 13.4 },
      etanol:   { cidade: 7.9, estrada: 9.2 }
    },
    "sonic_16_flex": {
      nome: "Chevrolet Sonic 1.6 16V Flex (2012 a 2014)",
      gasolina: { cidade: 10.5, estrada: 13.0 },
      etanol:   { cidade: 7.2, estrada: 9.1 }
    }
  },
  "Chrysler": {
    "chrysler_300c_36": {
      nome: "Chrysler 300C 3.6 V6 Pentastar Gasolina (2012 a 2021)",
      gasolina: { cidade: 7.5, estrada: 11.0 },
      etanol:   null
    },
    "chrysler_300c_57": {
      nome: "Chrysler 300C 5.7 V8 Hemi Gasolina (2005 a 2012)",
      gasolina: { cidade: 5.8, estrada: 9.2 },
      etanol:   null
    }
  },
  "Citroën": {
    "citroen_c3_10_firefly": {
      nome: "Citroën C3 1.0 Firefly Live / Feel Flex (2022 a 2026)",
      gasolina: { cidade: 12.9, estrada: 14.1 },
      etanol:   { cidade: 9.3, estrada: 10.0 }
    },
    "citroen_c3_16": {
      nome: "Citroën C3 1.6 16V VTi Flex (2012 a 2021)",
      gasolina: { cidade: 11.0, estrada: 13.2 },
      etanol:   { cidade: 7.5, estrada: 9.0 }
    },
    "citroen_c3_aircross_turbo": {
      nome: "Citroën C3 Aircross 1.0 Turbo 200 Flex (2024 a 2026)",
      gasolina: { cidade: 10.6, estrada: 12.0 },
      etanol:   { cidade: 7.4, estrada: 8.6 }
    },
    "citroen_c4_cactus_16": {
      nome: "Citroën C4 Cactus 1.6 16V Feel Flex (2018 a 2026)",
      gasolina: { cidade: 11.2, estrada: 12.7 },
      etanol:   { cidade: 7.7, estrada: 8.9 }
    },
    "citroen_c4_cactus_thp": {
      nome: "Citroën C4 Cactus 1.6 THP Turbo Shine Flex (2018 a 2024)",
      gasolina: { cidade: 11.7, estrada: 13.4 },
      etanol:   { cidade: 8.2, estrada: 9.5 }
    },
    "citroen_aircross_16_g1": {
      nome: "Citroën Aircross 1.6 16V Flex (2010 a 2020)",
      gasolina: { cidade: 10.2, estrada: 12.0 },
      etanol:   { cidade: 7.2, estrada: 8.4 }
    }
  },
  "DeLorean (DMC)": {
    "delorean_dmc12": {
      nome: "DeLorean DMC-12 2.8 V6 PRV Gasolina (1981 a 1983)",
      gasolina: { cidade: 6.5, estrada: 10.0 },
      etanol:   null
    }
  },
  "Dodge": {
    "dodge_dart_318": {
      nome: "Dodge Dart 5.2 318 V8 Gasolina (1969 a 1981)",
      gasolina: { cidade: 5.0, estrada: 7.5 },
      etanol:   null
    },
    "dodge_charger_rt": {
      nome: "Dodge Charger R/T 5.2 318 V8 Gasolina (1971 a 1980)",
      gasolina: { cidade: 4.8, estrada: 7.2 },
      etanol:   null
    }
  },
  "Ferrari": {
    "ferrari_458": {
      nome: "Ferrari 458 Italia 4.5 V8 Gasolina (2009 a 2015)",
      gasolina: { cidade: 5.0, estrada: 7.8 },
      etanol:   null
    },
    "ferrari_488": {
      nome: "Ferrari 488 GTB 3.9 V8 Biturbo Gasolina (2015 a 2019)",
      gasolina: { cidade: 6.0, estrada: 8.5 },
      etanol:   null
    },
    "ferrari_f8": {
      nome: "Ferrari F8 Tributo 3.9 V8 Biturbo Gasolina (2019 a 2023)",
      gasolina: { cidade: 6.0, estrada: 8.3 },
      etanol:   null
    },
    "ferrari_roma": {
      nome: "Ferrari Roma 3.9 V8 Biturbo Gasolina (2020 a 2026)",
      gasolina: { cidade: 6.8, estrada: 9.2 },
      etanol:   null
    },
    "ferrari_296_gtb": {
      nome: "Ferrari 296 GTB 3.0 V6 Híbrida Gasolina (2021 a 2026)",
      gasolina: { cidade: 11.0, estrada: 13.5 },
      etanol:   null
    },
    "ferrari_sf90": {
      nome: "Ferrari SF90 Stradale 4.0 V8 Híbrida Gasolina (2019 a 2026)",
      gasolina: { cidade: 10.5, estrada: 12.8 },
      etanol:   null
    }
  },
  "Fiat": {
    "uno_10_fire": {
      nome: "Fiat Uno 1.0 Fire Flex (2010 a 2021)",
      gasolina: { cidade: 12.3, estrada: 14.5 },
      etanol:   { cidade: 8.7, estrada: 10.4 }
    },
    "palio_fire": {
      nome: "Fiat Palio 1.0 / 1.4 Fire Flex (2011 a 2017)",
      gasolina: { cidade: 11.8, estrada: 13.6 },
      etanol:   { cidade: 8.2, estrada: 9.5 }
    },
    "mobi_10": {
      nome: "Fiat Mobi 1.0 Fire Flex (2016 a 2026)",
      gasolina: { cidade: 13.5, estrada: 15.0 },
      etanol:   { cidade: 9.6, estrada: 10.4 }
    },
    "argo_10_firefly": {
      nome: "Fiat Argo 1.0 Firefly Drive Flex (2017 a 2026)",
      gasolina: { cidade: 13.6, estrada: 15.1 },
      etanol:   { cidade: 9.3, estrada: 10.3 }
    },
    "argo_13_firefly": {
      nome: "Fiat Argo 1.3 Firefly Drive Flex (2017 a 2026)",
      gasolina: { cidade: 12.6, estrada: 14.7 },
      etanol:   { cidade: 8.9, estrada: 10.4 }
    },
    "cronos_13": {
      nome: "Fiat Cronos 1.3 Firefly Drive Flex (2018 a 2026)",
      gasolina: { cidade: 12.8, estrada: 15.2 },
      etanol:   { cidade: 9.0, estrada: 10.8 }
    },
    "pulse_10_turbo": {
      nome: "Fiat Pulse 1.0 Turbo 200 Flex (2021 a 2026)",
      gasolina: { cidade: 12.0, estrada: 14.6 },
      etanol:   { cidade: 8.5, estrada: 10.2 }
    },
    "pulse_abarth_13": {
      nome: "Fiat Pulse Abarth 1.3 Turbo 270 Flex (2022 a 2026)",
      gasolina: { cidade: 10.0, estrada: 12.3 },
      etanol:   { cidade: 6.8, estrada: 8.8 }
    },
    "fastback_10_turbo": {
      nome: "Fiat Fastback 1.0 Turbo 200 Flex (2022 a 2026)",
      gasolina: { cidade: 11.9, estrada: 13.9 },
      etanol:   { cidade: 8.4, estrada: 9.8 }
    },
    "fastback_13_turbo": {
      nome: "Fiat Fastback 1.3 Turbo 270 Limited Flex (2022 a 2026)",
      gasolina: { cidade: 11.3, estrada: 13.6 },
      etanol:   { cidade: 7.9, estrada: 9.7 }
    },
    "strada_14_fire": {
      nome: "Fiat Strada 1.4 Fire Endurance Flex (2013 a 2023)",
      gasolina: { cidade: 11.8, estrada: 12.4 },
      etanol:   { cidade: 8.3, estrada: 8.8 }
    },
    "strada_13_firefly": {
      nome: "Fiat Strada 1.3 Firefly Freedom / Volcano Flex (2020 a 2026)",
      gasolina: { cidade: 12.4, estrada: 13.9 },
      etanol:   { cidade: 8.8, estrada: 9.9 }
    },
    "toro_18": {
      nome: "Fiat Toro 1.8 16V Evo Flex (2016 a 2021)",
      gasolina: { cidade: 9.5, estrada: 11.2 },
      etanol:   { cidade: 6.5, estrada: 7.8 }
    },
    "toro_13_turbo": {
      nome: "Fiat Toro 1.3 Turbo 270 Flex (2021 a 2026)",
      gasolina: { cidade: 10.4, estrada: 12.3 },
      etanol:   { cidade: 7.4, estrada: 8.7 }
    },
    "cronos_10_firefly": {
      nome: "Fiat Cronos 1.0 Firefly Drive Flex (2022 a 2026)",
      gasolina: { cidade: 13.8, estrada: 15.6 },
      etanol:   { cidade: 9.9, estrada: 11.3 }
    },
    "grand_siena_14_16": {
      nome: "Fiat Grand Siena 1.4 / 1.6 Flex (2012 a 2021)",
      gasolina: { cidade: 11.2, estrada: 13.5 },
      etanol:   { cidade: 7.7, estrada: 9.4 }
    },
    "punto_14_16_18": {
      nome: "Fiat Punto 1.4 / 1.6 / 1.8 E.torQ Flex (2007 a 2017)",
      gasolina: { cidade: 10.5, estrada: 12.8 },
      etanol:   { cidade: 7.2, estrada: 8.8 }
    },
    "idea_14_18": {
      nome: "Fiat Idea 1.4 / 1.8 Flex (2005 a 2016)",
      gasolina: { cidade: 10.2, estrada: 12.2 },
      etanol:   { cidade: 6.9, estrada: 8.4 }
    },
    "bravo_18": {
      nome: "Fiat Bravo 1.8 16V E.torQ Flex (2010 a 2016)",
      gasolina: { cidade: 9.8, estrada: 12.2 },
      etanol:   { cidade: 6.8, estrada: 8.5 }
    },
    "doblo_18": {
      nome: "Fiat Doblò 1.8 8V / 16V Flex (2006 a 2021)",
      gasolina: { cidade: 9.3, estrada: 10.2 },
      etanol:   { cidade: 6.4, estrada: 7.0 }
    },
    "fiorino_14_fire": {
      nome: "Fiat Fiorino 1.4 Fire EVO Flex (2014 a 2026)",
      gasolina: { cidade: 11.7, estrada: 12.4 },
      etanol:   { cidade: 8.1, estrada: 8.8 }
    }
  },
  "Ford": {
    "focus_titanium_20": {
      nome: "Ford Focus Titanium 2.0 Direct Flex (2013 a 2019)",
      gasolina: { cidade: 8.0, estrada: 13.0 },
      etanol:   { cidade: 6.7, estrada: 9.0 }
    },
    "focus_16_se": {
      nome: "Ford Focus SE 1.6 Ti-VCT Flex (2013 a 2019)",
      gasolina: { cidade: 10.5, estrada: 13.0 },
      etanol:   { cidade: 7.2, estrada: 9.2 }
    },
    "ka_10": {
      nome: "Ford Ka 1.0 SE / SEL Flex (2014 a 2021)",
      gasolina: { cidade: 13.0, estrada: 15.1 },
      etanol:   { cidade: 8.9, estrada: 10.4 }
    },
    "ka_15_dragon": {
      nome: "Ford Ka 1.5 Dragon Ti-VCT Flex (2018 a 2021)",
      gasolina: { cidade: 12.9, estrada: 14.8 },
      etanol:   { cidade: 8.9, estrada: 10.2 }
    },
    "fiesta_16": {
      nome: "Ford New Fiesta 1.6 SE Flex (2013 a 2019)",
      gasolina: { cidade: 11.7, estrada: 13.9 },
      etanol:   { cidade: 8.0, estrada: 9.9 }
    },
    "fiesta_ecoboost": {
      nome: "Ford Fiesta 1.0 EcoBoost Turbo Gasolina (2016 a 2018)",
      gasolina: { cidade: 12.2, estrada: 15.3 },
      etanol:   null
    },
    "fusion_25": {
      nome: "Ford Fusion 2.5 i-VCT Flex (2013 a 2018)",
      gasolina: { cidade: 8.5, estrada: 12.3 },
      etanol:   { cidade: 5.4, estrada: 8.2 }
    },
    "fusion_ecoboost": {
      nome: "Ford Fusion Titanium 2.0 EcoBoost AWD Gasolina (2013 a 2019)",
      gasolina: { cidade: 8.2, estrada: 11.1 },
      etanol:   null
    },
    "fusion_hybrid": {
      nome: "Ford Fusion Titanium Hybrid Gasolina (2013 a 2019)",
      gasolina: { cidade: 16.8, estrada: 15.1 },
      etanol:   null
    },
    "ecosport_15": {
      nome: "Ford EcoSport 1.5 Ti-VCT Dragon Flex (2017 a 2021)",
      gasolina: { cidade: 11.6, estrada: 13.1 },
      etanol:   { cidade: 8.3, estrada: 9.0 }
    },
    "ecosport_20": {
      nome: "Ford EcoSport Titanium 2.0 Direct Flex (2017 a 2021)",
      gasolina: { cidade: 9.7, estrada: 11.8 },
      etanol:   { cidade: 6.8, estrada: 8.2 }
    },
    "ranger_25": {
      nome: "Ford Ranger 2.5 Duratec Flex (2012 a 2019)",
      gasolina: { cidade: 6.7, estrada: 8.0 },
      etanol:   { cidade: 4.8, estrada: 5.7 }
    },
    "territory_15": {
      nome: "Ford Territory 1.5 Turbo EcoBoost Gasolina (2020 a 2023)",
      gasolina: { cidade: 9.2, estrada: 10.0 },
      etanol:   null
    }
  },
  "Gurgel": {
    "gurgel_br800": {
      nome: "Gurgel BR-800 0.8 Enertron Gasolina (1988 a 1991)",
      gasolina: { cidade: 13.0, estrada: 17.0 },
      etanol:   null
    },
    "gurgel_supermini": {
      nome: "Gurgel Supermini 0.8 Enertron Gasolina (1992 a 1995)",
      gasolina: { cidade: 13.5, estrada: 17.5 },
      etanol:   null
    },
    "gurgel_x12_tocantins": {
      nome: "Gurgel X-12 / Tocantins 1.6 Boxer a Ar Gasolina (1975 a 1991)",
      gasolina: { cidade: 8.2, estrada: 10.8 },
      etanol:   null
    },
    "gurgel_carajas_18": {
      nome: "Gurgel Carajás 1.8 AP Gasolina (1984 a 1991)",
      gasolina: { cidade: 7.5, estrada: 10.5 },
      etanol:   null
    },
    "gurgel_xef": {
      nome: "Gurgel XEF 1.6 Boxer a Ar Gasolina (1983 a 1986)",
      gasolina: { cidade: 8.5, estrada: 11.5 },
      etanol:   null
    },
    "gurgel_motomachine": {
      nome: "Gurgel Motomachine 0.8 Enertron Gasolina (1990 a 1992)",
      gasolina: { cidade: 14.0, estrada: 18.0 },
      etanol:   null
    }
  },
  "Honda": {
    "fit_15": {
      nome: "Honda Fit 1.5 i-VTEC Flex (2014 a 2021)",
      gasolina: { cidade: 12.3, estrada: 14.1 },
      etanol:   { cidade: 8.3, estrada: 9.9 }
    },
    "city_15_g2": {
      nome: "Honda City 1.5 i-VTEC Flex (2014 a 2021)",
      gasolina: { cidade: 12.3, estrada: 14.5 },
      etanol:   { cidade: 8.5, estrada: 10.3 }
    },
    "city_15_di_g3": {
      nome: "Honda City 1.5 DOHC DI i-VTEC Flex (2022 a 2026)",
      gasolina: { cidade: 13.1, estrada: 15.2 },
      etanol:   { cidade: 9.2, estrada: 10.5 }
    },
    "civic_20_g9": {
      nome: "Honda Civic 2.0 LXR / EXR Flex (2012 a 2016)",
      gasolina: { cidade: 9.7, estrada: 13.8 },
      etanol:   { cidade: 6.5, estrada: 9.2 }
    },
    "civic_20_g10": {
      nome: "Honda Civic 2.0 Sport / EXL Flex (2016 a 2021)",
      gasolina: { cidade: 10.5, estrada: 13.0 },
      etanol:   { cidade: 7.1, estrada: 9.3 }
    },
    "civic_touring_turbo": {
      nome: "Honda Civic Touring 1.5 Turbo Gasolina (2016 a 2021)",
      gasolina: { cidade: 11.8, estrada: 14.4 },
      etanol:   null
    },
    "hrv_18_g1": {
      nome: "Honda HR-V 1.8 16V i-VTEC Flex (2015 a 2021)",
      gasolina: { cidade: 11.0, estrada: 12.3 },
      etanol:   { cidade: 7.7, estrada: 8.6 }
    },
    "hrv_15_g2": {
      nome: "Honda HR-V 1.5 i-VTEC EX / EXL Flex (2022 a 2026)",
      gasolina: { cidade: 12.7, estrada: 13.9 },
      etanol:   { cidade: 8.8, estrada: 9.8 }
    },
    "hrv_touring_turbo": {
      nome: "Honda HR-V Touring 1.5 Turbo Flex (2022 a 2026)",
      gasolina: { cidade: 11.3, estrada: 12.6 },
      etanol:   { cidade: 7.9, estrada: 8.8 }
    },
    "civic_18_g8": {
      nome: "Honda Civic 1.8 16V Flex (2006 a 2011)",
      gasolina: { cidade: 10.0, estrada: 13.0 },
      etanol:   { cidade: 6.8, estrada: 8.8 }
    },
    "crv_20_flex": {
      nome: "Honda CR-V 2.0 16V Flex (2013 a 2016)",
      gasolina: { cidade: 9.3, estrada: 11.2 },
      etanol:   { cidade: 6.4, estrada: 7.7 }
    },
    "wrv_15_flex": {
      nome: "Honda WR-V 1.5 16V Flex (2017 a 2021)",
      gasolina: { cidade: 11.7, estrada: 12.4 },
      etanol:   { cidade: 8.1, estrada: 8.8 }
    }
  },
  "Hyundai": {
    "hb20_10_g1": {
      nome: "Hyundai HB20 1.0 Comfort / Sense Flex (2012 a 2019)",
      gasolina: { cidade: 12.5, estrada: 14.1 },
      etanol:   { cidade: 8.5, estrada: 9.9 }
    },
    "hb20_16_flex": {
      nome: "Hyundai HB20 1.6 16V Flex (2012 a 2021)",
      gasolina: { cidade: 11.6, estrada: 13.8 },
      etanol:   { cidade: 8.1, estrada: 9.6 }
    },
    "hb20_10_turbo_g2": {
      nome: "Hyundai HB20 1.0 TGDI Turbo Platinum Flex (2019 a 2026)",
      gasolina: { cidade: 12.2, estrada: 14.3 },
      etanol:   { cidade: 8.6, estrada: 10.2 }
    },
    "hb20s_turbo": {
      nome: "Hyundai HB20S 1.0 TGDI Turbo Platinum Flex (2019 a 2026)",
      gasolina: { cidade: 12.3, estrada: 14.9 },
      etanol:   { cidade: 8.6, estrada: 10.5 }
    },
    "creta_16_g1": {
      nome: "Hyundai Creta 1.6 16V Pulse / Attitude Flex (2016 a 2021)",
      gasolina: { cidade: 10.4, estrada: 11.7 },
      etanol:   { cidade: 7.1, estrada: 8.2 }
    },
    "creta_10_turbo_g2": {
      nome: "Hyundai Creta 1.0 TGDI Platinum / Ultimate Flex (2021 a 2026)",
      gasolina: { cidade: 11.6, estrada: 12.0 },
      etanol:   { cidade: 8.3, estrada: 8.7 }
    },
    "creta_20": {
      nome: "Hyundai Creta 2.0 16V Ultimate Flex (2016 a 2024)",
      gasolina: { cidade: 10.9, estrada: 12.4 },
      etanol:   { cidade: 7.7, estrada: 8.7 }
    },
    "tucson_20_flex": {
      nome: "Hyundai Tucson 2.0 16V Flex (2012 a 2018)",
      gasolina: { cidade: 8.5, estrada: 10.5 },
      etanol:   { cidade: 5.8, estrada: 7.2 }
    },
    "ix35_20_flex": {
      nome: "Hyundai ix35 2.0 16V Flex (2012 a 2021)",
      gasolina: { cidade: 9.2, estrada: 11.0 },
      etanol:   { cidade: 6.4, estrada: 7.8 }
    }
  },
  "Jeep": {
    "renegade_18": {
      nome: "Jeep Renegade 1.8 16V E.torQ Flex (2015 a 2021)",
      gasolina: { cidade: 10.0, estrada: 12.0 },
      etanol:   { cidade: 6.9, estrada: 8.6 }
    },
    "renegade_13_t270": {
      nome: "Jeep Renegade 1.3 T270 Sport / Longitude Flex (2022 a 2026)",
      gasolina: { cidade: 11.0, estrada: 12.8 },
      etanol:   { cidade: 7.7, estrada: 9.1 }
    },
    "compass_20_flex": {
      nome: "Jeep Compass 2.0 Tigershark Flex (2016 a 2021)",
      gasolina: { cidade: 8.8, estrada: 10.8 },
      etanol:   { cidade: 6.1, estrada: 7.5 }
    },
    "compass_13_t270": {
      nome: "Jeep Compass 1.3 T270 Longitude / Limited Flex (2021 a 2026)",
      gasolina: { cidade: 10.5, estrada: 12.1 },
      etanol:   { cidade: 7.4, estrada: 8.7 }
    },
    "commander_13_t270": {
      nome: "Jeep Commander 1.3 T270 Limited Flex (2021 a 2026)",
      gasolina: { cidade: 9.8, estrada: 11.8 },
      etanol:   { cidade: 6.9, estrada: 8.3 }
    }
  },
  "Mercedes-AMG": {
    "amg_one": {
      nome: "Mercedes-AMG ONE 1.6 V6 Turbo E-Performance F1 Gasolina (2022 a 2026)",
      gasolina: { cidade: 7.2, estrada: 8.5 },
      etanol:   null
    },
    "amg_a45s": {
      nome: "Mercedes-AMG A 45 S 4MATIC+ 2.0 Turbo Gasolina (2019 a 2026)",
      gasolina: { cidade: 8.8, estrada: 11.2 },
      etanol:   null
    },
    "amg_c63s_v8": {
      nome: "Mercedes-AMG C 63 S 4.0 V8 Biturbo Gasolina (2015 a 2021)",
      gasolina: { cidade: 7.1, estrada: 9.6 },
      etanol:   null
    },
    "amg_c63s_e": {
      nome: "Mercedes-AMG C 63 S E-Performance 2.0 Turbo Híbrido Gasolina (2023 a 2026)",
      gasolina: { cidade: 10.2, estrada: 12.0 },
      etanol:   null
    },
    "amg_gt": {
      nome: "Mercedes-AMG GT Coupe 4.0 V8 Biturbo Gasolina (2015 a 2023)",
      gasolina: { cidade: 6.8, estrada: 9.0 },
      etanol:   null
    },
    "amg_g63": {
      nome: "Mercedes-AMG G 63 4.0 V8 Biturbo Gasolina (2018 a 2026)",
      gasolina: { cidade: 5.5, estrada: 6.8 },
      etanol:   null
    }
  },
  "Mercedes-Benz": {
    "mb_c180": {
      nome: "Mercedes-Benz C 180 1.6 CGI Turbo Gasolina (2014 a 2021)",
      gasolina: { cidade: 11.1, estrada: 13.9 },
      etanol:   null
    },
    "mb_c200_eq": {
      nome: "Mercedes-Benz C 200 EQ Boost 1.5 Turbo Híbrido Gasolina (2018 a 2021)",
      gasolina: { cidade: 11.8, estrada: 14.5 },
      etanol:   null
    },
    "mb_c200_w206": {
      nome: "Mercedes-Benz C 200 AMG Line 1.5 Turbo Híbrido Gasolina (2022 a 2026)",
      gasolina: { cidade: 11.5, estrada: 14.2 },
      etanol:   null
    },
    "mb_a200": {
      nome: "Mercedes-Benz A 200 1.3 Turbo Sedan / Hatch Gasolina (2018 a 2026)",
      gasolina: { cidade: 12.4, estrada: 14.9 },
      etanol:   null
    },
    "mb_cla200": {
      nome: "Mercedes-Benz CLA 200 1.3 Turbo Gasolina (2019 a 2026)",
      gasolina: { cidade: 12.0, estrada: 14.6 },
      etanol:   null
    },
    "mb_gla200": {
      nome: "Mercedes-Benz GLA 200 1.3 Turbo Gasolina (2020 a 2026)",
      gasolina: { cidade: 11.1, estrada: 13.6 },
      etanol:   null
    },
    "mb_glc300": {
      nome: "Mercedes-Benz GLC 300 4MATIC 2.0 Turbo Gasolina (2019 a 2026)",
      gasolina: { cidade: 9.3, estrada: 11.8 },
      etanol:   null
    }
  },
  "MG (Morris Garages)": {
    "mg_550_18t": {
      nome: "MG 550 1.8 16V Turbo Gasolina (2011 a 2015)",
      gasolina: { cidade: 7.4, estrada: 10.5 },
      etanol:   null
    },
    "mg_6_18t": {
      nome: "MG 6 1.8 16V Turbo Gasolina (2011 a 2015)",
      gasolina: { cidade: 7.5, estrada: 10.8 },
      etanol:   null
    },
    "mg_350_15": {
      nome: "MG 350 1.5 16V Gasolina (2013 a 2015)",
      gasolina: { cidade: 9.5, estrada: 12.5 },
      etanol:   null
    },
    "mg_3_15": {
      nome: "MG 3 1.5 16V Hatch Gasolina (2013 a 2015)",
      gasolina: { cidade: 10.0, estrada: 13.0 },
      etanol:   null
    }
  },
  "Mini": {
    "mini_cooper": {
      nome: "Mini Cooper 1.5 TwinPower Turbo Gasolina (2014 a 2024)",
      gasolina: { cidade: 12.8, estrada: 15.1 },
      etanol:   null
    },
    "mini_cooper_s": {
      nome: "Mini Cooper S 2.0 Turbo Gasolina (2014 a 2024)",
      gasolina: { cidade: 11.4, estrada: 13.9 },
      etanol:   null
    },
    "mini_countryman_s": {
      nome: "Mini Countryman Cooper S ALL4 2.0 Turbo Gasolina (2017 a 2024)",
      gasolina: { cidade: 10.5, estrada: 12.8 },
      etanol:   null
    }
  },
  "Mitsubishi": {
    "mitsu_pajero_tr4_flex": {
      nome: "Mitsubishi Pajero TR4 2.0 16V Flex (2007 a 2015)",
      gasolina: { cidade: 8.0, estrada: 10.0 },
      etanol:   { cidade: 5.5, estrada: 7.0 }
    },
    "mitsu_asx_20_flex": {
      nome: "Mitsubishi ASX 2.0 16V Flex (2017 a 2021)",
      gasolina: { cidade: 9.8, estrada: 12.3 },
      etanol:   { cidade: 6.9, estrada: 8.6 }
    },
    "mitsu_lancer_20": {
      nome: "Mitsubishi Lancer 2.0 16V Gasolina (2011 a 2019)",
      gasolina: { cidade: 10.2, estrada: 13.1 },
      etanol:   null
    },
    "mitsu_eclipse_cross": {
      nome: "Mitsubishi Eclipse Cross 1.5 Turbo Gasolina (2019 a 2026)",
      gasolina: { cidade: 10.9, estrada: 12.0 },
      etanol:   null
    },
    "mitsu_outlander_20": {
      nome: "Mitsubishi Outlander 2.0 16V Gasolina (2014 a 2022)",
      gasolina: { cidade: 9.3, estrada: 11.5 },
      etanol:   null
    }
  },
  "Nissan": {
    "nissan_tiida_18": {
      nome: "Nissan Tiida 1.8 16V Flex (2007 a 2013)",
      gasolina: { cidade: 10.5, estrada: 13.0 },
      etanol:   { cidade: 7.0, estrada: 9.1 }
    },
    "march_10_16": {
      nome: "Nissan March 1.0 / 1.6 16V Flex (2011 a 2020)",
      gasolina: { cidade: 12.6, estrada: 14.4 },
      etanol:   { cidade: 8.5, estrada: 9.9 }
    },
    "versa_16": {
      nome: "Nissan Versa 1.6 16V Sense / Advance Flex (2015 a 2026)",
      gasolina: { cidade: 11.7, estrada: 13.9 },
      etanol:   { cidade: 8.0, estrada: 10.0 }
    },
    "kicks_16": {
      nome: "Nissan Kicks 1.6 16V Sense / Advance / Exclusive Flex (2016 a 2026)",
      gasolina: { cidade: 11.4, estrada: 13.7 },
      etanol:   { cidade: 7.8, estrada: 9.6 }
    },
    "sentra_20_g7": {
      nome: "Nissan Sentra 2.0 16V SV / SL Gasolina (2014 a 2020)",
      gasolina: { cidade: 9.9, estrada: 12.7 },
      etanol:   null
    },
    "sentra_20_g8": {
      nome: "Nissan Sentra 2.0 16V Advance / Exclusive Gasolina (2023 a 2026)",
      gasolina: { cidade: 11.0, estrada: 13.9 },
      etanol:   null
    },
    "sentra_20_flex": {
      nome: "Nissan Sentra 2.0 16V Flex (2010 a 2013)",
      gasolina: { cidade: 9.5, estrada: 12.5 },
      etanol:   { cidade: 6.5, estrada: 8.7 }
    },
    "livina_16_18_flex": {
      nome: "Nissan Livina / Grand Livina 1.6 / 1.8 16V Flex (2009 a 2014)",
      gasolina: { cidade: 10.5, estrada: 13.2 },
      etanol:   { cidade: 7.2, estrada: 9.0 }
    }
  },
  "Peugeot": {
    "peugeot_208_10": {
      nome: "Peugeot 208 1.0 Firefly Like / Style Flex (2022 a 2026)",
      gasolina: { cidade: 13.6, estrada: 15.5 },
      etanol:   { cidade: 9.6, estrada: 11.0 }
    },
    "peugeot_208_turbo": {
      nome: "Peugeot 208 1.0 Turbo 200 Flex (2023 a 2026)",
      gasolina: { cidade: 12.0, estrada: 13.8 },
      etanol:   { cidade: 8.3, estrada: 9.8 }
    },
    "peugeot_208_16": {
      nome: "Peugeot 208 1.6 16V Flex (2013 a 2022)",
      gasolina: { cidade: 11.0, estrada: 13.2 },
      etanol:   { cidade: 7.5, estrada: 9.0 }
    },
    "peugeot_2008_turbo": {
      nome: "Peugeot 2008 1.0 Turbo 200 Flex (2024 a 2026)",
      gasolina: { cidade: 11.5, estrada: 12.8 },
      etanol:   { cidade: 8.1, estrada: 9.2 }
    },
    "peugeot_2008_thp": {
      nome: "Peugeot 2008 1.6 THP Turbo Griffe Flex (2015 a 2024)",
      gasolina: { cidade: 11.2, estrada: 12.9 },
      etanol:   { cidade: 7.8, estrada: 9.1 }
    },
    "peugeot_206_207_14": {
      nome: "Peugeot 206 / 207 1.4 8V Flex (2006 a 2014)",
      gasolina: { cidade: 10.8, estrada: 13.5 },
      etanol:   { cidade: 7.6, estrada: 9.5 }
    },
    "peugeot_308_thp": {
      nome: "Peugeot 308 1.6 THP Turbo Flex (2015 a 2019)",
      gasolina: { cidade: 10.6, estrada: 12.9 },
      etanol:   { cidade: 7.2, estrada: 8.9 }
    }
  },
  "Plymouth": {
    "plymouth_roadrunner": {
      nome: "Plymouth Road Runner 6.3 383 V8 Gasolina (1968 a 1975)",
      gasolina: { cidade: 4.5, estrada: 7.0 },
      etanol:   null
    },
    "plymouth_superbird": {
      nome: "Plymouth Superbird 7.0 426 Hemi V8 Gasolina (1970)",
      gasolina: { cidade: 3.8, estrada: 6.2 },
      etanol:   null
    }
  },
  "Porsche": {
    "porsche_911_carrera": {
      nome: "Porsche 911 Carrera S 3.0 Biturbo Gasolina (2016 a 2024)",
      gasolina: { cidade: 8.8, estrada: 11.9 },
      etanol:   null
    },
    "porsche_718_boxster": {
      nome: "Porsche 718 Boxster / Cayman 2.0 Turbo Gasolina (2016 a 2024)",
      gasolina: { cidade: 9.0, estrada: 11.8 },
      etanol:   null
    },
    "porsche_macan": {
      nome: "Porsche Macan 2.0 Turbo Gasolina (2014 a 2024)",
      gasolina: { cidade: 8.5, estrada: 10.8 },
      etanol:   null
    },
    "porsche_cayenne_hybrid": {
      nome: "Porsche Cayenne E-Hybrid 3.0 V6 Turbo Gasolina (2018 a 2024)",
      gasolina: { cidade: 16.0, estrada: 17.5 },
      etanol:   null
    },
    "porsche_panamera_hybrid": {
      nome: "Porsche Panamera 4 E-Hybrid 2.9 V6 Biturbo Gasolina (2017 a 2024)",
      gasolina: { cidade: 17.0, estrada: 18.2 },
      etanol:   null
    }
  },
  "Puma": {
    "puma_gt_dkw": {
      nome: "Puma GT DKW 1.0 3 cil 2T Gasolina (1967 a 1968)",
      gasolina: { cidade: 8.0, estrada: 11.0 },
      etanol:   null
    },
    "puma_gte_1600": {
      nome: "Puma GTE Tubarão 1.6 Boxer a Ar Gasolina (1970 a 1980)",
      gasolina: { cidade: 8.8, estrada: 12.4 },
      etanol:   null
    },
    "puma_gts_conversivel": {
      nome: "Puma GTS Conversível 1.6 Boxer a Ar Gasolina (1973 a 1980)",
      gasolina: { cidade: 8.5, estrada: 12.0 },
      etanol:   null
    },
    "puma_gtb_s1": {
      nome: "Puma GTB S1 4.1 6 cil 250-S Gasolina (1974 a 1978)",
      gasolina: { cidade: 5.0, estrada: 7.8 },
      etanol:   null
    },
    "puma_gtb_s2": {
      nome: "Puma GTB S2 4.1 6 cil 250-S Gasolina (1979 a 1987)",
      gasolina: { cidade: 5.2, estrada: 8.0 },
      etanol:   null
    },
    "puma_gti_1600": {
      nome: "Puma GTI 1.6 Boxer a Ar Gasolina (1981 a 1987)",
      gasolina: { cidade: 9.0, estrada: 12.6 },
      etanol:   null
    },
    "puma_gtc_conversivel": {
      nome: "Puma GTC Conversível 1.6 Boxer a Ar Gasolina (1981 a 1986)",
      gasolina: { cidade: 8.8, estrada: 12.2 },
      etanol:   null
    },
    "puma_am4_ap18": {
      nome: "Puma AM4 1.8 AP Gasolina (1989 a 1993)",
      gasolina: { cidade: 9.5, estrada: 13.5 },
      etanol:   null
    }
  },
  "Renault": {
    "sandero_rs": {
      nome: "Renault Sandero R.S. 2.0 16V Flex (2015 a 2021)",
      gasolina: { cidade: 9.9, estrada: 11.4 },
      etanol:   { cidade: 6.9, estrada: 8.3 }
    },
    "kwid_10": {
      nome: "Renault Kwid 1.0 12V SCe Zen / Intense Flex (2017 a 2026)",
      gasolina: { cidade: 15.3, estrada: 15.7 },
      etanol:   { cidade: 10.8, estrada: 11.0 }
    },
    "sandero_10": {
      nome: "Renault Sandero 1.0 SCe Flex (2014 a 2022)",
      gasolina: { cidade: 13.9, estrada: 14.7 },
      etanol:   { cidade: 9.5, estrada: 10.2 }
    },
    "sandero_16": {
      nome: "Renault Sandero 1.6 16V SCe Flex (2017 a 2022)",
      gasolina: { cidade: 11.8, estrada: 13.4 },
      etanol:   { cidade: 8.1, estrada: 9.3 }
    },
    "logan_10_16": {
      nome: "Renault Logan 1.0 / 1.6 SCe Flex (2014 a 2023)",
      gasolina: { cidade: 13.6, estrada: 14.9 },
      etanol:   { cidade: 9.3, estrada: 10.3 }
    },
    "duster_16": {
      nome: "Renault Duster 1.6 16V SCe Flex (2016 a 2024)",
      gasolina: { cidade: 11.2, estrada: 11.5 },
      etanol:   { cidade: 7.7, estrada: 8.0 }
    },
    "duster_13_tce": {
      nome: "Renault Duster 1.3 TCe Turbo Iconic Flex (2022 a 2026)",
      gasolina: { cidade: 10.8, estrada: 11.5 },
      etanol:   { cidade: 7.7, estrada: 8.4 }
    },
    "captur_16_13_tce": {
      nome: "Renault Captur 1.6 SCe / 1.3 TCe Turbo Flex (2017 a 2023)",
      gasolina: { cidade: 10.9, estrada: 11.8 },
      etanol:   { cidade: 7.4, estrada: 8.2 }
    },
    "kardian_10_tce": {
      nome: "Renault Kardian 1.0 TCe Turbo Premiere Flex (2024 a 2026)",
      gasolina: { cidade: 13.1, estrada: 13.9 },
      etanol:   { cidade: 9.0, estrada: 9.7 }
    },
    "oroch_16_13_flex": {
      nome: "Renault Oroch 1.6 SCe / 1.3 Turbo Flex (2015 a 2026)",
      gasolina: { cidade: 10.5, estrada: 11.4 },
      etanol:   { cidade: 7.4, estrada: 8.0 }
    },
    "clio_10_flex": {
      nome: "Renault Clio 1.0 16V Hi-Flex (2005 a 2016)",
      gasolina: { cidade: 13.1, estrada: 14.3 },
      etanol:   { cidade: 9.0, estrada: 10.0 }
    },
    "fluence_20_flex": {
      nome: "Renault Fluence 2.0 16V Hi-Flex (2011 a 2018)",
      gasolina: { cidade: 9.6, estrada: 12.1 },
      etanol:   { cidade: 6.6, estrada: 8.4 }
    },
    "megane_16_flex": {
      nome: "Renault Mégane 1.6 16V Hi-Flex (2006 a 2012)",
      gasolina: { cidade: 10.0, estrada: 12.5 },
      etanol:   { cidade: 6.8, estrada: 8.7 }
    }
  },
  "Suzuki": {
    "suzuki_swift_sport": {
      nome: "Suzuki Swift Sport 1.6 16V Gasolina (2014 a 2017)",
      gasolina: { cidade: 11.5, estrada: 13.6 },
      etanol:   null
    },
    "suzuki_jimny_13": {
      nome: "Suzuki Jimny 1.3 16V 4x4 Gasolina (2008 a 2022)",
      gasolina: { cidade: 9.5, estrada: 10.7 },
      etanol:   null
    },
    "suzuki_vitara_14": {
      nome: "Suzuki Vitara 1.4 Turbo 4WD Gasolina (2016 a 2022)",
      gasolina: { cidade: 12.0, estrada: 13.7 },
      etanol:   null
    }
  },
  "Toyota": {
    "corolla_20_g11": {
      nome: "Toyota Corolla 2.0 XEi / Altis Flex (2014 a 2019)",
      gasolina: { cidade: 10.6, estrada: 12.6 },
      etanol:   { cidade: 7.2, estrada: 8.8 }
    },
    "corolla_20_dynamic": {
      nome: "Toyota Corolla 2.0 Dynamic Force Flex (2019 a 2026)",
      gasolina: { cidade: 11.9, estrada: 14.2 },
      etanol:   { cidade: 8.3, estrada: 9.8 }
    },
    "corolla_18_hybrid": {
      nome: "Toyota Corolla 1.8 Altis Hybrid Flex (2019 a 2026)",
      gasolina: { cidade: 17.5, estrada: 15.2 },
      etanol:   { cidade: 11.8, estrada: 10.5 }
    },
    "corolla_cross_20": {
      nome: "Toyota Corolla Cross 2.0 XR / XRE Flex (2021 a 2026)",
      gasolina: { cidade: 11.5, estrada: 13.0 },
      etanol:   { cidade: 8.0, estrada: 9.0 }
    },
    "corolla_cross_hybrid": {
      nome: "Toyota Corolla Cross 1.8 Hybrid Flex (2021 a 2026)",
      gasolina: { cidade: 17.0, estrada: 14.7 },
      etanol:   { cidade: 11.8, estrada: 9.7 }
    },
    "etios_13_15": {
      nome: "Toyota Etios 1.3 / 1.5 X / XLS Flex (2012 a 2021)",
      gasolina: { cidade: 12.5, estrada: 14.8 },
      etanol:   { cidade: 8.6, estrada: 10.3 }
    },
    "yaris_15": {
      nome: "Toyota Yaris 1.5 XL / XLS Flex (2018 a 2026)",
      gasolina: { cidade: 12.2, estrada: 14.6 },
      etanol:   { cidade: 8.7, estrada: 10.1 }
    },
    "hilux_27_flex": {
      nome: "Toyota Hilux 2.7 Dual VVT-i Flex (2016 a 2021)",
      gasolina: { cidade: 6.9, estrada: 8.1 },
      etanol:   { cidade: 4.8, estrada: 5.6 }
    },
    "sw4_27_flex": {
      nome: "Toyota SW4 2.7 Dual VVT-i Flex (2016 a 2021)",
      gasolina: { cidade: 6.8, estrada: 8.1 },
      etanol:   { cidade: 4.8, estrada: 5.6 }
    },
    "fielder_18_flex": {
      nome: "Toyota Fielder 1.8 16V Flex (2007 a 2008)",
      gasolina: { cidade: 11.0, estrada: 13.0 },
      etanol:   { cidade: 7.5, estrada: 9.0 }
    }
  },
  "Volkswagen (VW)": {
    "polo_gts": {
      nome: "VW Polo GTS 1.4 250 TSI Flex (2020 a 2026)",
      gasolina: { cidade: 11.0, estrada: 13.7 },
      etanol:   { cidade: 7.5, estrada: 9.6 }
    },
    "voyage_16": {
      nome: "VW Voyage 1.6 MSI Total Flex (2008 a 2023)",
      gasolina: { cidade: 11.1, estrada: 13.3 },
      etanol:   { cidade: 7.5, estrada: 9.4 }
    },
    "voyage_10": {
      nome: "VW Voyage 1.0 Total Flex (2008 a 2023)",
      gasolina: { cidade: 12.9, estrada: 15.4 },
      etanol:   { cidade: 8.9, estrada: 10.6 }
    },
    "gol_10": {
      nome: "VW Gol 1.0 Total Flex G4/G5/G6 (2008 a 2016)",
      gasolina: { cidade: 12.1, estrada: 14.5 },
      etanol:   { cidade: 8.4, estrada: 10.2 }
    },
    "gol_16": {
      nome: "VW Gol 1.6 MSI Total Flex (2008 a 2022)",
      gasolina: { cidade: 11.1, estrada: 13.1 },
      etanol:   { cidade: 7.6, estrada: 9.2 }
    },
    "gol_quadrado_16": {
      nome: "VW Gol Quadrado 1.6 AP Gasolina (1984 a 1994)",
      gasolina: { cidade: 9.5, estrada: 13.0 },
      etanol:   null
    },
    "gol_gts_18": {
      nome: "VW Gol GTS 1.8S AP Gasolina (1987 a 1994)",
      gasolina: { cidade: 8.8, estrada: 12.5 },
      etanol:   null
    },
    "gol_gti_20": {
      nome: "VW Gol GTI 2.0 AP Gasolina (1988 a 1994)",
      gasolina: { cidade: 9.0, estrada: 13.2 },
      etanol:   null
    },
    "gol_quadrado_ar": {
      nome: "VW Gol 1.3 / 1.6 Refrigerado a Ar Gasolina (1980 a 1986)",
      gasolina: { cidade: 9.0, estrada: 12.0 },
      etanol:   null
    },
    "voyage_quadrado_16": {
      nome: "VW Voyage Quadrado 1.6 AP Gasolina (1981 a 1995)",
      gasolina: { cidade: 9.8, estrada: 13.5 },
      etanol:   null
    },
    "voyage_quadrado_18": {
      nome: "VW Voyage Quadrado 1.8 AP Gasolina (1986 a 1995)",
      gasolina: { cidade: 9.0, estrada: 12.8 },
      etanol:   null
    },
    "fusca_1300_1600": {
      nome: "VW Fusca 1300 / 1600 Gasolina (1959 a 1996)",
      gasolina: { cidade: 8.5, estrada: 11.5 },
      etanol:   null
    },
    "fox_16": {
      nome: "VW Fox 1.6 Prime / Highline Flex (2010 a 2021)",
      gasolina: { cidade: 10.7, estrada: 13.2 },
      etanol:   { cidade: 7.4, estrada: 9.1 }
    },
    "up_10_tsi": {
      nome: "VW Up! 1.0 TSI Turbo Flex (2015 a 2021)",
      gasolina: { cidade: 14.3, estrada: 16.3 },
      etanol:   { cidade: 10.0, estrada: 11.5 }
    },
    "polo_track": {
      nome: "VW Polo Track 1.0 MPI Flex (2023 a 2026)",
      gasolina: { cidade: 13.5, estrada: 15.0 },
      etanol:   { cidade: 9.3, estrada: 10.5 }
    },
    "polo_10_tsi": {
      nome: "VW Polo 1.0 TSI Comfortline / Highline Flex (2017 a 2026)",
      gasolina: { cidade: 11.6, estrada: 14.1 },
      etanol:   { cidade: 8.0, estrada: 9.8 }
    },
    "virtus_10_tsi": {
      nome: "VW Virtus 1.0 TSI Highline Flex (2018 a 2026)",
      gasolina: { cidade: 11.2, estrada: 14.6 },
      etanol:   { cidade: 7.8, estrada: 10.2 }
    },
    "golf_14_gasolina": {
      nome: "VW Golf 1.4 TSI Highline Gasolina (2013 a 2015)",
      gasolina: { cidade: 11.7, estrada: 14.3 },
      etanol:   null
    },
    "golf_14_flex": {
      nome: "VW Golf 1.4 TSI Total Flex (2016 a 2019)",
      gasolina: { cidade: 11.3, estrada: 13.7 },
      etanol:   { cidade: 7.7, estrada: 9.5 }
    },
    "jetta_14_tsi": {
      nome: "VW Jetta 1.4 TSI Comfortline / R-Line Flex (2016 a 2021)",
      gasolina: { cidade: 11.0, estrada: 14.0 },
      etanol:   { cidade: 7.4, estrada: 9.6 }
    },
    "jetta_gli": {
      nome: "VW Jetta GLI 2.0 TSI Gasolina (2019 a 2024)",
      gasolina: { cidade: 9.9, estrada: 12.5 },
      etanol:   null
    },
    "tcross_10_tsi": {
      nome: "VW T-Cross 1.0 TSI 200 Flex (2019 a 2026)",
      gasolina: { cidade: 11.6, estrada: 14.0 },
      etanol:   { cidade: 8.1, estrada: 9.8 }
    },
    "tcross_14_tsi": {
      nome: "VW T-Cross 1.4 TSI 250 Highline Flex (2019 a 2026)",
      gasolina: { cidade: 11.0, estrada: 13.2 },
      etanol:   { cidade: 7.7, estrada: 9.3 }
    },
    "nivus_10_tsi": {
      nome: "VW Nivus 1.0 TSI 200 Flex (2020 a 2026)",
      gasolina: { cidade: 11.9, estrada: 14.1 },
      etanol:   { cidade: 8.3, estrada: 10.1 }
    },
    "taos_14_tsi": {
      nome: "VW Taos 1.4 250 TSI Flex (2021 a 2026)",
      gasolina: { cidade: 10.7, estrada: 13.0 },
      etanol:   { cidade: 7.4, estrada: 9.0 }
    },
    "saveiro_16": {
      nome: "VW Saveiro 1.6 MSI Flex (2014 a 2026)",
      gasolina: { cidade: 11.5, estrada: 12.9 },
      etanol:   { cidade: 7.9, estrada: 9.1 }
    },
    "kombi_14_flex": {
      nome: "VW Kombi 1.4 Total Flex (2006 a 2013)",
      gasolina: { cidade: 8.8, estrada: 9.5 },
      etanol:   { cidade: 6.0, estrada: 6.7 }
    },
    "parati_16_flex": {
      nome: "VW Parati 1.6 Total Flex G3/G4 (2003 a 2012)",
      gasolina: { cidade: 10.8, estrada: 13.2 },
      etanol:   { cidade: 7.5, estrada: 9.2 }
    },
    "spacefox_16_flex": {
      nome: "VW SpaceFox / CrossFox 1.6 Total Flex (2006 a 2019)",
      gasolina: { cidade: 10.4, estrada: 12.8 },
      etanol:   { cidade: 7.2, estrada: 8.8 }
    },
    "santana_18_flex": {
      nome: "VW Santana 1.8 Total Flex (2005 a 2006)",
      gasolina: { cidade: 9.8, estrada: 13.0 },
      etanol:   { cidade: 6.8, estrada: 9.0 }
    },
    "bora_20_flex": {
      nome: "VW Bora 2.0 Total Flex (2008 a 2011)",
      gasolina: { cidade: 9.5, estrada: 12.5 },
      etanol:   { cidade: 6.5, estrada: 8.6 }
    }
  },
  "Volvo": {
    "volvo_xc60_t5_2016": {
      nome: "Volvo XC60 T5 2.0 Turbo Drive-E Gasolina (2014 a 2017)",
      gasolina: { cidade: 8.5, estrada: 11.7 },
      etanol:   null
    },
    "volvo_xc40_t5": {
      nome: "Volvo XC40 T5 Momentum / Inscription 2.0 Turbo Gasolina (2018 a 2022)",
      gasolina: { cidade: 9.5, estrada: 11.9 },
      etanol:   null
    },
    "volvo_xc40_t4": {
      nome: "Volvo XC40 T4 FWD 2.0 Turbo Gasolina (2019 a 2022)",
      gasolina: { cidade: 10.1, estrada: 12.5 },
      etanol:   null
    },
    "volvo_xc60_t8": {
      nome: "Volvo XC60 T8 Recharge Plug-in Hybrid Gasolina (2018 a 2026)",
      gasolina: { cidade: 19.2, estrada: 20.0 },
      etanol:   null
    },
    "volvo_xc90_t8": {
      nome: "Volvo XC90 T8 Recharge Plug-in Hybrid Gasolina (2017 a 2026)",
      gasolina: { cidade: 16.5, estrada: 17.8 },
      etanol:   null
    },
    "volvo_s60_t5": {
      nome: "Volvo S60 T4 / T5 Momentum 2.0 Turbo Gasolina (2019 a 2023)",
      gasolina: { cidade: 10.2, estrada: 12.8 },
      etanol:   null
    },
    "volvo_v40_t4": {
      nome: "Volvo V40 T4 2.0 Turbo Gasolina (2014 a 2019)",
      gasolina: { cidade: 10.4, estrada: 13.1 },
      etanol:   null
    }
  }
};

// Dicionário achatado para lookup rápido
const CARROS_MAP = {};

// 1. Destaque do Rafa
for (const [key, dados] of Object.entries(CARRO_DESTAQUE)) {
  CARROS_MAP[key] = dados;
}

// 2. Montadoras em ordem alfabética
for (const [montadora, carros] of Object.entries(MONTADORAS)) {
  for (const [key, dados] of Object.entries(carros)) {
    CARROS_MAP[key] = dados;
  }
}

// 3. Opções genéricas e personalizadas
const CARRO_GENERICO = "generico_flex";
const CARRO_GASOLINA_GENERICO = "generico_gasolina";
const CARRO_PERSONALIZADO = "personalizado";

CARROS_MAP[CARRO_GENERICO] = {
  nome: "Carro flex genérico (etanol ≈ 70% da gasolina)",
  gasolina: { cidade: 10.0, estrada: 13.0 },
  etanol:   { cidade: 7.0,  estrada: 9.1 }
};

CARROS_MAP[CARRO_GASOLINA_GENERICO] = {
  nome: "Carro a gasolina genérico",
  gasolina: { cidade: 10.0, estrada: 13.5 },
  etanol:   null
};

/* ====================== Teores Oficiais e Eficiência ====================== */

const ETANOL_NA_GASOLINA = {
  comum: 0.32,      // 32% de etanol anidro
  aditivada: 0.32,  // 32% de etanol anidro
  premium: 0.25     // 25% de etanol anidro
};

const EFICIENCIA = {
  etanol:    { nome: "Etanol" },
  comum:     { nome: "Gasolina comum" },
  aditivada: { nome: "Gasolina aditivada", fator: 1.0 },
  premium: {
    nome: "Gasolina premium",
    marcas: {
      "Petrobras Podium":               1.0,
      "Shell V-Power Racing":           1.0,
      "Ipiranga Ipimax Pro":            1.0,
      "Petronas Primax Alta Octanagem": 1.0,
      "Outra marca":                    1.0
    }
  }
};
const MARCA_PADRAO = "Outra marca";

const NOME_PERCURSO = { cidade: "Cidade", estrada: "Estrada", misto: "Misto" };

const BENEFICIOS_PREMIUM = [
  ["Maior octanagem:", "resiste melhor à compressão e previne detonação (\"batida de pino\")."],
  ["Proteção do motor:", "reduz severamente o risco de detonação em motores de alta taxa de compressão e turbo, preservando componentes internos a longo prazo."],
  ["Motor mais limpo:", "aditivos detergentes e dispersantes de última geração previnem a formação de carbonização em válvulas e bicos injetores."],
  ["Melhor desempenho:", "respostas mais vigorosas e potência estável em motores calibrados para combustíveis de alta octanagem."],
  ["Menor teor de etanol:", "contém 25% de etanol anidro (contra 32% da comum/aditivada), proporcionando maior densidade energética."],
  ["Rendimento e autonomia:", "o ganho efetivo de km/L ocorre em motores com tecnologia que ajusta avanço de ignição para alta octanagem; em motores convencionais a autonomia energética é equivalente."]
];

/* ====================== Utilitários DOM e Formatação ====================== */

const $ = id => document.getElementById(id);
const brl = n => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const pct = n => (n * 100).toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "%";
const f1  = n => n.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

const temProp = (obj, chave) => Object.prototype.hasOwnProperty.call(obj, chave);
const marcaValida = b => (typeof b === "string" && temProp(EFICIENCIA.premium.marcas, b)) ? b : MARCA_PADRAO;

function removerAcentos(s) {
  return String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function el(tag, props, ...filhos) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props || {})) {
    if (k === "class") n.className = v; else n.setAttribute(k, v);
  }
  n.append(...filhos);
  return n;
}

function parseNumero(v) {
  let s = String(v).trim().replace(/\s/g, "");
  if (!s) return null;
  if (s.includes(",")) s = s.replace(/\./g, "").replace(",", ".");
  else if ((s.match(/\./g) || []).length > 1) s = s.replace(/\./g, "");
  if (!/^\d*\.?\d*$/.test(s) || s === "." ) return null;
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/* ====================== Máscaras de Digitação ====================== */

function formatarCampo(bruto, cfg, apagando) {
  const s = bruto.replace(/\./g, ",").replace(/[^\d,]/g, "");
  const i = s.indexOf(",");
  let temVirgula = i >= 0;
  let inteiro = temVirgula ? s.slice(0, i) : s;
  let dec = temVirgula ? s.slice(i + 1).replace(/,/g, "") : "";

  if (!temVirgula && cfg.autoComma && !apagando) {
    const n = 1;
    if (inteiro.length >= n) {
      dec = inteiro.slice(n);
      inteiro = inteiro.slice(0, n);
      temVirgula = true;
    }
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

/* ====================== Inicialização e Filtro do Seletor de Carros ====================== */

const brandSel = $("brand");
Object.keys(EFICIENCIA.premium.marcas).forEach(m =>
  brandSel.appendChild(el("option", { value: m }, m)));

const carroSel = $("carro");
const buscaCarroInput = $("buscaCarro");
const toggleVeiculoFlexEl = $("toggleVeiculoFlex");
const toggleFlexDescEl = $("toggleFlexDesc");
const carroLabelEl = $("carroLabel");

function popularSeletorCarros(filtroTexto = "") {
  const modoFlex = toggleVeiculoFlexEl ? toggleVeiculoFlexEl.checked : true;
  const valorAtual = carroSel.value || "focus_do_rafa";
  carroSel.replaceChildren();

  if (carroLabelEl) {
    carroLabelEl.textContent = modoFlex ? "Veículo Flex e Versão" : "Veículo a Gasolina e Versão";
  }
  if (toggleFlexDescEl) {
    toggleFlexDescEl.textContent = modoFlex
      ? "Ativado: listando apenas carros flex (Etanol/Gasolina). Desative para ver carros exclusivamente a Gasolina"
      : "Desativado: listando veículos exclusivamente a Gasolina (não aceitam etanol)";
  }

  const termo = removerAcentos(filtroTexto.trim());
  let primeiroEncontrado = null;
  let valorAtualAindaExiste = false;

  // 1. Topo: Destaque Especial (Apresentação uniforme em ambos os modos)
  const itensDestaque = [
    ["focus_do_rafa", CARRO_DESTAQUE.focus_do_rafa.nome],
    [CARRO_PERSONALIZADO, "Informar consumo oficial do meu carro"]
  ].filter(([chave, nome]) => {
    if (!termo) return true;
    return removerAcentos(nome).includes(termo);
  });

  if (itensDestaque.length > 0) {
    const optgroupDestaque = document.createElement("optgroup");
    optgroupDestaque.label = "⭐ Destaque Especial";
    for (const [chave, nome] of itensDestaque) {
      const opt = document.createElement("option");
      opt.value = chave;
      opt.textContent = nome;
      if (!primeiroEncontrado) primeiroEncontrado = chave;
      if (chave === valorAtual) valorAtualAindaExiste = true;
      optgroupDestaque.appendChild(opt);
    }
    carroSel.appendChild(optgroupDestaque);
  }

  // 2. Montadoras em estrita ordem alfabética com separação Flex vs Gasolina
  const montadorasOrdenadas = Object.keys(MONTADORAS).sort((a, b) => a.localeCompare(b, "pt-BR"));

  for (const montadora of montadorasOrdenadas) {
    const carrosDaMontadora = Object.entries(MONTADORAS[montadora]).filter(([, carro]) => {
      // Separação estrita: Modo Flex só lista flex; Modo Gasolina só lista exclusivamente a gasolina
      const ehFlex = carro.etanol !== null;
      if (modoFlex && !ehFlex) return false;
      if (!modoFlex && ehFlex) return false;

      if (!termo) return true;
      return removerAcentos(carro.nome).includes(termo) || removerAcentos(montadora).includes(termo);
    });

    if (carrosDaMontadora.length > 0) {
      const optgroup = document.createElement("optgroup");
      optgroup.label = "🚗 " + montadora;
      for (const [chave, carro] of carrosDaMontadora) {
        const opt = document.createElement("option");
        opt.value = chave;
        opt.textContent = carro.nome;
        if (!primeiroEncontrado) primeiroEncontrado = chave;
        if (chave === valorAtual) valorAtualAindaExiste = true;
        optgroup.appendChild(opt);
      }
      carroSel.appendChild(optgroup);
    }
  }

  // 3. Grupo Padrões Médios de Mercado
  const opcoesGerais = (modoFlex
    ? [[CARRO_GENERICO, CARROS_MAP[CARRO_GENERICO].nome]]
    : [[CARRO_GASOLINA_GENERICO, CARROS_MAP[CARRO_GASOLINA_GENERICO].nome]]
  ).filter(([chave, nome]) => {
    if (!termo) return true;
    return removerAcentos(nome).includes(termo);
  });

  if (opcoesGerais.length > 0) {
    const optgroupGeral = document.createElement("optgroup");
    optgroupGeral.label = "⚙️ Padrões Médios de Mercado";
    for (const [chave, nome] of opcoesGerais) {
      const opt = document.createElement("option");
      opt.value = chave;
      opt.textContent = nome;
      if (!primeiroEncontrado) primeiroEncontrado = chave;
      if (chave === valorAtual) valorAtualAindaExiste = true;
      optgroupGeral.appendChild(opt);
    }
    carroSel.appendChild(optgroupGeral);
  }

  // Se nada foi encontrado na busca
  if (!primeiroEncontrado) {
    const optVazio = document.createElement("option");
    optVazio.value = "";
    optVazio.textContent = modoFlex
      ? "Nenhum veículo flex encontrado (desative o toggle flex para ver carros a gasolina)"
      : "Nenhum veículo a gasolina encontrado";
    optVazio.disabled = true;
    optVazio.selected = true;
    carroSel.appendChild(optVazio);
  } else {
    carroSel.value = valorAtualAindaExiste ? valorAtual : primeiroEncontrado;
  }
}

// Inicializa o seletor com o Focus do Rafa pré-selecionado por padrão
popularSeletorCarros();
carroSel.value = "focus_do_rafa";

buscaCarroInput.addEventListener("input", e => {
  popularSeletorCarros(e.target.value);
  esconderResultado();
  atualizarCampos();
});

const toggleDieselEl = $("toggleDiesel");
const toggleEtanolEl = $("toggleEtanol");
const toggleRachadorEl = $("toggleRachador");
const litrosMisturaEl = $("litrosMistura");

// Identifica se o veículo atual suporta etanol
function etanolAtivo() {
  if (toggleDieselEl.checked) return false;
  if (toggleVeiculoFlexEl && !toggleVeiculoFlexEl.checked) return false;
  const escolha = carroSel.value;
  if (escolha === CARRO_PERSONALIZADO) {
    return toggleEtanolEl.checked;
  }
  const carro = CARROS_MAP[escolha];
  return carro && carro.etanol !== null;
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

function obterCarro() {
  const escolha = carroSel.value;
  if (!escolha) {
    return { erro: "Selecione um veículo válido na lista." };
  }
  if (escolha !== CARRO_PERSONALIZADO) {
    const c = CARROS_MAP[escolha] || CARROS_MAP["focus_do_rafa"];
    return { carro: c };
  }
  const comEtanol = etanolAtivo();
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

/* ====================== Rabo de Galo (Mistura 50/50 com Emoji de Drink) ====================== */

function calcularRaboDeGalo(litrosTotal, precoEtanol, precoGas, tipoGasolina) {
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

const PRECO_MIN = 2.0;
const PRECO_MAX = 10.0;

function atualizarModoRachador() {
  const container = $("rachadorResult");
  if (!toggleRachadorEl.checked || !etanolAtivo()) {
    container.replaceChildren();
    return;
  }

  const cards = [];
  const rawLitros = (litrosMisturaEl.value || "").trim();
  const litros = parseNumero(rawLitros);

  if (litros === null || isNaN(litros) || litros < 5 || litros > 150) {
    cards.push(el("div", { class: "tip", style: "border-color: var(--danger); color: var(--danger);" },
      "⚠️ Informe um volume de tanque válido para a mistura (entre 5 e 150 litros)."
    ));
    container.replaceChildren(...cards);
    return;
  }

  const pEtanol = parseNumero($("etanol").value);
  const pComum = parseNumero($("comum").value);
  const pPremium = parseNumero($("premium").value);

  if (pEtanol === null || (pComum === null && pPremium === null)) {
    cards.push(el("div", { class: "tip" },
      "💡 Para calcular a mistura, informe o preço do ", el("b", {}, "Etanol"),
      " e de pelo menos uma gasolina (", el("b", {}, "Comum"), " ou ", el("b", {}, "Premium"), ")."
    ));
    container.replaceChildren(...cards);
    return;
  }

  const precosInformados = [
    { nome: "etanol", val: pEtanol },
    { nome: "gasolina comum", val: pComum },
    { nome: "gasolina premium", val: pPremium }
  ].filter(p => p.val !== null);

  const foraDaFaixa = precosInformados.filter(p => p.val < PRECO_MIN || p.val > PRECO_MAX);
  if (foraDaFaixa.length > 0) {
    const nomes = foraDaFaixa.map(p => p.nome).join(" e ");
    cards.push(el("div", { class: "tip", style: "border-color: var(--danger); color: var(--danger);" },
      `⚠️ O preço de ${nomes} deve estar entre R$ ${f1(PRECO_MIN)} e R$ ${f1(PRECO_MAX)} por litro.`
    ));
    container.replaceChildren(...cards);
    return;
  }

  // Mistura com Gasolina Comum (32% de etanol anidro)
  if (pComum !== null) {
    const res = calcularRaboDeGalo(litros, pEtanol, pComum, "comum");
    cards.push(el("div", { class: "rachador-card comum" },
      el("div", { class: "rachador-title" }, "🍹 Rabo de Galo 50/50 com Gasolina Comum"),
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
    const res = calcularRaboDeGalo(litros, pEtanol, pPremium, "premium");
    cards.push(el("div", { class: "rachador-card premium" },
      el("div", { class: "rachador-title" }, "🍸 Rabo de Galo 50/50 com Premium (" + brand + ")"),
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
    "Cálculo compensa o teor real de etanol já diluído na gasolina de refinaria (32% na comum e 25% na premium) para obter exatamente 50% de etanol e 50% de gasolina pura no volume de " + f1(litros) + " L."
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
  if (preenchidos.some(v => v < PRECO_MIN)) {
    esconderResultado();
    return mostrarErro(`Algum preço parece baixo demais. Informe valores realistas por litro (entre R$ ${f1(PRECO_MIN)} e R$ ${f1(PRECO_MAX)}).`);
  }
  if (preenchidos.some(v => v > PRECO_MAX)) {
    esconderResultado();
    return mostrarErro(`Algum preço parece alto demais. Informe valores realistas por litro (entre R$ ${f1(PRECO_MIN)} e R$ ${f1(PRECO_MAX)}).`);
  }

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

  // Melhor opção em cada percurso
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

  // Ponto de equilíbrio do etanol
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
      "Não há regulamentação técnica da ANP que exija proporção mínima garantida de aditivo para venda nos postos.",
      el("br"), el("br"),
      el("b", {}, "💡 Recomendação prática: "),
      "É muito mais vantajoso ",
      el("b", {}, "abastecer com gasolina comum e colocar você mesmo um frasco de aditivo avulso"),
      " de marca confiável e certificada, ou optar por ",
      el("b", {}, "gasolina premium"),
      ", especialmente em modelos turbo, com injeção direta ou alta taxa de compressão."
    ));
  }

  if (prices.premium !== null) {
    const ul = el("ul");
    BENEFICIOS_PREMIUM.forEach(([titulo, texto]) => ul.append(el("li", {}, el("b", {}, titulo), " " + texto)));
    partes.push(el("div", { class: "benefits" },
      el("h3", {}, "⭐ Principais benefícios da gasolina premium (" + brand + ")"),
      ul,
      el("p", { class: "note" }, "A gasolina premium conta com apenas 25% de etanol anidro (contra 32% da comum/aditivada) e octanagem muito superior (RON 98 a 102). Os benefícios mecânicos são comprovados em motores modernos, turbo, híbridos e esportivos.")));
  }

  // Disclaimer sobre viagens curtas e etanol
  partes.push(el("div", { class: "tip warning" },
    el("b", {}, "⚠️ Viagens curtas e saúde do motor: "),
    "Trajetos curtos (menos de 15 minutos) degradam severamente o óleo lubrificante antes do prazo, pois o motor não atinge a temperatura ideal para evaporar resíduos e umidade. O ",
    el("b", {}, "etanol é um forte agravante"),
    " por condensar em excesso nos cilindros frios e escorrer para o cárter."
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

function atualizarTitulo(emoji, texto) {
  const emojiEl = $("titleEmoji");
  const textEl = $("titleText");
  const titleEl = $("mainTitle") || document.querySelector("h1");
  if (emojiEl && textEl) {
    emojiEl.textContent = emoji;
    textEl.textContent = texto;
  } else if (titleEl) {
    titleEl.textContent = emoji + " " + texto;
  }
  document.title = texto + " – Calculadora";
}

function atualizarCampos() {
  const isDiesel = toggleDieselEl.checked;

  if (isDiesel) {
    $("mainContent").hidden = true;
    $("dieselMessage").hidden = false;
    atualizarTitulo("🚛", "Combustível Incompatível com a Calculadora");
    return;
  } else {
    $("mainContent").hidden = false;
    $("dieselMessage").hidden = true;
  }

  const custom = carroSel.value === CARRO_PERSONALIZADO;
  const comEtanol = etanolAtivo();

  // Título dinâmico da página adaptativo com cores originais dos emojis
  if (!comEtanol) {
    atualizarTitulo("⛽", "Comum, aditivada ou premium?");
  } else {
    atualizarTitulo("⛽", "Etanol ou Gasolina?");
  }

  $("brandField").hidden = parseNumero($("premium").value) === null;
  $("carroCustom").hidden = !custom;
  if (custom) {
    $("customEtanolFields").hidden = !comEtanol;
  }
  $("etanolField").hidden = !comEtanol;

  // Seção do Rabo de Galo: apenas para veículos que aceitam etanol
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
  if (e.target.name === "percurso" || e.target.id === "buscaCarro") return;
  if (e.target.id === "litrosMistura") {
    atualizarModoRachador();
    return;
  }
  esconderResultado();
  atualizarCampos();
});

toggleVeiculoFlexEl.addEventListener("change", () => {
  const modoFlex = toggleVeiculoFlexEl.checked;
  const carroAtual = CARROS_MAP[carroSel.value];
  if (modoFlex && carroAtual && carroAtual.etanol === null && carroSel.value !== CARRO_PERSONALIZADO) {
    carroSel.value = "focus_do_rafa";
  } else if (!modoFlex && carroAtual && carroAtual.etanol !== null && carroSel.value !== CARRO_PERSONALIZADO && carroSel.value !== "focus_do_rafa") {
    carroSel.value = "focus_do_rafa";
  }
  popularSeletorCarros(buscaCarroInput.value);
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

litrosMisturaEl.addEventListener("input", e => {
  const limpo = e.target.value.replace(/\D/g, "").slice(0, 3);
  if (e.target.value !== limpo) {
    e.target.value = limpo;
  }
  atualizarModoRachador();
});

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
