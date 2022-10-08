package com.maestromapper.model

data class SearchResult(
    val name: String,
    val lat: Double,
    val lng: Double,
    val typeId: String,
    val typeDescription: String,
    val code: String,
    val countryName: String,
    val accuracy: Float
)
