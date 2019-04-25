from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileRequired, FileAllowed
from wtforms import StringField,TextAreaField
from wtforms.validators import DataRequired

class RegisterForm(FlaskForm):
    username = StringField("Username",validators=[DataRequired()])
    photo = FileField('Photo', validators=[ FileRequired(),FileAllowed(['jpg', 'png', 'Images only!'])])
    passw = StringField("Password",validators=[DataRequired()])
    fname = StringField("Firstname",validators=[DataRequired()])
    lname = StringField("Last Name",validators=[DataRequired()])
    email = StringField("Email",validators=[DataRequired()])
    location = StringField("location",validators=[DataRequired()])
    bio = TextAreaField("Biography",validators=[DataRequired()])
    
class LoginForm(FlaskForm):
    username = StringField("Username",validators=[DataRequired()])
    passw = StringField("Password",validators=[DataRequired()])
    
class postForm(FlaskForm):
    photo = FileField('Photo', validators=[ FileRequired(),FileAllowed(['jpg', 'png', 'Images only!'])])
    caption = StringField("Caption",validators=[DataRequired()])
   
    
    
    