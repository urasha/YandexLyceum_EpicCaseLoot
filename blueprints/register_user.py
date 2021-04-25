from flask import Blueprint, redirect, render_template
from forms.register_form import RegisterForm
from data import db_session
from data.users import User
from flask_mail import Message
from main import mail
from random import choice
from string import ascii_letters
import threading

blueprint = Blueprint(
    'register_user',
    __name__,
    template_folder='templates'
)


def delete_user():
    db_sess = db_session.create_session()
    answers = db_sess.query(User).filter(User.confirmed == 0).all()
    for i in answers:
        db_sess.delete(i)
    db_sess.commit()


@blueprint.route('/register', methods=['GET', 'POST'])
def register():
    form = RegisterForm()
    if form.validate_on_submit():
        if form.password.data != form.password_again.data:
            return render_template('register.html', title='Регистрация',
                                   form=form,
                                   message="Пароли не совпадают")
        db_sess = db_session.create_session()
        if db_sess.query(User).filter((User.username == form.username.data)
                                      | (User.email == form.email.data)).first():
            return render_template('register.html', title='Регистрация',
                                   form=form,
                                   message="Такой пользователь уже есть")

        reg_pass = ''.join(choice(ascii_letters) for i in range(55))
        user = User(
            username=form.username.data.title(),
            email=form.email.data,
            reg_pass=reg_pass
        )
        user.set_password(form.password.data)
        db_sess.add(user)
        db_sess.commit()

        msg = Message("Подтверждение почты",
                      recipients=[form.email.data])
        msg.html = f"Чтобы подтвердить почту, пройдите по ссылке:\n" \
                   f"http://127.0.0.1:8080/register/{reg_pass}"
        mail.send(msg)

        timer = threading.Timer(300, delete_user)
        timer.start()

        return redirect('/login')
    return render_template('register.html', title='Регистрация', form=form)


@blueprint.route('/register/<reg_pass>')
def register_email(reg_pass):
    db_sess = db_session.create_session()
    user = db_sess.query(User).filter(User.reg_pass == reg_pass).first()

    if user:
        user.confirmed = 1
    db_sess.commit()

    return redirect('/login')
