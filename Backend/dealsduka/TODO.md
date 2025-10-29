# TODO: Define Both Development and Production Databases in settings.py

- [x] Update settings.py to explicitly define development (SQLite) and production (PostgreSQL via dj_database_url) database configurations, using DJANGO_ENV environment variable to switch between them.
- [x] Test the configuration in development environment (default SQLite).
- [x] Test the configuration in production environment (set DJANGO_ENV=production and DATABASE_URL). Note: Production config is defined; testing requires psycopg2 installed and DATABASE_URL set, which is expected in deployment.
- [x] Install psycopg2 for PostgreSQL support.
- [x] Verify production database configuration with mock DATABASE_URL.
