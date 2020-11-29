__author__ = "Cobbin"
from flask import Flask, render_template, request, url_for, flash
import os, requests
import smtplib, ssl
import src.models.msgs.constants as MsgsConstants #src.


app = Flask(__name__)
app.config.from_object('src.config') #src.
app.secret_key =  app.secret_key = os.environ.get("SECRETE_KEY") #"1234" 


@app.route('/')
def home():
    return render_template('home.html')

@app.route('/contact', methods=['GET', 'POST'])
def contact():
    if request.method == 'GET':
        with open("messages.txt", 'r') as messages:
            content = messages.readlines()
            return render_template('messages.html', messages=content)

    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    with open("messages.txt", 'a') as messages:
        messages.write(f" {name}    {email}      {message} \n")
        flash('Message Sent (:')
        return redirect(url_for('home'))
