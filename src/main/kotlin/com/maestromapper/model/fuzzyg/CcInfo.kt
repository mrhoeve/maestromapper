package com.maestromapper.model.fuzzyg

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText

data class CcInfo(
    @JacksonXmlText
    var cc: String,
    @JacksonXmlProperty(isAttribute = true)
    var code: String
)
