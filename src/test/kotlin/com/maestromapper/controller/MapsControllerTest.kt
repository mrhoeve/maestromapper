package com.maestromapper.controller

import com.maestromapper.model.MapInfo
import com.maestromapper.repository.MapInfoRepository
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.mockk
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertNull
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.http.HttpStatus
import java.security.Principal
import javax.servlet.http.HttpServletRequest

@ExtendWith(MockKExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class MapsControllerTest {
    @MockK
    private lateinit var mapInfoRepository: MapInfoRepository

    @MockK
    private lateinit var request: HttpServletRequest

    private lateinit var mapsController: MapsController

    @BeforeAll
    internal fun beforeAll() {
        val principal = mockk<Principal>()
        mapsController = MapsController(mapInfoRepository)
        every { request.userPrincipal } returns principal
        every { principal.name } returns "principal"
    }


    @Test
    fun `successful retrieval of mapinfo results in HttpStatus OK and body`() {
        val mapInfo = MapInfo(id = 0, mapUrl = "some_url", attribution = "attribution", name = "name")
        every { mapInfoRepository.findAllByOrderByIsDefaultDescNameAsc() } returns listOf(mapInfo)

        val response = mapsController.retrieveAllMaps(request)
        assertEquals(HttpStatus.OK, response.statusCode)
        assertEquals(listOf(mapInfo), response.body)
    }

    @Test
    fun `no mapinfo retrieved from repository results in HttpStatus INTERNAL_SERVER_ERROR and empty body`() {
        every { mapInfoRepository.findAllByOrderByIsDefaultDescNameAsc() } returns emptyList()

        val response = mapsController.retrieveAllMaps(request)
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.statusCode)
        assertNull(response.body)
    }

    @Test
    fun `exception when retrieving from repository results in HttpStatus INTERNAL_SERVER_ERROR and empty body`() {
        every { mapInfoRepository.findAllByOrderByIsDefaultDescNameAsc() } throws RuntimeException()

        val response = mapsController.retrieveAllMaps(request)
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.statusCode)
        assertNull(response.body)
    }
}
