package com.maestromapper.exceptions

import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ResponseStatus

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "No country found")
class NoCountryFoundException(message: String) : RuntimeException(message) {
}
