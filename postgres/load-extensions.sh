#!/bin/sh

# Install pg_trgm so we can do fuzzy searching (see https://www.freecodecamp.org/news/fuzzy-string-matching-with-postgresql/)

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<EOF
create extension pg_trgm;
select * FROM pg_extension;
EOF
