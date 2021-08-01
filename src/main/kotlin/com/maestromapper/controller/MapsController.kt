package com.maestromapper.controller

import com.maestromapper.model.MapInfo
import com.maestromapper.repository.MapInfoRepository
import io.swagger.annotations.ApiOperation
import io.swagger.annotations.ApiResponse
import io.swagger.annotations.ApiResponses
import net.logstash.logback.argument.StructuredArguments
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.slf4j.MDC
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest

@RestController
@RequestMapping("/api/maps")
class MapsController(private val mapInfoRepository: MapInfoRepository) {

    var logger: Logger = LoggerFactory.getLogger(MapsController::class.java)

    @RequestMapping(method = [RequestMethod.GET], produces = [MediaType.APPLICATION_JSON_VALUE])
    @ApiOperation(value = "Returns the available maps")
    @ApiResponses(
        value = [
            ApiResponse(code = 200, message = "OK"),
            ApiResponse(code = 401, message = "Unauthorized"),
            ApiResponse(code = 500, message = "Internal server error"),
        ]
    )
    fun retrieveAllMaps(request: HttpServletRequest): ResponseEntity<List<MapInfo>?> {
        MDC.put("user", request.userPrincipal.name)
        try {
            val availableMaps = mapInfoRepository.findAllByOrderByIsDefaultDescNameAsc()
            if (availableMaps.isNotEmpty()) {
                logger.info(
                    "Returning ${availableMaps.size} available maps",
                    StructuredArguments.keyValue("available_maps_no", availableMaps.size)
                )
                return ResponseEntity(availableMaps, HttpStatus.OK)
            }
            logger.warn("No available maps retrieved")
        } catch (e: Exception) {
            logger.error("Exception occurred when retrieving available maps", e)
        }
        MDC.clear()
        return ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
