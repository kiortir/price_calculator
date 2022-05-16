
import jinja2
import pdfkit
import os

CURRENT_PATH = os.path.dirname(__file__)
DATA = [{
        'price': 1260,
        'discount': 10,
        'raw': 1400,
        'name': 'Кромка',
        'children': [
            {
                'key': 'Длина кромки',
                'value': '5м'
            },
            {
                'key': 'Тип кромки',
                'value': '№2'
            }
        ]
        }]


def render_html():
    """
    Render html page using jinja
    # """
    template_path = os.path.join(CURRENT_PATH, 'templates')
    template_loader = jinja2.FileSystemLoader(
        searchpath=template_path)
    template_env = jinja2.Environment(loader=template_loader, autoescape=True)
    template_file = 'offer.j2'
    template = template_env.get_template(template_file)

    output_text = template.render(
        # svg=os.path.join(CURRENT_PATH, 'unirock.svg').replace("\\","/")
        products=DATA
    )
    
    html_path = os.path.join(CURRENT_PATH, 'test.html')
    html_file = open(html_path, 'w', encoding='UTF-8')
    html_file.write(output_text)
    html_file.close()
    return output_text


def html2pdf(html: str):
    """
    Convert html to pdf using pdfkit which is a wrapper of wkhtmltopdf
    """
    options = {
        'page-size': 'A4',
        'margin-top': '0.35in',
        'margin-right': '0.1in',
        'margin-bottom': '0.75in',
        'margin-left': '0.1in',
        'encoding': "UTF-8",
        'no-outline': None,
        'enable-local-file-access': None
    }
    config = pdfkit.configuration(
        wkhtmltopdf='C:\\Program Files\\wkhtmltopdf\\bin\\wkhtmltopdf.exe')
    pdfkit.from_string(html, os.path.join(
        CURRENT_PATH, 'test.pdf'), options=options, configuration=config)


html = render_html()
html2pdf(html)
