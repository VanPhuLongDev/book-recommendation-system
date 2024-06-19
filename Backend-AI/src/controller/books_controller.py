from flask import Blueprint, request
from src.service.book_service import BookService
from flask import jsonify

books = Blueprint('books', __name__, url_prefix='/books')

@books.route('/', methods=['POST'])
def addBook():
    try:
        data = request.get_json()
        BookService().create_book(data)
        return 'Book added successfully', 200
    except Exception as e:
        print(e)
        return jsonify({
                    "message": "An error occurred while adding book",
                }), 500

@books.route('/relative', methods=['GET'])
def getRelativeBooks():
    try:
        book_id = int(request.args.get('book_id'))
        limit = int(request.args.get('limit'))
        books = BookService().get_relative_books(book_id, limit)
        return jsonify(books), 200
    except Exception as e:
        print(e)
        return jsonify({
                    "message": "An error occurred while getting relative books",
                }), 500
    

@books.route('/semantic', methods=['GET'])
def getSemanticSearch():
    try:
        texts = request.args.get('texts')
        limit = int(request.args.get('limit'))
        books = BookService().get_semantic_search(texts,limit=limit)
        return jsonify(books), 200
    except Exception as e:
        print(e)
        return jsonify({
                    "message": "An error occurred while getting semantic search",
                }), 500