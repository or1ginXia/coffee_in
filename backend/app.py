from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import os
from flask import url_for, send_from_directory
import random

# Configuration
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['STATIC_URL_PATH'] = '/static'
app.config['STATIC_FOLDER'] = 'static'

CORS(app)


os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)


# Initialize SQLAlchemy and CORS
db = SQLAlchemy(app)

# Model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128))
    credit = db.Column(db.Integer)
    password = db.Column(db.String(128))
    address = db.Column(db.String(128))
    imageURI = db.Column(db.String(300))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(80), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    bitterness = db.Column(db.Integer, nullable=False)
    acidity = db.Column(db.Integer, nullable=False)
    body = db.Column(db.Integer, nullable=False)
    beanOrigin = db.Column(db.String(120), nullable=False)
    beanType = db.Column(db.String(120), nullable=False)
    roast = db.Column(db.String(120), nullable=False)
    brewingMethod = db.Column(db.String(120), nullable=False)
    details = db.Column(db.String(300), nullable=False)
    imageURI = db.Column(db.String(300), nullable=False)

class SavedPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    postId = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

class following(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    followingId = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Initialize database
from app import app, db, Post, User

def create_fake_users():
    # List of fake users
    fake_users = [
        {
            "username": "user1",
            "email": "user1@gmail.com",
            "password": "password1",
            "credit": 1000
        },
        {
            "username": "user2",
            "email": "user2@gmail.com",
            "password": "password2",
            "credit": 2000
        },
    ]

    # Add fake users to the database
    for user_data in fake_users:
        user = User(
            username=user_data["username"],
            email=user_data["email"],
            credit=user_data["credit"],
            address = 'New York',
            password = user_data["password"]
        )
        user.set_password(user_data["password"])
        db.session.add(user)
        
    db.session.commit()
    print("Fake users added to the database")

def create_fake_posts():
    # Define some fake image URIs
    # List of fake posts
    fake_posts = [
        {
            "userId": 1,
            "type": "Espresso Supreme",
            "location": "Joe Coffee",
            "bitterness": 3,
            "acidity": 1,
            "body": 4,
            "beanOrigin": "Colombia",
            "beanType": "Arabica",
            "roast": "Light roast",
            "brewingMethod": "Espresso Machine",
            "details": "It's a concentrated and strong coffee with a layer of crema on top.",
            "imageURI": "https://www.dailygrind.com/wp-content/uploads/2018/11/espresso-1.jpg"
        },
        {
            "userId": 1,
            "type": "Matcha Madness",
            "location": "Starbucks",
            "bitterness": 4,
            "acidity": 3,
            "body": 4,
            "beanOrigin": "Kyoto",
            "beanType": "Arabica",
            "roast": "dark roast",
            "brewingMethod": "Pour-Over",
            "details": "A unique blend that combines the earthy notes of matcha green tea with the invigorating kick of coffee. It's a vibrant fusion of two worlds, offering a refreshing and energizing cup.",
            "imageURI": "https://cdn.vox-cdn.com/thumbor/68-_ZBfOXzgQxSVCxYVeq7HqI74=/0x41:800x491/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/46335946/_MG_0202.0.0.0.jpg"
        },
        {
            "userId": 1,
            "type": "Caramel Delight",
            "location": "Gail's Bakery",
            "bitterness": 1,
            "acidity": 4,
            "body": 2,
            "beanOrigin": "Vietnam",
            "beanType": "Arabica",
            "roast": "dark roast",
            "brewingMethod": "Cold Brew",
            "details": "Indulge in the sweet embrace of caramel-infused coffee. This blend marries the rich, buttery notes of caramel with the boldness of coffee for a harmonious and satisfying treat.",
            "imageURI": "https://houseandhome.com/wp-content/uploads/2011/10/drinks-caramelappledelight-BlueDiamond.jpg"
        },
        {
            "userId": 2,
            "type": "Hazelnut Heaven",
            "location": "Costa",
            "bitterness": 0,
            "acidity": 0,
            "body": 4,
            "beanOrigin": "Ethiopia",
            "beanType": "Arabica",
            "roast": "medium roast",
            "brewingMethod": "Drip Coffee Maker",
            "details": "Experience a slice of coffee heaven with the warm, nutty essence of hazelnut. It's a comforting and aromatic brew that envelops you in its delightful hazelnut embrace.",
            "imageURI": "https://www.havocinthekitchen.com/wp-content/uploads/2022/04/Chocolate-Hazelnut-Cream-Liquor-3-1.jpg"
        },
        {
            "userId": 2,
            "type": "Vanilla Velvet",
            "location": "Blue bottle",
            "bitterness": 3,
            "acidity": 2,
            "body": 4,
            "beanOrigin": "Brazil",
            "beanType": "Arabica",
            "roast": "light roast",
            "brewingMethod": "Espresso Machine",
            "details": "Smooth and luxurious, this coffee is like a velvet-textured hug. The gentle sweetness of vanilla enhances the coffee's natural flavors, resulting in a soothing and elegant cup.",
            "imageURI": "https://www.pjscoffee.com/uploads/vanilla-velvet-ice-black.jpg"
        },
    ]


    # Add fake posts to the database
    for post_data in fake_posts:
        post = Post(
            userId=post_data["userId"],
            type=post_data["type"],
            location=post_data["location"],
            bitterness=post_data["bitterness"],
            acidity=post_data["acidity"],
            body=post_data["body"],
            beanOrigin=post_data["beanOrigin"],
            beanType=post_data["beanType"],
            roast=post_data["roast"],
            brewingMethod=post_data["brewingMethod"],
            details=post_data["details"],
            imageURI=post_data["imageURI"]
        )
        db.session.add(post)
    
    db.session.commit()
    print("Fake posts added to the database")

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

# Routes
@app.route('/register', methods=['POST'])
def register():
    print("Registering user...")
    print(request.get_json())
    data = request.get_json()
    
    # Check if user already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify(message="User already exists"), 409
    
    filename = secure_filename('default-user.png')
    image_url = url_for('uploaded_file', filename=filename, _external=True)

    new_user = User(
        username=data['username'], 
        email=data['email'], 
        credit=random.randint(0,500), 
        password=data['password'], 
        address='New York', 
        imageURI=image_url)
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify(message="User registered successfully"), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data['username']).first()
    
    if user and user.check_password(data['password']):
        return jsonify({
            "message":"Login successful",
            "id": user.id,
        }), 200

    return jsonify(message="Invalid username or password"), 401

