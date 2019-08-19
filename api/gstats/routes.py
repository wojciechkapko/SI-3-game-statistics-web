from gstats import app, db, jwt, bcrypt
from flask import request
from gstats.file_operations import read_txt_file
import random
import math
from gstats.models import Game, User
from gstats.utils import json_response
from flask_jwt_extended import create_access_token
from gstats.giantbomb import getCover
from gstats.utils import convert_platform


@app.route('/api/register', methods=["POST"])
def register():
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(
        request.get_json()['password']).decode('utf-8')

    user = User(
        email=email,
        password=password
    )
    db.session.add(user)
    db.session.commit()

    result = {'message': 'Account created', 'type': 'success'}

    return json_response({'result': result})


@app.route('/api/login', methods=['POST'])
def login():
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ""

    db_response = User.query.filter_by(email=email).first()

    if db_response and bcrypt.check_password_hash(db_response.password, password):
        access_token = create_access_token(identity={
            'id': db_response.id,
            'email': db_response.email
        })
        result = json_response({'token': access_token})
    else:
        result = json_response(
            {"error": "Login Unsuccessful check your email and password"})
    return result


@app.route('/api/game/add', methods=["GET"])
def add_game():
    request_data = request.args
    title = request_data['title']
    platform = request_data['platform']
    owner_id = request_data['owner_id']
    cover = getCover(title, platform)
    platform_human = convert_platform(platform)
    if cover is not None:
        game = Game(title=title, platform=platform_human,
                    owner_id=owner_id, cover=cover)

        db.session.add(game)
        db.session.commit()
        return json_response({
            "icon": "tick",
            "type": "success",
            "message": "Game added",
        })
    else:
        return json_response({
            "icon": "tick",
            "type": "error",
            "message": "Game does not exists",
        })


@app.route('/api/game/delete', methods=["GET"])
def delete_game():
    request_data = request.args
    game_id = request_data['game_id']
    owner_id = request_data['owner_id']
    try:
        print(f'game_id: {game_id}')
        print(owner_id)
        game = Game.query.filter_by(id=game_id, owner_id=owner_id).first()
    except:
        return json_response({
            "icon": "tick",
            "type": "error",
            "message": "Something went wrong",
        })
    print(game)
    if game:
        db.session.delete(game)
        db.session.commit()
        return json_response({
            "icon": "tick",
            "type": "success",
            "message": "Game Deleted",
        })
    else:
        return json_response({
            "icon": "tick",
            "type": "error",
            "message": "Something went wrong",
        })


@app.route('/api/games', methods=["GET"])
def get_games():
    request_data = request.args
    # attribute = list(request_data.keys())[0]
    request_type = list(request_data.keys())
    owner_id = request_data['owner_id']
    if 'genre' in request_type:
        query = request_data['genre']
        # return json_response(create_game_objects(read_txt_file('../vgsales.csv'), query=query, attribute='genre'))
        return 'genre'
    elif 'query' in request_type:
        query = request_data['query']
        page = request_data['page']
        page_limit = request_data['limit']
        return 'query'
        # return json_response(create_game_objects(read_txt_file('../vgsales.csv'), page, page_limit, query=query, attribute='query'))
    else:
        page = request_data['page']
        page_limit = request_data['limit']
        games_list = [game.serialize()
                      for game in Game.query.filter_by(owner_id=owner_id).all()]
        total_pages = math.ceil(len(games_list) / int(page_limit))
        offset = (int(page) - 1) * int(page_limit)

        return json_response({
            'game_data': games_list[offset:offset+int(page_limit)],
            'amount': len(games_list),
            'current_page': page,
            'total_pages': total_pages
        })


# def create_game_objects(games_list, page=1, page_limit=18, query=None, attribute=''):
#     ID = 0
#     TITLE = 1
#     PLATFORM = 2
#     RELEASE_DATE = 3
#     GENRE = 4
#     PUBLISHER = 5
#     NA_SALES = 6
#     EU_SALES = 7
#     JP_SALES = 8
#     OTHER_SALES = 9
#     GLOBAL_SALES = 10

