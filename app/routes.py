from flask import render_template, request, jsonify
from app import app, db
from app.models import Book 
import sqlalchemy as sa 

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
        author=data.get('author'),
        isbn=data.get('isbn')
    )
    db.session.add(book)
    db.session.commit()
    return jsonify(book.to_dict()), 201

@app.route('/remove_book', methods=['POST'])
def remove_book():
    # removes by isbn
    data = request.get_json()
    book =  db.session.scalar(sa.select(Book).where(Book.isbn == data.get('isbn')))
    if book:
        db.session.remove(book)
        return jsonify(book.to_dict()), 200
    else:
        return jsonify({}), 204

@app.route('/book_list', methods=['GET'])
def book_list():
    books = db.session.scalars(sa.select(Book)).all()
    return jsonify([book.to_dict() for book in books]), 200