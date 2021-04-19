import sqlalchemy
from data.db_session import SqlAlchemyBase


class Case(SqlAlchemyBase):
    __tablename__ = 'cases'

    name = sqlalchemy.Column(sqlalchemy.String, nullable=False, primary_key=True)
    name_user = sqlalchemy.Column(sqlalchemy.String, nullable=False)
