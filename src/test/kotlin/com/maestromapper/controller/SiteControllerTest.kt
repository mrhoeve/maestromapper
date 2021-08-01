package com.maestromapper.controller

import com.maestromapper.exceptions.NoCountryFoundException
import com.maestromapper.model.Country
import com.maestromapper.repository.CountryRepository
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.junit5.MockKExtension
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.ui.Model
import java.security.Principal
import javax.servlet.http.HttpServletRequest

@ExtendWith(MockKExtension::class)
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
internal class SiteControllerTest {
    @MockK
    private lateinit var countryRepository: CountryRepository

    @MockK
    private lateinit var request: HttpServletRequest

    @MockK(relaxed = true)
    private lateinit var model: Model

    private lateinit var siteController: SiteController

    @BeforeAll
    internal fun beforeAll() {
        val principal = mockk<Principal>()
        siteController = SiteController(countryRepository)
        every { request.userPrincipal } returns principal
        every { principal.name } returns "principal"
    }


    @Test
    fun `successful retrieval of countries results in welcome and list of countries as attribute`() {
        val country = Country(code = "NL", name = "Netherlands")
        every { countryRepository.findAll() } returns listOf(country)

        val response = siteController.index(model, request)
        assertEquals("welcome", response)
        verify { model.addAttribute("countries", listOf(country)) }
    }

    @Test
    fun `no country retrieved from repository results in NoCountryFoundException`() {
        every { countryRepository.findAll() } returns emptyList()

        val exception = assertThrows(NoCountryFoundException::class.java) {
            siteController.index(model, request)
        }

        assertEquals("No available countries retrieved", exception.message)
    }

    @Test
    fun `exception when retrieving from repository results in throwing the exception`() {
        every { countryRepository.findAll() } throws RuntimeException("Some exception")

        val exception = assertThrows(RuntimeException::class.java) {
            siteController.index(model, request)
        }

        assertEquals("Exception occurred while retrieving countries", exception.message)
    }
}

