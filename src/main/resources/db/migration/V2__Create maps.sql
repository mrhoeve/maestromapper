create table maps
(
    Id          SERIAL,
    Url         varchar(200) not null,
    MinZoom     integer,
    MaxZoom     integer,
    Attribution varchar(200) not null,
    BoundX1     float8,
    BoundY1     float8,
    BoundX2     float8,
    BoundY2     float8,
    Name        varchar(75)  not null,
    IsDefault   bool
);
