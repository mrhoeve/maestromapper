CREATE OR REPLACE FUNCTION calcdistance(lat1 float8, lng1 float8, lat2 float8, lng2 float8) RETURNS float8 AS
$$
BEGIN
    RETURN 6371 * 2 * ASIN(SQRT(
                POWER(SIN((lat1 - abs(lat2)) * pi() / 180 / 2),
                      2) + COS(lat1 * pi() / 180) * COS(abs(lat2) *
                                                        pi() / 180) * POWER(SIN((lng1 - lng2) *
                                                                                pi() / 180 / 2), 2)));
END;
$$ LANGUAGE plpgsql;
