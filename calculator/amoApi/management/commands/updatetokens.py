from django.core.management.base import BaseCommand, CommandError
from amoApi.auth import updateTokens


class Command(BaseCommand):
    help = 'обновляет токены Амо'

    def handle(self, *args, **options):
        updateTokens()


if __name__ == '__main__':
    Command().handle()
