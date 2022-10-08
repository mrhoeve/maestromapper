package com.maestromapper.model.fuzzyg

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText

data class DsgInfo(
    @JacksonXmlText
    var dsg: String,
    @JacksonXmlProperty(isAttribute = true)
    var code: String
)
