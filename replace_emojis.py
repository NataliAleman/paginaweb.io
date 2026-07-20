import re

def replace_emojis(html):
    replacements = {
        # About / Chips
        '📍': "<i class='bx bx-map'></i>",
        '📧': "<i class='bx bx-envelope'></i>",
        '📞': "<i class='bx bx-phone'></i>",
        '🌐': "<i class='bx bx-globe'></i>",
        
        # Categories
        '💻': "<i class='bx bx-code-alt'></i>",
        '⚙️': "<i class='bx bx-cog'></i>",
        '🗄️': "<i class='bx bx-data'></i>",
        '🧪': "<i class='bx bx-test-tube'></i>",
        '📋': "<i class='bx bx-list-check'></i>",
        '🔀': "<i class='bx bx-git-branch'></i>",
        '📦': "<i class='bx bx-package'></i>",
        '🖥️': "<i class='bx bx-desktop'></i>",
        '🖧': "<i class='bx bx-server'></i>",
        '🐳': "<i class='bx bxl-docker'></i>",
        '🍎': "<i class='bx bxl-apple'></i>",
        
        # Brands / Skills
        '☕': "<i class='bx bxl-java'></i>",
        '🔷': "<i class='bx bx-code-block'></i>", 
        '🐍': "<i class='bx bxl-python'></i>",
        '🐘': "<i class='bx bxl-php'></i>", 
        '⚡': "<i class='bx bxl-javascript'></i>",
        '🤖': "<i class='bx bxl-android'></i>",
        '🦀': "<i class='bx bx-code'></i>", 
        '🍃': "<i class='bx bxl-spring-boot'></i>", 
        '⚛️': "<i class='bx bxl-react'></i>",
        '🔴': "<i class='bx bxl-angular'></i>", 
        '🅱️': "<i class='bx bxl-bootstrap'></i>",
        '💚': "<i class='bx bxl-nodejs'></i>",
        '🚂': "<i class='bx bx-train'></i>",
        '🏗️': "<i class='bx bx-building'></i>",
        '🐬': "<i class='bx bx-water'></i>", 
        '📮': "<i class='bx bx-envelope'></i>",
        '🥒': "<i class='bx bx-bowl-rice'></i>",
        '🎭': "<i class='bx bx-mask'></i>",
        '🌲': "<i class='bx bx-tree'></i>",
        '✅': "<i class='bx bx-check-circle'></i>",
        '📊': "<i class='bx bx-bar-chart-alt-2'></i>",
        '🚀': "<i class='bx bx-rocket'></i>",
        '📘': "<i class='bx bx-book-bookmark'></i>", 
        '📌': "<i class='bx bxl-trello'></i>",
        '🔵': "<i class='bx bxl-microsoft'></i>", 
        '🐛': "<i class='bx bx-bug'></i>",
        '📝': "<i class='bx bx-file'></i>",
        '🔧': "<i class='bx bxl-git'></i>",
        '🐙': "<i class='bx bxl-github'></i>",
        '🦊': "<i class='bx bxl-gitlab'></i>",
        '🪣': "<i class='bx bx-bucket'></i>",
        '🌿': "<i class='bx bx-leaf'></i>",
        '🔃': "<i class='bx bx-refresh'></i>",
        '👀': "<i class='bx bx-show'></i>",
        '🎼': "<i class='bx bx-music'></i>",
        '🧶': "<i class='bx bx-ball'></i>",
        '🟣': "<i class='bx bxl-visual-studio'></i>",
        '🟠': "<i class='bx bx-square-rounded'></i>",
        '🟧': "<i class='bx bx-square'></i>",
        '🪶': "<i class='bx bx-feather'></i>",
        '🟩': "<i class='bx bx-square'></i>",
        '📡': "<i class='bx bx-broadcast'></i>",
        '🔒': "<i class='bx bx-lock-alt'></i>",
        '📂': "<i class='bx bx-folder'></i>",
        '🔌': "<i class='bx bx-plug'></i>",
        '🧮': "<i class='bx bx-calculator'></i>",
        '📈': "<i class='bx bx-line-chart'></i>",
        '☁️': "<i class='bx bxl-aws'></i>",
        '☁': "<i class='bx bxl-aws'></i>",
        '🔥': "<i class='bx bxl-firebase'></i>",
        '🐧': "<i class='bx bxl-tux'></i>",
        '🎓': "<i class='bx bxs-graduation'></i>",
        '💡': "<i class='bx bx-bulb'></i>",
        '🏆': "<i class='bx bx-trophy'></i>",
        '🎂': "<i class='bx bx-cake'></i>"
    }

    for emoji, tag in replacements.items():
        html = html.replace(emoji, tag)
    
    return html

if __name__ == '__main__':
    with open('index.html', 'r', encoding='utf-8') as f:
        html_content = f.read()

    new_html = replace_emojis(html_content)

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(new_html)

    print("Reemplazo completado.")
