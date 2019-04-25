from app import db
from werkzeug.security import generate_password_hash

class Posts(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    photo = db.Column(db.String(60))
    caption = db.Column(db.String(60))
    created_on = db.Column(db.String(60))



class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(85))
    password = db.Column(db.String(255))
    fname = db.Column(db.String(60))
    lname = db.Column(db.String(60))
    email = db.Column(db.String(60))
    location = db.Column(db.String(60))
    bio = db.Column(db.String(250))
    prof_photo = db.Column(db.String(150))
    joined_on = db.Column(db.String(150))
    
    def __init__(self,username,password,fname,lname,email,location,bio,prof_photo,joined_on):
        self.username = username
        self.password = generate_password_hash(password, method='pbkdf2:sha256')
        self.fname = fname
        self.lname = lname,
        self.email = email
        self.location = location
        self.bio = bio
        self.prof_photo = prof_photo
        self.joined_on = joined_on
    

class Likes(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    post_id = db.Column(db.Integer)
    
class Followers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer)
    follower_id = db.Column(db.Integer)