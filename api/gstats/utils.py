from flask import json


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})


def convert_platform(platform):
    platforms = {
        "PS1": 'Playstation 1',
        "PS2": 'Playstation 2',
        "PS3": 'Playstation 3',
        "PS4": 'Playstation 4',
        "XBOX": 'Xbox',
        "XBOX_360": 'Xbox 360',
        "XBOX_ONE": 'Xbox One',
        "MAC": 'Mac',
        "PC": "Pc",
        "NINTENDO_SWITCH": 'Nintendo Switch'
    }
    return platforms[platform]
