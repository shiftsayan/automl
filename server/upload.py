import os
from curses import flash
from flask import redirect, request
from flask_restful import Resource
from werkzeug.utils import secure_filename


class Upload(Resource):
    def post(self):
        # check if the post request has the file part
        if 'file' not in request.files:
            flash('No file')
            return redirect(request.url)
        file = request.files['file']
        # If the user does not select a file, the browser submits an
        # empty file without a filename.
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        filename = secure_filename(file.filename)
        file.save(os.path.join('uploads', filename))
        return {'message': 'File uploaded.'}
