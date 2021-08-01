package com.maestromapper.model

import javax.persistence.*

@Entity
@Table(name = "maps")
class MapInfo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0,
    @Column(name = "url")
    var mapUrl: String = "",
    @Column(name = "minzoom")
    var minZoom: Int? = null,
    @Column(name = "maxzoom")
    var maxZoom: Int? = null,
    @Column(nullable = false)
    var attribution: String = "",
    @Column(name = "boundx1")
    var boundX1: Double? = null,
    @Column(name = "boundy1")
    var boundY1: Double? = null,
    @Column(name = "boundx2")
    var boundX2: Double? = null,
    @Column(name = "boundy2")
    var boundY2: Double? = null,
    @Column(nullable = false)
    var name: String = "",
    @Column(name = "isdefault")
    var isDefault: Boolean = false
)
