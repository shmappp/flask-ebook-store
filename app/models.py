from typing import Optional
from datetime import datetime, timezone
import sqlalchemy as sa
import sqlalchemy.orm as so
from app import db


class Book(db.Model):
    id: so.Mapped[int] = so.mapped_column(primary_key=True)
    title: so.Mapped[str] = so.mapped_column(sa.String(255))
    author: so.Mapped[str] = so.mapped_column(sa.String(255))
    epub_file: so.Mapped[str] = so.mapped_column(sa.String(255), nullable=True) # for debug purposes, keep nullable until upload required
    uploaded_at: so.Mapped[Optional[datetime]] = so.mapped_column(index=True, default=lambda: datetime.now(timezone.utc))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "author": self.author,
            "epub_file": self.epub_file,
            "uploaded_at": self.uploaded_at.strftime('%Y-%m-%d %H:%M:%S')
        }

    def __repr__(self):
        return str(self.to_dict())
    