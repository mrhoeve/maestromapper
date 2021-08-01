package com.maestromapper.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "countries")
class Country(
    @Id
    var code: String = "",
    @Column(nullable = false)
    var name: String = ""
)
