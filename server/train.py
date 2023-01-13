from curses import flash
import time
from flask import redirect, request
from flask_restful import Resource


class Train(Resource):
    def post(self):
        json = request.get_json()
        filename = json.get('filename')
        input_columns = json.get('inputColumns')
        output_columns = json.get('outputColumns')
        if filename is None or input_columns is None or output_columns is None:
            flash('No data')
            return redirect(request.url)

        time.sleep(5)
        return {'message': 'Training started.'}

