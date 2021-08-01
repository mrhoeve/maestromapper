package com.maestromapper.controller

import com.maestromapper.exceptions.NoCountryFoundException
import com.maestromapper.repository.CountryRepository
import net.logstash.logback.argument.StructuredArguments
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.stereotype.Controller
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.GetMapping
import springfox.documentation.annotations.ApiIgnore
import javax.servlet.http.HttpServletRequest

@Controller
@ApiIgnore
class SiteController(private val countryRepository: CountryRepository) {
    var logger: Logger = LoggerFactory.getLogger(SiteController::class.java)

    @GetMapping("/")
    fun index(model: Model, request: HttpServletRequest): String {
        MDC.put("user", request.userPrincipal.name)
        try {
            val countries = countryRepository.findAll()
            if (countries.isNotEmpty()) {
                logger.info(
                    "Returning ${countries.size} available countries",
                    StructuredArguments.keyValue("available_countries_no", countries.size)
                )
                model.addAttribute("countries", countries)
                return "welcome"
            }
        } catch (e: Exception) {
            logger.error("Exception occurred when retrieving available countries", e)
            throw NoCountryFoundException("Exception occurred while retrieving countries")
        } finally {
            MDC.clear()
        }
        logger.warn("No available countries retrieved")
        throw NoCountryFoundException("No available countries retrieved")
    }
}
