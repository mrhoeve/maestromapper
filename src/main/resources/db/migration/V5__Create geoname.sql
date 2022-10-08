create table geonames
(
    geonameid int primary key,
    name varchar(200),
    asciiname varchar(200),
    alternatenames varchar(10000),
    lat float8,
    lng float8,
    featureclass char(1),
    featurecode varchar(10),
    countrycode varchar(2),
    cc2 varchar(200),
    admin1code varchar(20),
    admin2code varchar(80),
    admin3code varchar(20),
    admin4code varchar(20),
    population bigint,
    elevation int,
    timezone varchar(40),
    lastmodified date
);

create index geonames_names_idx on geonames using gist(name gist_trgm_ops);
