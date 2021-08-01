package com.maestromapper.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.ResponseEntity
import springfox.documentation.builders.RequestHandlerSelectors
import springfox.documentation.oas.annotations.EnableOpenApi
import springfox.documentation.service.ApiInfo
import springfox.documentation.service.Contact
import springfox.documentation.service.Server
import springfox.documentation.spi.DocumentationType
import springfox.documentation.spring.web.plugins.Docket


@Configuration
@EnableOpenApi
class SwaggerConfig {

    val DEFAULT_CONTACT: Contact = Contact(
        "Maestromapper", "https://www.maestromapper.com", "info@maestromapper.com"
    )

    val DEFAULT_API_INFO = ApiInfo(
        "Maestromapper API", "Awesome API Description", "1.0",
        "urn:tos", DEFAULT_CONTACT,
        "", "", emptyList()
    )

    @Bean
    fun api(): Docket {
        return Docket(DocumentationType.OAS_30)
            .useDefaultResponseMessages(false)
            .apiInfo(DEFAULT_API_INFO)
            .select()
            .apis(RequestHandlerSelectors.basePackage("com.github.mrhoeve.maestromapper"))
            .build()
            .genericModelSubstitutes(ResponseEntity::class.java)
            .servers(Server("Maestromapper", "http://maestromapper.com", "Main server", emptyList(), emptyList()))
    }
}
