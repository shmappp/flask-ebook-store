from flask import render_template, request, jsonify
from app import app, db
from app.models import Book 
import sqlalchemy as sa 
from app.utils import extract_metadata

@app.route('/')
def index():
    return 'Hello World!'

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return jsonify({'error': 'no file in request'}), 400
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'no file selected'}), 400
    if file and file.filename.endswith('.epub'):
        file.save(f"books/{file.filename}")
        epub_file = f"books/{file.filename}"
        # get metadata
        metadata = extract_metadata(epub_file)
        return metadata, 201
    else:
        return jsonify({'error': 'incorrect file type, requires .epub'}), 400
    

@app.route('/add_book', methods=['POST'])
def add_book():
    data = request.get_json()
    book = Book(
        title=data.get('title'),
        author=data.get('author'),
        identifier=data.get('identifier')
    )
    db.session.add(book)
    db.session.commit()
    return jsonify(book.to_dict()), 201

@app.route('/remove_book', methods=['POST'])
def remove_book():
    # removes by identifier
    data = request.get_json()
    book =  db.session.scalar(sa.select(Book).where(Book.identifier == data.get('identifier')))
    if book:
        db.session.delete(book)
        db.session.commit()
        return jsonify(book.to_dict()), 200
    else:
        return jsonify({}), 204

@app.route('/book_list', methods=['GET'])
def book_list():
    books = db.session.scalars(sa.select(Book)).all()
    return jsonify([book.to_dict() for book in books]), 200