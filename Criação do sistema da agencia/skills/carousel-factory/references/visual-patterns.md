# Padrões Visuais LUQZ — Referência do Designer

> Guia de decisões visuais para o gerador Python. Consulte aqui antes de escrever qualquer layout novo.

---

## 1. Tipos de Carrossel e Quando Usar

| Tipo | Pilar | Fundo | Energia | Exemplo |
|------|-------|-------|---------|---------|
| **Educacional / Solução** | Provas, Checklists, Tutoriais | `#111111` (Preto) | Clean, controlado | "3 Provas do seu celular" |
| **Mitos / Quebra de Crença** | Desmistificação, Erros | `#0B0F1A` (Chumbo Blue) | Agressivo, libertador | "3 Mitos do Divórcio" |
| **Dor Direta** | Hook, Urgência | `#111111` ou `#0B0F1A` | Pesado, impactante | "Esperando ele ter vontade?" |
| **Autoridade / Posicionamento** | Credibilidade | `#0B0F1A` com acento forte | Sólido, institucional | "Por que processos arrastam?" |

---

## 2. Anatomia de Cada Slide

### 2.1 — Capa (Slide 01)

```
┌────────────────────────────────┐
│  [respiro 340px]               │
│ ╎ H1 GIGANTE                   │ ← Lato-Black 128px, Branco
│ ╎ H1 LINHA 2                   │   line-height 110%
│ ╎                              │
│ ╎ que você tem HOJE            │ ← HOJE em Acento + sublinhado
│ ╎ body complementar            │ ← Lato-Regular 46px
│  [respiro]                     │
│  ARRASTE →        01/05        │
└────────────────────────────────┘
  ╎ = barra vertical 8px Acento
```

**Decisões técnicas:**
- Barra vertical: 8px largura × 670px altura, colada na margem esquerda (x=100)
- Texto inicia em x=140 (8px barra + 32px gap)
- HOJE: sublinhado de 6px de espessura, 6px abaixo da linha de base da fonte
- ARRASTE hint: x=120, y=H-90, Lato-SemiBold 26px, branco-soft

---

### 2.2 — Slide Interno Educacional (Slides 02-04 do Carrossel Educação)

```
┌────────────────────────────────┐
│  [respiro 220px]               │
│  PROVA 01 — COMPROVANTES       │ ← Tag: Lato-SemiBold 32px, Acento
│  ────────                      │ ← traço 80px × 2px, Acento
│  [espaço 68px]                 │
│  Corpo de texto regular        │ ← Lato-Regular 52px, Branco
│  continuação do texto          │   line-height 140%
│                                │
│  PUNCHLINE FINAL               │ ← Lato-Black 64-72px, Branco
│  Prinque tudo.                 │ ← Lato-Bold 50px, Acento (se italics)
│                                │
│                     02/05      │
└────────────────────────────────┘
```

**Regra do Punchline:**
- A última frase ou palavra que "fecha o argumento" sempre é maior e mais pesada
- Palavra-chave isolada (ex: "ÓBVIO", "ÓBVIO.") ganha Black + 72px no mínimo
- Frase final de ação (ex: "Prinque tudo.") ganha Bold + Acento

---

### 2.3 — Slide de Mito (Slides 02-04 do Carrossel Mitos)

```
┌────────────────────────────────┐
│  MITO 01               180px  │ ← SemiBold 30px, cinza(120,120,130)
│  ────                         │ ← traço 60px × 2px, mesmo cinza
│  "A casa tá no meu nome..."   │ ← Light 42px, cinza fade (145,150,160)
│                               │
│  ────────────────────────     │ ← divisor 1px, y=650, cor (70,80,100)
│                               │
│  A RESPOSTA RÁPIDA:           │ ← SemiBold 30px, Acento
│  ────────────                 │ ← traço 80px × 2px, Acento
│  FALSO.                       │ ← Black 128px (≤8 chars) ou 92px, Acento
│                               │
│  Todo imóvel adquirido...     │ ← Bold 38px, Branco, line-height 130%
│                     02/05     │
└────────────────────────────────┘
```

**A Regra Mestra de Fade Out e Punch:**
- O MITO é visualmente "fraco" — Light, cinza, sem força
- A RESPOSTA é visualmente "inquebrável" — Black/ExtraBold, Acento/Branco, dominante
- O cérebro lê isso inconscientemente antes de processar as palavras
- Distância mínima entre o fim do mito e "A RESPOSTA RÁPIDA:" = 120px verticais

---

### 2.4 — Slide CTA Educacional (Capa Invertida — "Break View")

```
┌────────────────────────────────┐  ← FUNDO BRANCO #FAFAFA
│                                │     (inversão forçada para parar o scroll)
│  Você já tem as provas.        │ ← ExtraBold 62px, Preto
│  A justiça só analisa          │
│  os fatos.                     │
│                                │
│  Vamos dar entrada nisso HOJE. │ ← Bold 44px + [HOJE em caixa Acento]
│                                │
│                                │
│  ┌──────────────────────────┐  │
│  │ CHAMAR NO WHATSAPP  →   │  │ ← Pill preto, ExtraBold 42px, Branco
│  └──────────────────────────┘  │   radius=60px
│  Atendimento direto...         │ ← Medium 22px, cinza (100,100,100)
│                     05/05      │
└────────────────────────────────┘
```

