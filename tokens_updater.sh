#!/bin/bash
source /var/www/price_calculator/venv/bin/activate
python3 /var/www/price_calculator/calculator/manage.py updatetokens
