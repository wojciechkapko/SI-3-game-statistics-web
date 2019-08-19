from pybomb import GamesClient, GameClient


def getCover(title, platform):
    platforms = {
        "PS1": 22,
        "PS2": 19,
        "PS3": 35,
        "PS4": 146,
        "XBOX": 32,
        "XBOX_360": 20,
        "XBOX_ONE": 145,
        "MAC": 17,
        "PC": 94,
        "NINTENDO_SWITCH": 157
    }
    platform = platforms[platform.upper()]

    my_key = "9140706357a1a3f0b71f1ac3ab4961f05e6c5fa5"
    games_client = GamesClient(my_key)
    search_title = title
    games = games_client.quick_search(
        search_title, platform=platform, sort_by='name')
    try:
        cover_url = games.results[0]["image"]["small_url"]
    except:
        return None
    return cover_url
