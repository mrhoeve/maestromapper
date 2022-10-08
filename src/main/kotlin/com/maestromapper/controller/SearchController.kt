package com.maestromapper.controller

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import com.maestromapper.converter.toFuzzyG
import com.maestromapper.model.SearchResult
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
@RequestMapping("/api/search")
class SearchController(
    private val entityManager: EntityManager
) {

    private var logger: Logger = LoggerFactory.getLogger(SearchController::class.java)
    private val xmlMapper = XmlMapper().registerKotlinModule()

    @RequestMapping(method = [RequestMethod.GET], produces = [MediaType.APPLICATION_XML_VALUE])
    fun executeSearch(
        @RequestParam(name = "q") name: String,
        @RequestParam(name = "cc") country: String? = "",
        request: HttpServletRequest
    ): ResponseEntity<String> {
        MDC.put("user", request.userPrincipal.name)
        MDC.put("operation", "Search (search for: $name, country: $country)")

        try {

            val queryAsString: String
            if (countryHasBeenSet(country)) {
                queryAsString =
                    "SELECT n.name, lat, lng, typeId, typeDescription, c.code, c.name as country_name, similarity(n.name, :name) as accuracy FROM nga n INNER JOIN countries c ON cc=code LEFT OUTER JOIN geotype ON type=typeId WHERE n.name % :name and cc= :country ORDER BY accuracy DESC, country_name ASC"
            } else {
                queryAsString =
                    "SELECT n.name, lat, lng, typeId, typeDescription, c.code, c.name as country_name, similarity(n.name, :name) as accuracy FROM nga n INNER JOIN countries c ON cc=code LEFT OUTER JOIN geotype ON type=typeId WHERE n.name % :name ORDER BY accuracy DESC, country_name ASC"
            }
            val query = entityManager.createNativeQuery(queryAsString, "SearchResult")
            query.setParameter("name", name)
            if (countryHasBeenSet(country)) query.setParameter("country", country)

            val queryResults = query.resultList as List<SearchResult>
            val result = FuzzyG(
                Request(name),
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

    private fun countryHasBeenSet(country: String?): Boolean = !country.isNullOrBlank()
}