**Por que inverter o fundo:**
- Slides 01-04 são escuros. Quando o fundo muda para branco, o olho "bate na parede"
- Isso força uma micro-pausa — a pessoa não desliza automaticamente para sair
- É o equivalente visual de "bater o punho na mesa" antes do CTA
- NUNCA use o break view no meio do carrossel — só no último slide

---

### 2.5 — Slide CTA Autoridade (Fundo Escuro Contínuo — Mitos)

```
┌────────────────────────────────┐  ← FUNDO #0B0F1A (continua)
│                                │
│  A pior cegueira               │ ← ExtraBold 76px, Branco
│  é lutar contra um ex          │ ← Bold 64px, cinza suave (200,205,215)
│  narcisista baseando           │   — degradê percebido, não real
│  a sua sorte no medo           │
│  e em                          │
│  mentiras fáceis.              │ ← ExtraBold 68px, ACENTO (chamada)
│                                │
│  Você precisa de um escudo...  │ ← Medium 34px, (180,185,195)
│  montado pela sua defesa.      │
│                                │
│  Vamos dar fim a isso hoje.    │ ← ExtraBold 42px, Acento
│                                │
│  ┌──────────────────────────┐  │
│  │ CONTATO VIA WHATSAPP → │  │ ← Pill BRANCO, texto #0B0F1A
│  └──────────────────────────┘  │   radius=60px
└────────────────────────────────┘
```

**Regra do botão invertido em fundo escuro:**
- No fundo escuro, o botão é BRANCO com texto escuro (contraste máximo)
- No fundo claro (break view), o botão é PRETO com texto branco
- O texto do botão nunca usa cor de acento — só preto ou branco puro

---

## 3. Sistema de Tipografia

### Escala de Tamanhos

| Elemento | Tamanho | Peso | Uso |
|----------|---------|------|-----|
| H1 Capa | 128px | Black | Palavra/frase central da capa |
| H1 CTA Grande | 76-80px | ExtraBold | Título CTA dark |
| H1 CTA Médio | 62-68px | ExtraBold | Título CTA light |
| Veredicto (FALSO) | 128px (≤8c) / 92px | Black | Resposta nos mitos |
| Punchline Final | 64-72px | Black | Última frase de impacto |
| H2 Capa | 72-88px | Bold/Black | Variações do título |
| Corpo Principal | 50-60px | Regular | Corpo dos slides internos |
| Tag de Seção | 30-35px | SemiBold | "Prova 01 —", "Mito 02" |
| Rodapé | 22-26px | Medium | Contador, "ARRASTE →" |

### Line-heights

| Contexto | Line-height | Efeito |
|----------|-------------|--------|
| H1 Capa (bloco denso) | 110-120% | Letras quase se tocam — bloco visual sólido |
| Corpo de slide | 140% | Respiração confortável de leitura |
| Títulos CTA | 115% | Seco, pontual |
| Texto mito (apagado) | 135% | Leveza percebida |

---

## 4. Margem e Safe Zone

```
Canvas: 1080 × 1350px
┌─ 120px ──────────────── 120px ─┐  ← margem lateral mínima
│  (nunca texto aqui)            │
│                                │
│  ZONA SEGURA DE CONTEÚDO       │  ← 840px de largura útil
│                                │
│  (nunca texto aqui)            │
└─────────────────────── 60px ──┘  ← base: 60px acima do contador
                                    ← topo: 180-220px (clear UI IG)
```

**Regra dos 60%:** 
Pelo menos 60% do canvas deve ser "ar" — background sem elemento nenhum. Se o slide parece cheio, remova texto (não encurte as margens).

---

## 5. Elementos Gráficos Permitidos

| ✅ Pode usar | ❌ Nunca usar |
|-------------|--------------|
| Barra vertical de acento (8px) | Ícones flat/vetor genérico |
| Linha horizontal 1px (divisor) | Martelo de juiz |
| Aspas tipográficas " " em 10% opacidade | Balança da Justiça |
| Ruído de granulação (4% blend) | Estátua de Têmis |
| Caixa arredondada (tag, botão) | Fotos de banco de imagem |
| Pill button (raio 60px) | Livros de direito desfocados |

---

## 6. Cores de Acento por Cliente

> Sempre use o arquivo `sistema-visual.md` do cliente como fonte da verdade.

| Cliente | Acento Principal | Hex | Contexto |
|---------|-----------------|-----|----------|
| Dr. Cássio Goulart | Azul Marinho Metálico | `#5B8DC4` (lum.) / `#2E5080` (prof.) | Dark bg / Light bg |
| LUQZ Performance | (ver sistema-visual.md) | — | — |

Sempre travar uma única cor de acento por projeto/semana. Consistência de acento = reconhecimento de marca.

---

## 7. Fluxo de Decisão Rápida

Antes de cada slide, responda mentalmente:

1. **Objetivo da peça?** → Atração, Autoridade ou Conversão?
2. **É capa?** → Use render_capa_provas ou capa_mitos
3. **É slide interno?** → Use render_inner_proof ou render_myth_slide
4. **É CTA?** → É o último slide? Inverte fundo (claro) se carrossel 1 / mantém escuro se carrossel 2
5. **Qual palavra merece destaque máximo?** → Black + Acento nessa palavra, tudo mais recua
6. **Tem espaço suficiente?** → Se não, corte texto, nunca comprima margem
