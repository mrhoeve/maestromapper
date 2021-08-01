package com.maestromapper.repository

import com.maestromapper.model.Country
import org.springframework.data.repository.CrudRepository

interface CountryRepository : CrudRepository<Country, String> {
    override fun findAll(): List<Country>
}
