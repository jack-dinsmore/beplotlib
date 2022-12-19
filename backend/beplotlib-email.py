# Kaveh Pezeshki
# 12/19/2022
# Following: https://developers.google.com/gmail/api/guides/sending#python

import json

import smtplib, ssl
from email.mime.text import MIMEText

# ---- initial credential, metadata load ----

emailauthfn = "auth.json"

try:
    with open(emailauthfn) as authf:
        emailauth = json.load(authf)
except:
    raise RuntimeError("auth json missing or malformed")

print(emailauth)

# ---- gmail api ----

def send_emails(send_addrs, subject, body):
    ''' Sends an identical email with subject, body to every email in send_addrs '''

    # modified from ChatGPT response:
    #  query: "write a python function to send an email using gmail with subject and body in Python"

    # create a server object
    server = smtplib.SMTP('smtp.gmail.com', 587)

    # start TLS (Transport Layer Security) for security
    server.starttls()

    # login to the Gmail account
    server.login(emailauth['email'], emailauth['apppwd'])

    # construct and send the emails

    for send_addr in send_addrs:
        message = MIMEText(body)
        message['Subject'] = subject
        message['To'] = send_addr
        message['From'] = emailauth['email']
        server.sendmail(emailauth['email'], send_addr, message.as_string())

    # close the server
    server.quit()


print("sending emails")
send_emails(['kaveh@pezeshki.org', 'kpez@stanford.edu', 'kpezeshki@hmc.edu'], 'test subject', 'test body')
