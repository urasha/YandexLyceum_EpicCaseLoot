from flask import Blueprint, render_template, abort
from data import db_session, cases

blueprint = Blueprint(
    'open_case',
    __name__,
    template_folder='templates'
)


@blueprint.route('/case/<string:name>')
def show_case(name):
    db_sess = db_session.create_session()
    case = db_sess.query(cases.Case).filter(name == cases.Case.name).first()
    if case:
        return render_template('case.html', name=case.name_user)
    return abort(404)
