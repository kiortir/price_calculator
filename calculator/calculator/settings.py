"""
Django settings for calculator project.

Generated by 'django-admin startproject' using Django 3.2.9.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from rest_framework.authentication import SessionAuthentication, BasicAuthentication
import os
from pathlib import Path

from calculator.custom_middleware import LoginRequiredMiddleware

import environ

OPEN_URLS = ["/pricelist/currency/", ]

env = environ.Env()
environ.Env.read_env()

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')
FRONTEND_DIR = os.path.join(BASE_DIR, 'main', 'frontend')

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env('SECRET_KEY')

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env('DEBUG') == 'True'
CORS_ORIGIN_ALLOW_ALL = DEBUG

if DEBUG:
    ALLOWED_HOSTS = ['*', 'https://dev.unirock.ru']
else:
    ALLOWED_HOSTS = ['194.67.111.46', 'dev.unirock.ru', 'localhost']

CSRF_TRUSTED_ORIGINS = ['https://*.unirock.ru', 'https://*.127.0.0.1']
CSRF_COOKIE_NAME = "XSRF-TOKEN"

if DEBUG:
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static/')

    MEDIA_URL = '/media/'
    MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')
else:
    STATIC_URL = '/static/'
    STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
    )

    MEDIA_URL = '/media/'
    MEDIA_ROOT = '/usr/public/unirock/media/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'base_template/static'),
]


# Application definition

INSTALLED_APPS = [
    'channels',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'corsheaders',
    # 'django_vite',
    'import_export',
    'nested_admin',
    'smart_selects',
    'django_json_widget',
    'rest_framework',
    'main',
    'stonepricelist',
    'stone_pricelist',

    'amoApi',
    'production_graph',
    'estimation'

]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'calculator.custom_middleware.LoginRequiredMiddleware'
]

ROOT_URLCONF = 'calculator.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR, os.path.join(BASE_DIR, 'base_template/')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'calculator.wsgi.application'
ASGI_APPLICATION = "calculator.asgi.application"

# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases

INTERNAL_IPS = (
    '127.0.0.1',
)
# if DEBUG:
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.sqlite3',
#             'NAME': str(os.path.join(BASE_DIR, "db.sqlite3")),
#         }
#     }
# else:
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': env('DB_NAME'),
        'USER': env('DB_USER'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': env('DB_HOST'),
        'PORT': '',
    }
}

# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ]
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/


# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

USE_DJANGO_JQUERY = True

try:
    AMO_CLIENT_SECRET = env('AMO_CLIENT_SECRET')
    AMO_CLIENT_ID = env('AMO_CLIENT_ID')
except Exception:
    pass

CHANNEL_LAYERS = {
    'default': {
        # Method 1: Via redis lab
        # 'BACKEND': 'channels_redis.core.RedisChannelLayer',
        # 'CONFIG': {
        #     "hosts": [
        #       'redis://h:<password>;@<redis Endpoint>:<port>'
        #     ],
        # },

        # Method 2: Via local Redis
        'BACKEND': 'channels_redis.core.RedisChannelLayer',
        'CONFIG': {
            "hosts": [('127.0.0.1', 6379)],
        },

        # Method 3: Via In-memory channel layer
        # Using this method.
        # "BACKEND": "channels.layers.InMemoryChannelLayer"
    },
}

STREAM_SOCKET_GROUP_NAME = 'estimation_mutations'

LOGIN_URL = '/admin/login/'

if not DEBUG:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
            'LOCATION': '/var/tmp/django_cache',
        }
    }
