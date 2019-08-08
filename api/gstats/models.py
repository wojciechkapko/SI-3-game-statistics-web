from gstats import db
# from gstats import db, login_manager
# from flask_login import UserMixin


# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    cover = db.Column(db.String(500), nullable=False,
                      default='placeholder.jpg')
    platform = db.Column(db.String(50), nullable=False)
    release_year = db.Column(db.Integer, nullable=True)
    genre = db.Column(db.String(50), nullable=True)
    publisher = db.Column(db.String(50), nullable=True)
    na_sales = db.Column(db.Float(50), nullable=True)
    eu_sales = db.Column(db.Float(50), nullable=True)
    jp_sales = db.Column(db.Float(50), nullable=True)
    other_sales = db.Column(db.Float(50), nullable=True)
    global_sales = db.Column(db.Float(50), nullable=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'cover': self.cover,
            'platform': self.platform,
            'release_date': self.release_year,
            'genre': self.genre,
            'publisher': self.publisher,
            'na_sales': self.na_sales,
            'eu_sales': self.eu_sales,
            'jp_sales': self.jp_sales,
            'other_sales': self.other_sales,
            'global_sales': self.global_sales,
            'owner_id': self.owner_id
        }

    def __repr__(self):
        return f"Game('{self.title}', '{self.genre}')"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    games = db.relationship('Game', backref='owner', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}')"
