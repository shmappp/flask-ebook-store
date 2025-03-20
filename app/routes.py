from flask import render_template, request, jsonify
from app import app, db
from app.models import Book 

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/upload', methods=['POST'])
def upload():
    #file = request.file
    pass


@app.route('/add_book', methods=['POST'])
def add_book():
    data = request.get_json()
    book = Book(
        title=data.get('title'),
        author=data.get('author')
    )
    db.session.add(book)
    db.session.commit()
    return jsonify(book.to_dict()), 201