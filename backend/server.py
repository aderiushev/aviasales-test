import os
from flask import Flask, json
from flask_cors import CORS

app = Flask(__name__, static_url_path='')
CORS(app)

@app.route('/')
def api_root():
    return 'Welcome'

@app.route('/api/dashboard')
def api_dashboard():
    with app.open_resource('dashboard_data.json') as f:
        data = json.load(f)

        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )

        return response