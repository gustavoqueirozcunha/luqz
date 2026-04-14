"""
carousel_renderer.py — Script Base Reutilizável LUQZ
Designer Oficial do OpenSquad

USO:
  from carousel_renderer import *
  img, d = new_canvas(BG_DARK)
  # ... desenhe ...
  save(img, OUT_DIR, "C1_01_capa")

FONTES: Lato (sistema). Mapeie com f("Black", 128), f("Regular", 46), etc.
CANVAS: 1080x1350 (IG 4:5) por padrão.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, random

# ─── CANVAS ───────────────────────────────────────────────
W, H = 1080, 1350

# ─── CORES PADRÃO LUQZ ───────────────────────────────────
BG_DARK    = (17, 17, 17)
BG_CHUMBO  = (11, 15, 26)
BG_LIGHT   = (250, 250, 250)
WHITE      = (255, 255, 255)
WHITE_SOFT = (245, 245, 245)
GREY_FADE  = (136, 136, 136)
BLACK      = (12, 12, 12)
ACCENT     = (91, 141, 196)   # Azul Marinho Metálico — luminoso (dark bg)
ACCENT_DEEP= (46, 80, 128)    # Azul Marinho Metálico — profundo (light bg)

# ─── FONTES ───────────────────────────────────────────────
_LATO = "/usr/share/fonts/truetype/lato"
_FONT_MAP = {
    "Black":     "Lato-Black.ttf",
    "ExtraBold": "Lato-Black.ttf",
    "Bold":      "Lato-Bold.ttf",
    "SemiBold":  "Lato-Semibold.ttf",
    "Medium":    "Lato-Medium.ttf",
    "Regular":   "Lato-Regular.ttf",
    "Light":     "Lato-Light.ttf",
    "Thin":      "Lato-Thin.ttf",
}

def f(weight: str, size: int) -> ImageFont.FreeTypeFont:
    """Retorna fonte Lato com o peso e tamanho desejados."""
    return ImageFont.truetype(f"{_LATO}/{_FONT_MAP[weight]}", size)

# ─── HELPERS GERAIS ──────────────────────────────────────

def new_canvas(bg_color: tuple) -> tuple:
    """Cria canvas 1080x1350 com a cor de fundo e retorna (img, draw)."""
    img = Image.new("RGB", (W, H), bg_color)
    return img, ImageDraw.Draw(img)

def text_size(draw, text: str, font) -> tuple:
    """Retorna (width, height) de um texto."""
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]

def add_noise(img, intensity: int = 8, blend: float = 0.04):
    """
    Aplica ruído de granulação suave (~4% blend) para quebrar o fundo 100% chapado.
    Mantém o visual premium sem textura caricata.
    """
    noise = Image.new("RGB", img.size)
    px = noise.load()
    for x in range(0, img.size[0], 2):
        for y in range(0, img.size[1], 2):
            v = random.randint(-intensity, intensity)
            px[x, y] = (max(0, min(255, v + 128)),) * 3
    noise = noise.filter(ImageFilter.GaussianBlur(0.5))
    return Image.blend(img, Image.eval(noise, lambda p: p), blend)

def footer_counter(draw, idx: int, total: int, color=GREY_FADE):
    """Contador discreto '01 / 05' no canto inferior direito."""
    font = f("Medium", 24)
    txt = f"{idx:02d} / {total:02d}"
    tw, th = text_size(draw, txt, font)
    draw.text((W - 80 - tw, H - 60 - th), txt, font=font, fill=color)

def arrow_hint(draw, color=WHITE_SOFT):
    """'ARRASTE →' no canto inferior esquerdo das capas."""
    font = f("SemiBold", 26)
    draw.text((120, H - 90), "ARRASTE  →", font=font, fill=color)

def save(img, out_dir: str, filename: str):
    """Salva o PNG final com qualidade máxima."""
    os.makedirs(out_dir, exist_ok=True)
    path = os.path.join(out_dir, f"{filename}.png")
    img.save(path, "PNG", quality=95)
    return path

# ─── COMPONENTES REUTILIZÁVEIS ───────────────────────────

def draw_accent_bar(draw, x: int = 100, y_top: int = 340, y_bottom: int = 1010,
                    width: int = 8, color=ACCENT):
    """
    Barra vertical fina na lateral esquerda das capas.
    Serve como âncora visual e marcador de brand.
    """
    draw.rectangle([x, y_top, x + width, y_bottom], fill=color)

def draw_tag(draw, x: int, y: int, text: str, color=ACCENT, size: int = 32) -> tuple:
    """
    Tag de seção (ex: 'PROVA 01 — COMPROVANTES') em maiúsculas.
    Retorna (x_end, y_end) para posicionar o próximo elemento.
    """
    font = f("SemiBold", size)
    draw.text((x, y), text.upper(), font=font, fill=color)
    tw, th = text_size(draw, text.upper(), font)
    # traço fino abaixo da tag (divisor editorial)
    draw.rectangle([x, y + th + 20, x + 80, y + th + 22], fill=color)
    return x + tw, y + th + 22

def draw_divider(draw, y: int, x1: int = 100, x2: int = W - 100,
                 color=GREY_FADE, width: int = 1):
    """Linha horizontal de 1px — divide seções (ex: mito vs. resposta)."""
    draw.line([(x1, y), (x2, y)], fill=color, width=width)

def draw_multiline(draw, x: int, y: int, lines: list, weight: str, size: int,
                   color: tuple, line_height_pct: int = 140) -> int:
    """
    Desenha múltiplas linhas simples com line-height controlado.
    Retorna o y final após o último texto.
    """
    font = f(weight, size)
    a, d = font.getmetrics()
    lh = int((a + d) * line_height_pct / 100)
    for line in lines:
        draw.text((x, y), line, font=font, fill=color)
        y += lh
    return y

def draw_mixed_line(draw, x: int, y: int, segments: list) -> tuple:
    """
    Desenha uma linha com múltiplos spans de estilo diferente.
    segments: lista de (text, weight, size, color)
    Retorna (x_after, y_after) — y_after = y + altura da linha.
    """
    max_h = 0
    cx = x
    for text, weight, size, color in segments:
        font = f(weight, size)
        draw.text((cx, y), text, font=font, fill=color)
        tw, _ = text_size(draw, text, font)
        a, d = font.getmetrics()
        max_h = max(max_h, a + d)
        cx += tw
    return cx, y + max_h

def draw_cta_button(draw, label: str, btn_y: int = 1050,
                    btn_w: int = 820, btn_h: int = 120,
                    bg_color: tuple = BLACK, text_color: tuple = WHITE,
                    radius: int = 60, font_size: int = 42):
    """
    Botão CTA estilo iOS pill (cantos totalmente arredondados).
    Centralizado na largura do canvas.
    """
    bx1 = (W - btn_w) // 2
    bx2 = bx1 + btn_w
    draw.rounded_rectangle([bx1, btn_y, bx2, btn_y + btn_h],
                            radius=radius, fill=bg_color)
    btn_font = f("ExtraBold", font_size)
    tw, th = text_size(draw, label, btn_font)
    draw.text((W // 2 - tw // 2, btn_y + btn_h // 2 - th // 2 - 4),
              label, font=btn_font, fill=text_color)

def draw_hoje_box(draw, x: int, y: int, pre_text: str, pos_text: str = ".",
                  accent_color: tuple = ACCENT_DEEP,
                  font_weight: str = "Bold", size: int = 44) -> int:
    """
    Escreve 'Texto HOJE.' onde HOJE fica dentro de uma caixa arredondada colorida.
    Usado nos slides CTA. Retorna y final.
    """
    font = f(font_weight, size)
    hoje_f = f("Black", size)
    pre_w, _ = text_size(draw, pre_text, font)
    hw, hh = text_size(draw, "HOJE", hoje_f)
    pos_w, _ = text_size(draw, pos_text, font)
    total = pre_w + hw + 30 + pos_w
    sx = (W - total) // 2  # centraliza
    draw.text((sx, y), pre_text, font=font, fill=BLACK)
    box_x1 = sx + pre_w
    draw.rounded_rectangle([box_x1, y - 4, box_x1 + hw + 30, y + hh + 12],
                            radius=12, fill=accent_color)
    draw.text((box_x1 + 15, y), "HOJE", font=hoje_f, fill=WHITE)
    draw.text((box_x1 + hw + 30, y), pos_text, font=font, fill=BLACK)
    _, th = text_size(draw, pre_text, font)
    return y + int(th * 1.4)

def draw_giant_quote(img, draw, size: int = 520, opacity: int = 38,
                     color: tuple = ACCENT, pos: tuple = (80, -80)):
    """
    Aspas gigantes transparentes no fundo — padrão capa Carrossel Mitos.
    Renderizado em layer RGBA para respeitar opacidade.
    """
    layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ld = ImageDraw.Draw(layer)
    quote_f = f("Black", size)
    ld.text(pos, "\u201C", font=quote_f, fill=(*color, opacity))
    img.paste(layer, (0, 0), layer)

# ─── TEMPLATES PRONTOS ───────────────────────────────────

def render_capa_provas(draw, img, h1_line1: str, h1_line2: str,
                       h2_pre: str, hoje_word: str, body_lines: list,
                       slide_num: int, total: int, accent=ACCENT):
    """
    Template: Capa de carrossel educacional/solução.
    Layout: barra vertical acento | H1 gigante | 'que você tem HOJE' | body regular
    """
    draw_accent_bar(draw, x=100, y_top=340, y_bottom=1010, color=accent)
    x = 140; y = 380
    h1 = f("Black", 128)
    draw.text((x, y), h1_line1, font=h1, fill=WHITE); y += 140
    draw.text((x, y), h1_line2, font=h1, fill=WHITE); y += 170

    # HOJE com sublinhado
    h2 = f("Bold", 72); hoje_f = f("Black", 72)
    draw.text((x, y), h2_pre, font=h2, fill=WHITE_SOFT)
    pre_w, _ = text_size(draw, h2_pre, h2)
    hx = x + pre_w
    draw.text((hx, y), hoje_word, font=hoje_f, fill=accent)
    hw, hh = text_size(draw, hoje_word, hoje_f)
    draw.rectangle([hx, y + hh + 6, hx + hw, y + hh + 12], fill=accent)
    y += 110

    body_f = f("Regular", 46)
    for ln in body_lines:
        draw.text((x, y), ln, font=body_f, fill=WHITE_SOFT); y += 62

    arrow_hint(draw)
    footer_counter(draw, slide_num, total)


def render_inner_proof(draw, tag_text: str, body_blocks: list,
                       slide_num: int, total: int, x: int = 120, accent=ACCENT):
    """
    Template: Slide interno de prova/educação.
    Layout: Tag accent | traço divisor | blocos de corpo | punchline final
    body_blocks: lista de (linhas[], weight, size, color, line_height_pct)
    """
    y = 220
    _, y_tag = draw_tag(draw, x, y, tag_text, color=accent)
    y = y_tag + 68
    for lines, weight, size, color, lh_pct in body_blocks:
        y = draw_multiline(draw, x, y, lines, weight, size, color, lh_pct)
    footer_counter(draw, slide_num, total, color=GREY_FADE)


def render_myth_slide(draw, myth_num: int, myth_lines: list,
                      verdict: str, response_lines: list,
                      slide_num: int, total: int, accent=ACCENT,
                      divider_y: int = 650):
    """
    Template: Slide de mito (desmistificação).
    Layout: Mito apagado (topo) | divisor 1px | Resposta em punch (fundo)
    """
    x = 120
    # Tag e aspas do mito (fade)
    tag_f = f("SemiBold", 30)
    draw.text((x, 180), f"MITO 0{myth_num}", font=tag_f, fill=(120, 120, 130))
    tw, th = text_size(draw, f"MITO 0{myth_num}", tag_f)
    draw.rectangle([x, 180 + th + 16, x + 60, 180 + th + 18], fill=(120, 120, 130))
    quote_f = f("Black", 70)
    draw.text((x, 240), "\u201C", font=quote_f, fill=(120, 120, 130))
    mito_f = f("Light", 42)
    y = 290
    for ln in myth_lines:
        draw.text((148, y), ln, font=mito_f, fill=(145, 150, 160))
        y += int((mito_f.getmetrics()[0] + mito_f.getmetrics()[1]) * 1.35)

    # Divisor central
    draw_divider(draw, divider_y, color=(70, 80, 100))

    # Resposta do advogado
    resp_tag_f = f("SemiBold", 30)
    draw.text((x, 700), "A RESPOSTA RÁPIDA:", font=resp_tag_f, fill=accent)
    tw2, th2 = text_size(draw, "A RESPOSTA RÁPIDA:", resp_tag_f)
    draw.rectangle([x, 700 + th2 + 14, x + 80, 700 + th2 + 16], fill=accent)

    # Veredito colossal
    ver_sz = 128 if len(verdict) <= 8 else 92
    ver_f = f("Black", ver_sz)
    draw.text((x, 768), verdict, font=ver_f, fill=accent)
    vw, vh = text_size(draw, verdict, ver_f)
    y_resp = 768 + vh + 40

    resp_f = f("Bold", 38)
    for ln in response_lines:
        draw.text((x, y_resp), ln, font=resp_f, fill=WHITE)
        y_resp += int((resp_f.getmetrics()[0] + resp_f.getmetrics()[1]) * 1.30)

    footer_counter(draw, slide_num, total)


def render_cta_dark(draw, img, title_lines: list, accent_phrase: str,
                    sub_lines: list, cta_label: str,
                    slide_num: int, total: int, accent=ACCENT):
    """
    Template: Slide CTA em fundo escuro (Carrossel 2 / Mitos).
    Layout: Título grande centralizado (gradiente cinza→branco) | Subtexto | Botão pill
    """
    xc = W // 2; y = 200
    sizes = [76, 64, 64, 64, 64]
    for i, (text, color, size) in enumerate(title_lines):
        ft = f("ExtraBold", size) if size >= 70 else f("Bold", size)
        tw, th = text_size(draw, text, ft)
        draw.text((xc - tw // 2, y), text, font=ft, fill=color)
        y += int((ft.getmetrics()[0] + ft.getmetrics()[1]) * 1.15)

    # Frase de destaque em accent
    af = f("ExtraBold", 68)
    tw, _ = text_size(draw, accent_phrase, af)
    draw.text((xc - tw // 2, y), accent_phrase, font=af, fill=accent)
    y += int((af.getmetrics()[0] + af.getmetrics()[1]) * 1.35)

    sub_f = f("Medium", 34)
    for ln in sub_lines:
        tw, _ = text_size(draw, ln, sub_f)
        draw.text((xc - tw // 2, y), ln, font=sub_f, fill=(180, 185, 195))
        y += int((sub_f.getmetrics()[0] + sub_f.getmetrics()[1]) * 1.40)

    draw_cta_button(draw, cta_label, btn_y=1120, bg_color=WHITE,
                    text_color=BG_CHUMBO, font_size=40)
    footer_counter(draw, slide_num, total, color=(120, 125, 140))


def render_cta_light(draw, title_lines: list, cta_label: str,
                     slide_num: int, total: int, accent_deep=ACCENT_DEEP):
    """
    Template: Slide CTA break view em fundo claro (Carrossel 1 / Provas).
    A inversão para branco força parada do scroll — efeito 'parede branca'.
    Layout: Título bold preto | 'Vamos dar entrada nisso HOJE.' | Botão pill preto
    """
    xc = W // 2; y = 300
    h_f = f("ExtraBold", 62)
    for ln in title_lines:
        tw, th = text_size(draw, ln, h_f)
        draw.text((xc - tw // 2, y), ln, font=h_f, fill=BLACK)
        y += int((h_f.getmetrics()[0] + h_f.getmetrics()[1]) * 1.12)
    y += 60
    y = draw_hoje_box(draw, xc, y, "Vamos dar entrada nisso ", accent_color=accent_deep)
    draw_cta_button(draw, cta_label, btn_y=1050, bg_color=BLACK,
                    text_color=WHITE, font_size=42)

    micro = f("Medium", 22)
    msg = "Atendimento direto com a equipe técnica"
    tw, _ = text_size(draw, msg, micro)
    draw.text((xc - tw // 2, 1185), msg, font=micro, fill=(100, 100, 100))
    footer_counter(draw, slide_num, total, color=(160, 160, 160))
