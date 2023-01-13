from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from preview import Preview
from setup import Setup
from test import Test
from train import Train

from upload import Upload

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Upload, '/upload')
api.add_resource(Preview, '/preview')
api.add_resource(Setup, '/setup')
api.add_resource(Train, '/train')
api.add_resource(Test, '/test')


if __name__ == '__main__':
    app.run(debug=True)
