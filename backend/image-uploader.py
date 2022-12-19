from flask import Flask, request
import os

# fix up chatgpt weirdness here and use dynamic route targets

# each potential upload is assigned an ID, which is stored in some large file

# dynamically generate upload target in form uploader with some ID. if this ID has not yet been used, allow the upload. Otherwise, do not allow the upload.

app = Flask(__name__)

UPLOAD_FOLDER = '/path/to/upload/folder'

@app.route('/upload/<int:upload_id>', methods=['POST'])
def upload_file(Number):

  # check here if upload_id is a permissible ID

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


      # here, run through imagemagick (all files), rescale to smaller size (if >100kB)

      filename = file.filename
      file.save(os.path.join(UPLOAD_FOLDER, filename))
      return 'File uploaded successfully'

if __name__ == '__main__':
  app.run()

