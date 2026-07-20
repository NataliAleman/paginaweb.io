import re

def replace_emojis2(html):
    replacements = {
        '🐋': "<i class='bx bxl-docker'></i>",
        '🧩': "<i class='bx bx-extension'></i>",
        '♾️': "<i class='bx bx-infinite'></i>",
        '♾': "<i class='bx bx-infinite'></i>",
        '👷': "<i class='bx bx-hard-hat'></i>",
        '🔑': "<i class='bx bx-key'></i>",
        '🔐': "<i class='bx bx-lock'></i>",
        '💉': "<i class='bx bx-injection'></i>",
        '⚠️': "<i class='bx bx-error'></i>",
        '🛡️': "<i class='bx bx-shield'></i>",
        '🛡': "<i class='bx bx-shield'></i>",
        '🎨': "<i class='bx bx-palette'></i>",
        '🖌️': "<i class='bx bxl-figma'></i>",
        '🖌': "<i class='bx bxl-figma'></i>",
        '📐': "<i class='bx bx-ruler'></i>",
        '💎': "<i class='bx bx-diamond'></i>",
        '📄': "<i class='bx bx-file-blank'></i>",
        '🗂️': "<i class='bx bx-folder-open'></i>",
        '🗂': "<i class='bx bx-folder-open'></i>",
        '🏃': "<i class='bx bx-run'></i>",
        '🔄': "<i class='bx bx-sync'></i>",
        '📖': "<i class='bx bx-book'></i>",
        '📚': "<i class='bx bx-library'></i>",
        '🤝': "<i class='bx bx-group'></i>",
        '🪟': "<i class='bx bxl-windows'></i>",
        '🍏': "<i class='bx bxl-apple'></i>",
    }

    for emoji, tag in replacements.items():
        html = html.replace(emoji, tag)
    
    return html

if __name__ == '__main__':
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    new_html = replace_emojis2(html_content)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)

    print("Segundo reemplazo completado.")
