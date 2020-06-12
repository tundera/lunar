FROM postgres:12 AS base

# SQL command files passed in as build-time arguments
ARG DB_BACKUP
ARG DB_POPULATE

# Custom initialization scripts
COPY ./scripts/db/postgres/initialization/init-db.sh /docker-entrypoint-initdb.d/init-db.sh
COPY ./scripts/db/postgres/initialization/init-user-db.sh /docker-entrypoint-initdb.d/init-user-db.sh

# Backup data from pg_dummp
COPY ./scripts/db/postgres/backup/staging.dump ./backup.dump

# Custom SQL commands
COPY ./sql/${DB_BACKUP} ./sql/${DB_BACKUP}
COPY ./sql/${DB_POPULATE} ./sql/${POSTGRES_POPULATE}

# Enable execution of entrypoint script
RUN chmod +x /docker-entrypoint-initdb.d/init-db.sh
RUN chmod +x /docker-entrypoint-initdb.d/init-user-db.sh

###############################################################################

FROM postgres:12-alpine AS release

COPY --from=base ./backup.dump ./backup.dump
COPY --from=base ./sql  ./sql
COPY --from=base /docker-entrypoint-initdb.d .

EXPOSE 5432

ENTRYPOINT [ "/docker-entrypoint-initdb.d/init-db.sh" ]