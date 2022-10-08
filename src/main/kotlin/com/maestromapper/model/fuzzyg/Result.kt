package com.maestromapper.model.fuzzyg

import com.fasterxml.jackson.annotation.JsonCreator
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlProperty
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlText


@JacksonXmlRootElement(localName = "result")
data class Result(
    @JacksonXmlProperty(isAttribute = true)
    val accuracy: Float,
    val fullname: String,
    val fullnameNd: String,
    val dsg: DsgInfo,
    val cc: CcInfo,
    val adm: String,
    val ddlat: Double,
    val ddlong: Double
)
