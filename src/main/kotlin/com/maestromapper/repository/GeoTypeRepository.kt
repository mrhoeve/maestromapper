package com.maestromapper.repository

import com.maestromapper.model.GeoType
import org.springframework.data.repository.CrudRepository

interface GeoTypeRepository : CrudRepository<GeoType, String> {
}
