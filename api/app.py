from flask import Flask, json, request
from flask_cors import CORS
from file_operations import read_txt_file
import random
import math

app = Flask(__name__)
CORS(app)


class Game:
    def __init__(self, id, title, platform, release_date, genre, publisher, copies_sold, na_sales, eu_sales, jp_sales, other_sales, global_sales=0):
        self.id = id
        self.title = title
        self.platform = platform
        self.release_date = int(release_date)
        self.genre = genre
        self.publisher = publisher
        self.na_sales = float(na_sales)
        self.eu_sales = float(eu_sales)
        self.jp_sales = float(jp_sales)
        self.other_sales = float(other_sales)
        self.global_sales = round(
            float(na_sales) + float(eu_sales) + float(jp_sales) + float(other_sales), 2)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'platform': self.platform,
            'release_date': self.release_date,
            'genre': self.genre,
            'publisher': self.publisher,
            'na_sales': self.na_sales,
            'eu_sales': self.eu_sales,
            'jp_sales': self.jp_sales,
            'other_sales': self.other_sales,
            'global_sales': self.global_sales
        }


def create_game_objects(games_list, page=1, page_limit=18, query=None, attribute=''):
    ID = 0
    TITLE = 1
    PLATFORM = 2
    RELEASE_DATE = 3
    GENRE = 4
    PUBLISHER = 5
    NA_SALES = 6
    EU_SALES = 7
    JP_SALES = 8
    OTHER_SALES = 9
    GLOBAL_SALES = 10

    games_list = [Game(
        game[ID],
        game[TITLE],
        game[PLATFORM],
        game[RELEASE_DATE],
        game[GENRE],
        game[PUBLISHER],
        game[NA_SALES],
        game[EU_SALES],
        game[JP_SALES],
        game[OTHER_SALES],
        game[GLOBAL_SALES]
    ) for game in games_list]
    if attribute == 'title':
        if query is None:
            games_list = [game.serialize() for game in games_list]
        else:
            games_list = [game.serialize()
                          for game in games_list if query.lower() in game.title.lower()]
    elif attribute == 'genre':
        if query == '' or query is None:
            games_list = [game.serialize() for game in games_list]
        else:
            games_list = [game.serialize()
                          for game in games_list if query.lower() in game.genre.lower()]
    elif attribute == '':
        games_list = [game.serialize() for game in games_list]
        total_pages = math.ceil(len(games_list) / int(page_limit))
        offset = (int(page) - 1) * int(page_limit)

        return {
            'game_data': games_list[offset:offset+int(page_limit)],
            'amount': len(games_list),
            'current_page': page,
            'total_pages': total_pages
        }
    elif attribute == 'genres':
        return {'game_data': [game.serialize() for game in games_list]}
    elif attribute == 'query':
        if query == "all":
            games_list = [game.serialize() for game in games_list]
        else:
            games_list = [game.serialize()
                          for game in games_list if query.lower() in game.title.lower()]
        total_pages = math.ceil(len(games_list) / int(page_limit))
        offset = (int(page) - 1) * int(page_limit)
        return {
            'game_data': games_list[offset:offset+int(page_limit)],
            'amount': len(games_list),
            'current_page': page,
            'total_pages': total_pages
        }
    return {'game_data': games_list}


def get_genres():
    games = create_game_objects(read_txt_file(
        '../vgsales.csv'), attribute='genres')['game_data']
    return list(set([game["genre"] for game in games]))


def count_by_genre(genre):
    games = create_game_objects(read_txt_file('../vgsales.csv'))['game_data']
    return len([game['title'] for game in games if game['genre'] == genre])


@app.route('/api/games', methods=["GET"])
def get_games():
    request_data = request.args
    print(request_data)
    # attribute = list(request_data.keys())[0]
    request_type = list(request_data.keys())
    print(request_type)
    if 'genre' in request_type:
        query = request_data['genre']
        return json_response(create_game_objects(read_txt_file('../vgsales.csv'), query=query, attribute='genre'))
    elif 'query' in request_type:
        query = request_data['query']
        page = request_data['page']
        page_limit = request_data['limit']

        return json_response(create_game_objects(read_txt_file('../vgsales.csv'), page, page_limit, query=query, attribute='query'))
    else:
        page = request_data['page']
        page_limit = request_data['limit']

        print(page)
        print(page_limit)

        return json_response(create_game_objects(read_txt_file('../vgsales.csv'), page, page_limit))
    # if attribute == '':
    #     return json_response(create_game_objects(read_txt_file('vgsales.csv')))
    # else:
    #     query = request.args.get(attribute)
    #     return json_response(create_game_objects(read_txt_file('vgsales.csv'), query=query, attribute=attribute))


@app.route('/api/genres', methods=['GET'])
def return_genres():
    return json_response(get_genres())


@app.route('/api/chart', methods=['GET'])
def return_chart():
    data = []
    request_data = request.args
    chart_type = list(request_data.values())[0]
    if chart_type.lower() == 'line':
        genres = get_genres()
        data = {
            'name': 'Line example chart',
            'chart': {
                'labels': ["2000", "2001", "2002", "2003", "2004", "2005"],
                'datasets': []
            }
        }
        for genre in genres:
            # random_color = f'rgba({",".join([str(random.randint(0, 255)), str(random.randint(0, 255)), str(random.randint(0, 255))])}, 0.5)'
            test_data = [random.randint(0, 100) for number in range(6)]
            data['chart']['datasets'].append(
                {'label': genre, 'data': test_data})
    elif chart_type.lower() == 'doughnut':
        genres = get_genres()
        data = {
            'name': 'Doughnut example chart',
            'chart': {
                'labels': [],
                'datasets': []
            }
        }
        chart_data = []
        for genre in genres:
            chart_data.append(count_by_genre(genre))
            data['chart']['labels'].append(genre)

        # arc_colors = [f'rgba({",".join([str(random.randint(0, 255)), str(random.randint(0, 255)), str(random.randint(0, 255))])}, 0.5)' for number in range(len(genres))]

        data['chart']['datasets'].append(
            {'data': chart_data})

    return json_response(data)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})


if __name__ == "__main__":
    app.config.from_object('configurations.DevelopmentConfig')
    app.run()
