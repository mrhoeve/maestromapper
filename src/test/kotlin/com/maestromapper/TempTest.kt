package com.maestromapper

import com.fasterxml.jackson.dataformat.xml.XmlMapper
import com.fasterxml.jackson.module.kotlin.registerKotlinModule
import com.maestromapper.model.fuzzyg.*
import org.junit.jupiter.api.Test

class TempTest {
    private val xmlMapper = XmlMapper().registerKotlinModule()

    @Test
    fun `test xml`() {
        val fuzzyG = FuzzyG(
            Request("Meppel"),
            Response(
                mutableListOf(
                    Result(
                        accuracy = 0.54.toFloat(),
                        fullname = "fullname",
                        fullnameNd = "FULLNAME",
                        DsgInfo(
                            dsg = "dsg",
                            code = "dsgcode"
                        ),
                        CcInfo(
                            cc = "cc",
                            code = "cccode"
                        ),
                        adm = "adm",
                        ddlat = -31.3,
                        ddlong = 39.9
                    )
                )
            )

        )

        println(xmlMapper.writeValueAsString(fuzzyG))
    }
}
