from flask import jsonify


# 4XX
def BAD_REQUEST(msg="Bad request"):
    return (jsonify({
        "code": 'BAD_REQUEST',
        "message": msg
    }), 400)


def NOT_FOUND(msg="Resource not found"):
    return (jsonify({
        "code": 'NOT_FOUND',
        "message": msg
    }), 404)


# 5XX
def INTERNAL_SERVER_ERROR(msg="Internal server error"):
    return (jsonify({
        "code": 'INTERNAL_SERVER_ERROR',
        "message": msg
    }), 500)


def SERVICE_UNAVAILABLE(msg="Open LISA Server unavailable"):
    return (jsonify({
        "code": 'SERVICE_UNAVAILABLE',
        "message": msg
    }), 503)
