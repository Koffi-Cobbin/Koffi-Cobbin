__author__ = "Cobbin"
import os


URL = os.environ.get('MAILGUN_URL')
API_KEY = os.environ.get('MAILGUN_API_KEY')
FROM = os.environ.get('MAILGUN_FROM')
TO = None
SUBJECT = None
ALERT_TIMEOUT = 10
COLLECTION = "alerts"
ADMINS_EMAIL = "yaphetofori@gmail.com"