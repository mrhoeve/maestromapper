package com.maestromapper.model

import javax.persistence.Column
import javax.persistence.ColumnResult
import javax.persistence.ConstructorResult
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.SqlResultSetMapping
import javax.persistence.Table

@SqlResultSetMapping(
    name = "SearchResult", classes = [
        ConstructorResult(
            targetClass = SearchResult::class,
            columns = [
                ColumnResult(name = "name"),
                ColumnResult(name = "lat"),
                ColumnResult(name = "lng"),
                ColumnResult(name = "typeId"),
                ColumnResult(name = "typeDescription"),
                ColumnResult(name = "code"),
                ColumnResult(name = "country_name"),
                ColumnResult(name = "accuracy")
            ]
        )
    ]
)

@SqlResultSetMapping(
    name = "RadiusSearchResult", classes = [
        ConstructorResult(
            targetClass = RadiusSearchResult::class,
            columns = [
                ColumnResult(name = "name"),
                ColumnResult(name = "lat"),
                ColumnResult(name = "lng"),
                ColumnResult(name = "typeId"),
                ColumnResult(name = "typeDescription"),
                ColumnResult(name = "code"),
                ColumnResult(name = "country_name"),
                ColumnResult(name = "distance")
            ]
        )
    ]
)

@Entity
@Table(name = "geotype")
class GeoType(
    @Id
    var typeId: String = "",
    @Column(nullable = false)
    var typeDescription: String = "",
    var typeSummary: String = ""
)
