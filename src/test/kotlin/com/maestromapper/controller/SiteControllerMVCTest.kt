package com.maestromapper.controller

import com.maestromapper.model.Country
import com.maestromapper.repository.CountryRepository
import com.ninjasquad.springmockk.MockkBean
import io.mockk.every
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.ExtendWith
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.security.config.annotation.authentication.configurers.ldap.LdapAuthenticationProviderConfigurer
import org.springframework.security.config.annotation.web.configurers.oauth2.client.OAuth2LoginConfigurer
import org.springframework.security.test.context.support.WithMockUser
import org.springframework.test.context.junit.jupiter.SpringExtension
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.ui.Model
import javax.servlet.http.HttpServletRequest


@ExtendWith(SpringExtension::class)
@WebMvcTest(
    SiteController::class,
    excludeAutoConfiguration = [LdapAuthenticationProviderConfigurer::class, OAuth2LoginConfigurer::class]
)
class SiteControllerMVCTest {
    @Autowired
    private lateinit var mockMvc: MockMvc

    @MockkBean
    private lateinit var countryRepository: CountryRepository

    @MockkBean
    private lateinit var request: HttpServletRequest

    @MockkBean(relaxed = true)
    private lateinit var model: Model

    @Test
    fun `unauthorized request`() {
        val country = Country(code = "NL", name = "Netherlands")
        every { countryRepository.findAll() } returns listOf(country)

        this.mockMvc.perform(get("/"))
            .andExpect(status().isUnauthorized)
    }

    @Test
    @WithMockUser(username = "user")
    fun `successful retrieval of countries results in OK`() {
        val country = Country(code = "NL", name = "Netherlands")
        every { countryRepository.findAll() } returns listOf(country)

        this.mockMvc.perform(get("/"))
            .andExpect(status().isOk)
    }

    @Test
    @WithMockUser(username = "user")
    fun `no country retrieved from repository results in Internal Server Error`() {
        every { countryRepository.findAll() } returns emptyList()

        this.mockMvc.perform(get("/"))
            .andExpect(status().isInternalServerError)
    }

    @Test
    @WithMockUser(username = "user")
    fun `exception when retrieving from repository results in Internal Server Error`() {
        every { countryRepository.findAll() } throws RuntimeException("Some exception")

        this.mockMvc.perform(get("/"))
            .andExpect(status().isInternalServerError)
    }
}
