import sqlalchemy
from data.db_session import SqlAlchemyBase


class Case(SqlAlchemyBase):
    __tablename__ = 'cases'

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True, autoincrement=True)
    name = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    name_user = sqlalchemy.Column(sqlalchemy.String, nullable=False)
    cost = sqlalchemy.Column(sqlalchemy.Integer, nullable=False)
