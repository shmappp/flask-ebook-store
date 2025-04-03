from typing import Optional
from datetime import datetime, timezone
from sqlalchemy import UniqueConstraint
import sqlalchemy as sa
import sqlalchemy.orm as so
from flask_login import UserMixin
from app import db
from werkzeug.security import generate_password_hash, check_password_hash


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    username: so.Mapped[str] = so.mapped_column(sa.String(64), index=True, unique=True)
    password_hash: so.Mapped[str] = so.mapped_column(sa.String(256))
    books: so.WriteOnlyMapped['Book'] = so.relationship(back_populates='owner')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

class Book(db.Model):
    __tablename__ = 'books'
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    title: so.Mapped[str] = so.mapped_column(sa.String(255))
    author: so.Mapped[Optional[str]] = so.mapped_column(sa.String(255))
    identifier: so.Mapped[str] = so.mapped_column(sa.String(255), unique=True)
    epub_file: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=True) # for debug purposes, keep nullable until upload required
    uploaded_at: so.Mapped[Optional[datetime]] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))
    word_count: so.Mapped[Optional[int]] = so.mapped_column()
    
    owner_id: so.Mapped[Optional[int]] = so.mapped_column(sa.ForeignKey('users.id'), nullable=True)
    owner: so.Mapped[Optional[User]] = so.relationship(back_populates='books')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "identifier": self.identifier,
            "epub_file": self.epub_file,
            "uploaded_at": self.uploaded_at.strftime('%Y-%m-%d %H:%M:%S'),
            "word_count": self.word_count,
            "owner": self.owner
        }

    def __repr__(self):
        return str(self.to_dict())

class ReadingProgress(db.Model):
    __tablename__ = 'reading_progress'
    user_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey('users.id'), primary_key=True)
    book_id: so.Mapped[int] = so.mapped_column(sa.ForeignKey('books.id'), primary_key=True)
    position: so.Mapped[str] = so.mapped_column(sa.String(64))
    updated_at: so.Mapped[Optional[datetime]] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))

    user: so.Mapped[User] = so.relationship('User')
    book: so.Mapped[Book] = so.relationship('Book')