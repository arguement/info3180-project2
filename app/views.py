from app import app,db
from flask import render_template,request,redirect,url_for,flash, jsonify, g, session, abort
from werkzeug.utils import secure_filename
import os
from app.forms import RegisterForm,LoginForm,postForm
from app.models import Users,Posts,Likes,Followers
import datetime
from werkzeug.security import check_password_hash


# Using JWT
import jwt
from flask import _request_ctx_stack
from functools import wraps
import base64


def requires_auth(f):
  @wraps(f)
  def decorated(*args, **kwargs):
    auth = request.headers.get('Authorization', None)
    if not auth:
      return jsonify({'code': 'authorization_header_missing', 'description': 'Authorization header is expected'}), 401

    parts = auth.split()

    if parts[0].lower() != 'bearer':
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must start with Bearer'}), 401
    elif len(parts) == 1:
      return jsonify({'code': 'invalid_header', 'description': 'Token not found'}), 401
    elif len(parts) > 2:
      return jsonify({'code': 'invalid_header', 'description': 'Authorization header must be Bearer + \s + token'}), 401

    token = parts[1]
    try:
         payload = jwt.decode(token, 'some-secret')

    except jwt.ExpiredSignature:
        return jsonify({'code': 'token_expired', 'description': 'token is expired'}), 401
    except jwt.DecodeError:
        return jsonify({'code': 'token_invalid_signature', 'description': 'Token signature is invalid'}), 401

    g.current_user = user = payload
    return f(*args, **kwargs)

  return decorated
  
@app.route('/token')
def generate_token():
    # Under normal circumstances you would generate this token when a user
    # logs into your web application and you send it back to the frontend
    # where it can be stored in localStorage for any subsequent API requests.
    payload = {'sub': '12345', 'name': 'John Doe'}
    token = jwt.encode(payload, 'some-secret', algorithm='HS256').decode('utf-8')

    return jsonify(error=None, data={'token': token}, message="Token Generated")

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    """
    Because we use HTML5 history mode in vue-router we need to configure our
    web server to redirect all routes to index.html. Hence the additional route
    "/<path:path".

    Also we will render the initial webpage and then let VueJS take control.
    """
    return render_template('index.html')
    
@app.route("/api/users/register",methods=['GET','POST'])
def register():
    form = RegisterForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            username = form.username.data
            photo = form.photo.data
            passw = form.passw.data
            fname = form.fname.data
            lname = form.lname.data
            email = form.email.data
            location = form.location.data
            bio = form.bio.data
            joined = getDate()
            filename = secure_filename(photo.filename)
            photo.save(os.path.join(
            app.config['UPLOAD_FOLDER'], filename
              ))
            
            user = Users(username,passw,fname,lname,email,location,bio,filename,joined)
            db.session.add(user)
            db.session.commit()
            
            print("valid")
            return jsonify({'works':"true"})
        
        return jsonify(error= form_errors(form))
    print("not at all")
    
@app.route("/api/users/<user_id>/posts",methods=['GET','POST'])
@requires_auth
def posting(user_id):
    form = postForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            photo = form.photo.data
            caption = form.caption.data
            filename = secure_filename(photo.filename)
            photo.save(os.path.join(
            app.config['UPLOAD_FOLDER'], filename
              ))
            post = Posts(user_id=user_id,photo=filename,caption=caption,created_on=getDate())
            db.session.add(post)
            db.session.commit()
            return jsonify(data={"message": "Successfully created a new post"})
        return jsonify(error= form_errors(form))
            
@app.route("/api/auth/login",methods=["GET","POST"])
def login():
    form = LoginForm()
    if request.method == 'POST':
        if form.validate_on_submit():
            username = form.username.data
            passw = form.passw.data
            
            user = Users.query.filter_by(username=username).first()
            print(user)
            
            
            if user is not None and check_password_hash(user.password, passw):
                
                payload = {'username': username}
                token = jwt.encode(payload, 'some-secret', algorithm='HS256').decode('utf-8')

                return jsonify(error=None, data={'token': token}, message="Token Generated",id=user.id)
            else:
                return jsonify(errors=["error not valid info"])
                
        return jsonify(error= form_errors(form))

@app.route("/api/posts",methods=["GET","POST"])
@requires_auth
def getPosts():
    user = Posts.query.all()
    # print(user[0].caption)
    lst = []
    for i in user:
        a = Likes.query.filter_by(user_id=i.user_id,post_id=i.id).first()
        a = 0 if a == None else len(a)
        name = Users.query.get(i.user_id).username
        
        lst.append( {"id":i.id,"user_id":i.user_id,"photo":i.photo,"caption":i.caption,"created_on":i.created_on,"likes":a,"username":name} )
        
    return jsonify(posts=lst)
    
@app.route("/api/users/<user_id>/follow")
@requires_auth
def follow(user_id):
    user = Users.query.get(user_id).firsr()
    name = user.username
    bio = user.bio
    photo = user.photo
    posts = len(Posts.query.filter_by(user_id=user_id).all())
    

def getDate():
    now = datetime.datetime.now()
    return now.strftime("%B %d,%Y")

@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also tell the browser not to cache the rendered page. If we wanted
    to we could change max-age to 600 seconds which would be 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response


@app.errorhandler(404)
def page_not_found(error):
    """Custom 404 page."""
    return render_template('404.html'), 404
    
def form_errors(form):
    error_messages = []
    """Collects form errors"""
    for field, errors in form.errors.items():
        for error in errors:
            message = u"Error in the %s field - %s" % (
                    getattr(form, field).label.text,
                    error
                )
            error_messages.append(message)

    return error_messages


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port="8080")