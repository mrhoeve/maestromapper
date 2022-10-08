package com.maestromapper.controller

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import com.maestromapper.converter.toFuzzyG
import com.maestromapper.model.RadiusSearchResult
import com.maestromapper.model.fuzzyg.FuzzyG
import com.maestromapper.model.fuzzyg.Request
import com.maestromapper.model.fuzzyg.Response
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.persistence.EntityManager
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/radiussearch")
class RadiusSearchController(
    private val entityManager: EntityManager
) {

    private var logger: Logger = LoggerFactory.getLogger(RadiusSearchController::class.java)
    private val xmlMapper = XmlMapper().registerKotlinModule()

    @RequestMapping(method = [RequestMethod.GET], produces = [MediaType.APPLICATION_XML_VALUE])
    fun executeSearch(
        @RequestParam(name = "lat") latitude: String,
        @RequestParam(name = "lng") longitude: String,
        request: HttpServletRequest
    ): ResponseEntity<String> {
        MDC.put("user", request.userPrincipal.name)
        MDC.put("operation", "Radial search (latitude: $latitude, longitude: $longitude)")
        try {

            val queryAsString =
                "SELECT g.name, g.lat, g.lng, typeId, typeDescription, c.code as code, c.name as country_name, calcdistance(:lat, :lng, g.lat, g.lng) as distance FROM geonames g INNER JOIN countries c ON g.countrycode=c.code INNER JOIN geotype ON g.featurecode=typeId WHERE calcdistance(:lat, :lng, lat, lng) < 10 order by distance"
            val query = entityManager.createNativeQuery(queryAsString, "RadiusSearchResult")
            query.setParameter("lat", latitude.toDouble())
            query.setParameter("lng", longitude.toDouble())

            val queryResults = query.resultList as List<RadiusSearchResult>
            val result = FuzzyG(
                Request("Radius search"),
                Response(
                    queryResults.map { it.toFuzzyG() }
                )
            )

            return ResponseEntity(xmlMapper.writeValueAsString(result), HttpStatus.OK)

        } catch (e: Exception) {
            logger.error("Exception occurred when retrieving available maps", e)
        }
        MDC.clear()
        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR)
    }
}
