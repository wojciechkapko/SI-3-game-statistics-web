import csv


def read_csv(file_name='../vgsales.csv'):
    with open(file_name, 'rt', encoding="utf8", errors="replace") as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        result = []
        for row in csv_reader:
            if line_count == 0:
                # print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                if row[3] == 'N/A':
                    pass
                elif row[10] == '' or row[10] == ' ' or row[10] is None:
                    pass
                else:
                    game = [data for data in row]
                    result.append(game)
                line_count += 1
    return result


def read_txt_file(file_name='../game_stat.txt'):
    games_list = []
    if '.txt' in file_name:
        with open(file_name) as games:
            games_list = games.read().split('\n')  # read the file to list, split each line
        games_list.pop()
        for index, game in enumerate(games_list):
            games_list[index] = game.split('\t')  # split every element by tab
        # convert the list of list to a list of objects of type Game
    elif '.csv' in file_name:
        games_list = read_csv(file_name)
    return games_list
