from flask import Flask, render_template,redirect
from forms.login_form import LoginForm
from data import db_session
from blueprints import login_user, register_user, open_case
from data.users import User
from flask_login import LoginManager, current_user
from flask_mail import Mail
from cloudipsp import Api, Checkout

app = Flask(__name__)
app.config['SECRET_KEY'] = '5a9v2DoYgriGnnk7UO22Br70WZK2NY'
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True

# только почту мою не крадите :(

app.config['MAIL_USERNAME'] = 'urasha24@gmail.com'
app.config['MAIL_DEFAULT_SENDER'] = 'urasha24@gmail.com'
app.config['MAIL_PASSWORD'] = '31323435dD'
mail = Mail(app)

login_manager = LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def load_user(user_id):
    db_sess = db_session.create_session()
    return db_sess.query(User).get(user_id)


@app.route('/pay/<int:money>')
def buy(money):
    # в системе оплаты уже не регался, чтобы прям оплату делать
    api = Api(merchant_id=1396424,
              secret_key='test')
    checkout = Checkout(api=api)
    data = {
        "currency": "RUB",
        "amount": str(money) + '00'
    }
    url = checkout.url(data).get('checkout_url')
    return redirect(url)


@app.route('/')
def main_page():
    return render_template('main.html')


@app.route('/delivery')
def delivery():
    return render_template('delivery.html')


@app.route('/questions')
def about_us():
    return render_template('questions.html')


def main():
    db_session.global_init('db/case.sqlite')
    app.register_blueprint(login_user.blueprint)
    app.register_blueprint(register_user.blueprint)
    app.register_blueprint(open_case.blueprint)
    app.run(port=8080, host='127.0.0.1')


if __name__ == '__main__':
    main()
