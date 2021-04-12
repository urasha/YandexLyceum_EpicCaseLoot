from flask import Flask, render_template,redirect
from forms.login_form import LoginForm
from data import db_session
from blueprints import login_user, register_user
from data.users import User
from flask_login import LoginManager, current_user

app = Flask(__name__)
app.config['SECRET_KEY'] = '5a9v2DoYgriGnnk7UO22Br70WZK2NY'

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).get(user_id)


@app.route('/')
def main_page():
    return render_template('main.html')


def main():
    db_session.global_init('db/case.sqlite')
    app.register_blueprint(login_user.blueprint)
    app.register_blueprint(register_user.blueprint)
    app.run(port=8080, host='127.0.0.1', debug=True)


if __name__ == '__main__':
    main()