#     games_list = [Game(
#         game[ID],
#         game[TITLE],
#         game[PLATFORM],
#         game[RELEASE_DATE],
#         game[GENRE],
#         game[PUBLISHER],
#         game[NA_SALES],
#         game[EU_SALES],
#         game[JP_SALES],
#         game[OTHER_SALES],
#         game[GLOBAL_SALES]
#     ) for game in games_list]
#     if attribute == 'title':
#         if query is None:
#             games_list = [game.serialize() for game in games_list]
#         else:
#             games_list = [game.serialize()
#                           for game in games_list if query.lower() in game.title.lower()]
#     elif attribute == 'genre':
#         if query == '' or query is None:
#             games_list = [game.serialize() for game in games_list]
#         else:
#             games_list = [game.serialize()
#                           for game in games_list if query.lower() in game.genre.lower()]
#     elif attribute == '':
#         games_list = [game.serialize() for game in games_list]
#         total_pages = math.ceil(len(games_list) / int(page_limit))
#         offset = (int(page) - 1) * int(page_limit)

#         return {
#             'game_data': games_list[offset:offset+int(page_limit)],
#             'amount': len(games_list),
#             'current_page': page,
#             'total_pages': total_pages
#         }
#     elif attribute == 'genres':
#         return {'game_data': [game.serialize() for game in games_list]}
#     elif attribute == 'query':
#         if query == "all":
#             games_list = [game.serialize() for game in games_list]
#         else:
#             games_list = [game.serialize()
#                           for game in games_list if query.lower() in game.title.lower()]
#         total_pages = math.ceil(len(games_list) / int(page_limit))
#         offset = (int(page) - 1) * int(page_limit)
#         return {
#             'game_data': games_list[offset:offset+int(page_limit)],
#             'amount': len(games_list),
#             'current_page': page,
#             'total_pages': total_pages
#         }
#     return {'game_data': games_list}


# def get_genres():
#     games = create_game_objects(read_txt_file(
#         '../vgsales.csv'), attribute='genres')['game_data']
#     return list(set([game["genre"] for game in games]))


# def count_by_genre(genre):
#     games = create_game_objects(read_txt_file('../vgsales.csv'))['game_data']
#     return len([game['title'] for game in games if game['genre'] == genre])


# @app.route('/api/games', methods=["GET"])
# def get_games():
#     request_data = request.args
#     print(request_data)
#     # attribute = list(request_data.keys())[0]
#     request_type = list(request_data.keys())
#     print(request_type)
#     if 'genre' in request_type:
#         query = request_data['genre']
#         return json_response(create_game_objects(read_txt_file('../vgsales.csv'), query=query, attribute='genre'))
#     elif 'query' in request_type:
#         query = request_data['query']
#         page = request_data['page']
#         page_limit = request_data['limit']

#         return json_response(create_game_objects(read_txt_file('../vgsales.csv'), page, page_limit, query=query, attribute='query'))
#     else:
#         page = request_data['page']
#         page_limit = request_data['limit']

#         print(page)
#         print(page_limit)

#         return json_response(create_game_objects(read_txt_file('../vgsales.csv'), page, page_limit))
#     # if attribute == '':
#     #     return json_response(create_game_objects(read_txt_file('vgsales.csv')))
#     # else:
#     #     query = request.args.get(attribute)
#     #     return json_response(create_game_objects(read_txt_file('vgsales.csv'), query=query, attribute=attribute))


# @app.route('/api/genres', methods=['GET'])
# def return_genres():
#     return json_response(get_genres())


# @app.route('/api/chart', methods=['GET'])
# def return_chart():
#     data = []
#     request_data = request.args
#     chart_type = list(request_data.values())[0]
#     if chart_type.lower() == 'line':
#         genres = get_genres()
#         data = {
#             'name': 'Line example chart',
#             'chart': {
#                 'labels': ["2000", "2001", "2002", "2003", "2004", "2005"],
#                 'datasets': []
#             }
#         }
#         for genre in genres:
#             # random_color = f'rgba({",".join([str(random.randint(0, 255)), str(random.randint(0, 255)), str(random.randint(0, 255))])}, 0.5)'
#             test_data = [random.randint(0, 100) for number in range(6)]
#             data['chart']['datasets'].append(
#                 {'label': genre, 'data': test_data})
#     elif chart_type.lower() == 'doughnut':
#         genres = get_genres()
#         data = {
#             'name': 'Doughnut example chart',
#             'chart': {
#                 'labels': [],
#                 'datasets': []
#             }
#         }
#         chart_data = []
#         for genre in genres:
#             chart_data.append(count_by_genre(genre))
#             data['chart']['labels'].append(genre)

#         # arc_colors = [f'rgba({",".join([str(random.randint(0, 255)), str(random.randint(0, 255)), str(random.randint(0, 255))])}, 0.5)' for number in range(len(genres))]

#         data['chart']['datasets'].append(
#             {'data': chart_data})

#     return json_response(data)
