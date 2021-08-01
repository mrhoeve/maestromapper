delete
from maps;

insert into maps (Url, MinZoom, MaxZoom, Attribution, Name, IsDefault)
values ('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 3, 19, 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors', 'OpenStreetMap', false);
insert into maps (Url, Attribution, Name, IsDefault)
values ('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', 'Map: <a href="http://viewfinderpanoramas.org">SRTM</a>', 'OpenTopoMap', true);
insert into maps (Url, Attribution, Name, IsDefault)
values ('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 'Map: <a href="http://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/">MR</a>', 'Worldimage', false);
ó
