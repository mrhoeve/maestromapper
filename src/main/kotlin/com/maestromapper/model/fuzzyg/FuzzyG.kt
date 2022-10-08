package com.maestromapper.model.fuzzyg

import com.fasterxml.jackson.annotation.JsonRootName

@JsonRootName("fuzzyg")
data class FuzzyG(
    var request: Request,
    val response: Response
)
