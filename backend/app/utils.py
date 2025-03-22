import ebooklib
from ebooklib import epub
from bs4 import BeautifulSoup
import re
import os

def get_epub_word_count(epub_file):
    book = epub.read_epub(epub_file)

    word_count = 0

    for item in book.items:
        if item.get_type() == ebooklib.ITEM_DOCUMENT:
            soup = BeautifulSoup(item.get_content(), "html.parser")
            text = soup.get_text()
            words = re.findall(r'\b\w+\b', text)
            word_count += len(words)

    return word_count


def extract_metadata(epub_file):
    book = epub.read_epub(epub_file)

    metadata = {}
    metadata['title'] = book.get_metadata('DC', 'title')[0][0] # first instances
    metadata['identifier'] = book.get_metadata('DC', 'identifier')[0][0]
    if len(book.get_metadata('DC', 'creator')):
        metadata['author'] = book.get_metadata('DC', 'creator')[0][0]
    metadata['epub_file'] = epub_file
    metadata['word_count'] = get_epub_word_count(epub_file)
    return metadata

def delete_file(f):
    os.remove(f)