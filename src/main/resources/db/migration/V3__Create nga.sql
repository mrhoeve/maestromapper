create table nga
(
    name text,
    lat  float8,
    lng  float8,
    type varchar(5),
    cc   varchar(4) not null
);

set pg_trgm.similarity_threshold = 0.4;
create index trgm_idx on nga using gist(name gist_trgm_ops);
