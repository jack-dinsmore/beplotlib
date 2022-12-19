from flask import Flask, request
import os

app = Flask(__name__)

UPLOAD_FOLDER = '/path/to/upload/folder'

@app.route('/upload', methods=['POST'])
def upload_file():
  if request.method == 'POST':
    # check if the post request has the file part
    if 'image' not in request.files:
      return 'No file part'
    file = request.files['image']
    # if user does not select file, browser also
    # submit a empty part without filename
    if file.filename == '':
      return 'No selected file'
    if file:
      filename = file.filename
      file.save(os.path.join(UPLOAD_FOLDER, filename))
      return 'File uploaded successfully'

if __name__ == '__main__':
  app.run()

