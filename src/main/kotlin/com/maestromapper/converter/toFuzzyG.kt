package com.maestromapper.converter

import com.maestromapper.model.RadiusSearchResult
import com.maestromapper.model.SearchResult
import com.maestromapper.model.fuzzyg.*

fun SearchResult.toFuzzyG(): Result = Result(
    accuracy = accuracy,
    fullname = name,
    fullnameNd = name.uppercase(),
    dsg = DsgInfo(
        dsg = typeDescription,
        code = typeId
    ),
    cc = CcInfo(
        countryName,
        code
    ),
    adm = "via Geoname db",
    ddlat = lat,
    ddlong = lng
)

fun RadiusSearchResult.toFuzzyG(): Result = Result(
    accuracy = distance.toFloat(),
    fullname = name,
    fullnameNd = name.uppercase(),
    dsg = DsgInfo(
        dsg = typeDescription,
        code = typeId
    ),
    cc = CcInfo(
        countryName,
        code
    ),
    adm = "via Geoname db",
    ddlat = lat,
    ddlong = lng
)
