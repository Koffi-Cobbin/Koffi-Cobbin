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

def send(name, email, content):
    return requests.post(
        MsgsConstants.URL,
        auth = ("api", MsgsConstants.API_KEY),
        data = {
            "from": MsgsConstants.FROM,
            "to": MsgsConstants.ADMINS_EMAIL,
            "subject": "Email from {}, {}.".format(name, email),
            "text": "{}".format(content)
        }
    )

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    content = request.form['message']
    """
        Using SMTP_SSL()
    """
    smtp_server = "smtp.gmail.com"
    sender_email = os.environ.get("SENDER_EMAIL") 
    receiver_email = os.environ.get("ADMINS_EMAIL")
    password = os.environ.get("PASSWORD")
    message = """\
    {}

    Hi there,
    A message from {}, {}. 
    {}.""".format(sender_email, name, email, content)

    # Create a secure SSL context
    context = ssl.create_default_context()

    with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, message)
    flash('Message Sent (:')
    return redirect(url_for('home'))