import json

from flask import Flask
from flask import request
import flask
app = Flask(__name__)

import pymysql.cursors

dbConnection = pymysql.connect(host='localhost',
    user='root',
    db='electronics',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor)

@app.route("/api/hello")
def hello():
    return json.dumps("Hello World!")

@app.route("/api/getComponents")
def getComponents():
    with dbConnection.cursor() as cursor:
        sql = 'SELECT * FROM Component'
        cursor.execute(sql)
        result = cursor.fetchall()

        resp = flask.Response(json.dumps(result))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

@app.route("/api/getComponentTypes")
def getComponentTypes():
    with dbConnection.cursor() as cursor:
        sql = 'SELECT * FROM ComponentType'
        cursor.execute(sql)
        result = cursor.fetchall()

        resp = flask.Response(json.dumps(result))
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

@app.route("/api/setComponentAmount")
def setComponentAmount():
    amount = request.args.get('amount')
    ID = request.args.get('ID')

    if not str(amount).isdigit() or not str(ID).isdigit():
        resp = flask.Response("Invalid parameters")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

    with dbConnection.cursor() as cursor:
        sql = """
            UPDATE `Component` SET
                `Amount` = %s
                WHERE `ID` = %s;
        """
        cursor.execute(sql, (amount, ID))
        dbConnection.commit()

        resp = flask.Response("")
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

