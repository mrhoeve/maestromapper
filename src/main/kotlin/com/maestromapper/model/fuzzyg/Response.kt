package com.maestromapper.model.fuzzyg

import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlElementWrapper
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty

data class Response(
    @JacksonXmlElementWrapper(localName = "results")
    @JacksonXmlProperty(localName = "result")
    var result: List<Result>
)
