import pandas as pd


#import dependencies
from flask import Flask
from flask import render_template 
from flask import jsonify
from flask import json


# Import the functions we need from SQL Alchemy
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func,  inspect, distinct
from sqlalchemy.types import Integer, Text, String, DateTime
from config import username, password

#############################################################
#                      DATABASE SETUP                       #
#############################################################

#Setting up connection to SQL-Lite and Base Connections
#This work is based on testing in Jupyter Notebook from Same Assignment
engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/Golf')
Base = automap_base()
Base.prepare(engine, reflect=True)
#creating object for measurement and station
golf_details = Base.classes.golf_details

session = Session(engine)
inspector = inspect(engine)

##loading column names

columns_df = []
columns = inspector.get_columns('golf_details')
for c in columns:
    #print(c['name'], c["type"])
    #headings.append(f"golf_details.{c['name']}")
    columns_df.append( c['name'])

sel = [ golf_details.course_id,golf_details.course,golf_details.city,golf_details.state,
      golf_details.street,golf_details.zip_code,golf_details.lng,golf_details.lat,
      golf_details.hole,golf_details.public_private,golf_details.golf_season,
      golf_details.beg_mnth,golf_details.end_mnth,
      golf_details.championship_par, golf_details.championship_yards,golf_details.championship_slope,golf_details.championship_usga,
      golf_details.middle_par,golf_details.middle_yards, golf_details.middle_slope,golf_details.middle_usga,
      golf_details.forward_par, golf_details.forward_yards, golf_details.forward_slope,golf_details.forward_usga,
      golf_details.phone, golf_details.architect, golf_details.year_built, golf_details.guest_policy,
      golf_details.credit_card, golf_details.range, golf_details.rental_club, golf_details.pro_in_house,
      golf_details.metal_spikes_okay, golf_details.weekday, golf_details.weekend, golf_details.tee_time_welcomed,
      golf_details.rental_cart_available]#pulling only date and precipitation.

golf_data = session.query(*sel).all() 

##putting data into dataframe
## done if rather brute force way - opportunity to optimize at later date.
golf_df = pd.DataFrame(columns = columns_df)
print(len(golf_data))
for i in range(0, len(golf_data)):
    record = golf_data[i]
    temp = []
    for j in range(0,len(columns_df)):
        temp.append(record[j])
    golf_df.loc[i]=temp

golf_dict = golf_df.to_dict(orient = 'records')
#############################################################
#                       FLASK SETUP                        #
#############################################################

#create an app
app = Flask(__name__)

# Effectively disables page caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0 

#Define what to do when a user hits the index route
@app.route("/")
def home():

    return render_template("index.html") 

# test route is used as the endpoint for the dataset.
@app.route("/test")
def test():
    
    return jsonify(golf_dict)

#Define search route

@app.route("/search")
def course():

    webpage = render_template("search.html")
    return webpage

@app.route("/about")
def about():

    webpage = render_template("about.html")
    return webpage

#run the app
if __name__ == "__main__":
    app.run(debug=True)
