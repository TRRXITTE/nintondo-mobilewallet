package io.nintondo.osx

/**
 * Exception thrown when an API rate limit is encountered
 */
class RateLimitException(message: String) : Exception(message)
