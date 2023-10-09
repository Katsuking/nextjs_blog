from pymongo import MongoClient
import json

myclient = MongoClient("mongodb://root:root_password@localhost:27017")
connection_info = json.dumps(myclient.server_info(), indent=4)
print(connection_info) # connection check