@app.route('/profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get(int(user_id))
    if user:
        return jsonify({
            'id':str(user.id).zfill(8),
            "username": user.username,
            "credit":user.credit,
            "password":user.password,
            "address": user.address,
            'imgurl': user.imageURI
        }), 200
    else:
        return jsonify(message="User not found"), 404


@app.route('/change-profile', methods=['POST'])
def change_profile():
    file = request.form
    if file:
        if file['username'] == '':
            return jsonify({'message': 'Username cannot be empty'}), 400
        if file['password'] == '':
            return jsonify({'message': 'Password cannot be empty'}), 400
        user = User.query.get(str(file['id']))

        user.address = file['address']
        user.username = file['username']
        user.password = file['password']
        user.set_password(file['password'])
        if request.files.get('avatar') != None:
            filename = secure_filename(request.files.get('avatar').filename)
            request.files.get('avatar').save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            image_url = url_for('uploaded_file', filename=filename, _external=True)
            user.imageURI = image_url

        db.session.commit()
    
        return jsonify({'message': 'Profile change successfully'}), 201

    return jsonify({'message': 'Fail to change profile'}), 400

@app.route('/coffee-posts', methods=['GET'])
def get_coffee_posts():
    posts = Post.query.all()  # Or however you filter your coffee posts
    return jsonify([{"id": post.id, "name": post.type, "brand": post.location, "imageUrl": post.imageURI} for post in posts])

@app.route('/saved-coffee-posts/<user_id>', methods=['GET'])
def get_saved_coffee_posts(user_id):
    if user_id is None:
        return jsonify(message="No user logged in"), 401

    saved_post_pairs = SavedPost.query.filter_by(userId=user_id).all()
    saved_posts = [Post.query.get(saved_post_pair.postId) for saved_post_pair in saved_post_pairs]

    return jsonify([{"id": post.id, "name": post.type, "brand": post.location, "imageUrl": post.imageURI} for post in saved_posts])

@app.route('/followed-coffee-posts/<user_id>', methods=['GET'])
def get_followed_coffee_posts(user_id):
    if user_id is None:
        return jsonify(message="No user logged in"), 401
    
    posts = Post.query.filter_by(userId=1).all()
    return jsonify([{"id": post.id, "name": post.type, "brand": post.location, "imageUrl": post.imageURI} for post in posts])


@app.route('/my-coffee-posts/<user_id>', methods=['GET'])
def get_my_coffee_posts(user_id):
    if user_id is None:
        return jsonify(message="No user logged in"), 401

    posts = Post.query.filter_by(userId=user_id).all()
    return jsonify([{"id": post.id, "name": post.type, "brand": post.location, "imageUrl": post.imageURI} for post in posts])

@app.route('/post/<int:post_id>', methods=['GET'])
def get_post(post_id):
    post = Post.query.get(post_id)
    user = User.query.get(post.userId)
    if post:
        return jsonify({
            "id": post.id,
            "type": post.type,
            "location": post.location,
            "bitterness": post.bitterness,
            "acidity": post.acidity,
            "body": post.body,
            "beanOrigin": post.beanOrigin,
            "beanType": post.beanType,
            "roast": post.roast,
            "brewingMethod": post.brewingMethod,
            "details": post.details,
            "imageURI": post.imageURI,
            "username": user.username,
            "credit": user.credit
        }), 200
    else:
        return jsonify(message="Post not found"), 404

@app.route('/create', methods=['POST'])
def create_post():
    if 'image' not in request.files:
        return jsonify({'message': 'No image part in the request'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'message': 'No image selected for uploading'}), 400

    if file:  # If the file exists and is valid
        filename = secure_filename(file.filename)
        file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        
        image_url = url_for('uploaded_file', filename=filename, _external=True)

        # Create a new Post object
        new_post = Post(
            userId=request.form['userId'],  # Assuming a fixed userId for now; replace with actual user ID logic
            type=request.form['name'],
            location=request.form['location'],
            bitterness=int(request.form['bitterness']),
            acidity=int(request.form['acidity']),
            body=int(request.form['body']),
            beanOrigin=request.form['beanOrigin'],
            beanType=request.form['beanType'],
            roast=request.form['roast'],
            brewingMethod=request.form['brewingMethod'],
            details=request.form['details'],
            imageURI=image_url
        )

        # Add to the database
        db.session.add(new_post)
        db.session.commit()

        return jsonify({'message': 'Post created successfully'}), 201

    return jsonify({'message': 'Allowed image types are - png, jpg, jpeg, gif'}), 400

@app.route('/save_post', methods=['POST'])
def save_post():
    data = request.get_json()
    user_id = data['userId']
    post_id = data['postId']
    save = data['save']

    if save:
        # Add to SavedPost
        saved_post = SavedPost(userId=user_id, postId=post_id)
        db.session.add(saved_post)
    else:
        # Remove from SavedPost
        SavedPost.query.filter_by(userId=user_id, postId=post_id).delete()

    db.session.commit()
    return jsonify({'message': 'Success'}), 200

@app.route('/check_saved/<int:post_id>/<int:user_id>', methods=['GET'])
def check_saved(post_id, user_id):
    if not user_id:
        return jsonify({'isSaved': False}), 401  # or appropriate status code

    saved_post = SavedPost.query.filter_by(userId=user_id, postId=post_id).first()
    return jsonify({'isSaved': saved_post is not None})

with app.app_context():
    # clean up the database
    db.drop_all()
    db.create_all()
    create_fake_users()
    create_fake_posts()

# Run the app
if __name__ == '__main__':
    app.run(debug=True)
