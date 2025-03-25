from flask import render_template, request, jsonify
from app import app, db
from app.models import Book 
import sqlalchemy as sa 
from app.utils import extract_metadata, delete_file

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
        # TODO: fix file overwrite logic, files that have identifier conflicts are not necessarily the same file (? to verify)
        # may not be a bad thing to just override?
        epub_file_path = f"books/{file.filename}"
        file.save(epub_file_path)
        # get metadata
        metadata = extract_metadata(epub_file_path)
        existing_book = db.session.scalar(sa.select(Book).where(Book.identifier == metadata['identifier']))
        if existing_book:
            # no need to remove, existing file stays (see above TODO)
            return jsonify({'error': 'non-unique identifier'}), 400
        book = Book(
            title=metadata['title'],
            author=metadata['author'],
            identifier=metadata['identifier'],
            epub_file=metadata['epub_file'],
            word_count=metadata['word_count']
        )
        db.session.add(book)
        db.session.commit()
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
    book =  db.session.scalar(sa.select(Book).where(Book.id == data.get('id')))
    if book:
        to_delete_path = book.epub_file
        db.session.delete(book)
        db.session.commit()
        if to_delete_path:
            delete_file(to_delete_path)
        return jsonify(book.to_dict()), 200
    else:
        return jsonify({'info': 'no such file'}), 204

@app.route('/metadata/<filename>', methods=['GET'])
def get_metadata(filename):
    path = os.path.join('books', filename)
    book = db.session.scalar(sa.select(Book).where(Book.epub_file == path))
    if book:
        return jsonify(book.to_dict()), 200
    else:
        return jsonify({'error': 'no such file'})

@app.route('/book_list', methods=['GET'])
def book_list():
    books = db.session.scalars(sa.select(Book)).all()
    return jsonify([book.to_dict() for book in books]), 200
