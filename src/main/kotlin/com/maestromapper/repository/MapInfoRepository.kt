package com.maestromapper.repository

import com.maestromapper.model.MapInfo
import org.springframework.data.repository.CrudRepository

interface MapInfoRepository : CrudRepository<MapInfo, String> {
    fun findAllByOrderByIsDefaultDescNameAsc(): List<MapInfo>
}
