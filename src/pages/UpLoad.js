import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { Link } from "react-router-dom";

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUploading: false,
      images: [],
      uploadCompleted: false,
      errorMessage: ''
    };
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleOnDrop(files) {
    this.setState({ isUploading: true, uploadCompleted: false, errorMessage: '' });

    files.forEach(file => {
      this.getPresignedUrlAndUpload(file);
    });
  }

  getPresignedUrlAndUpload(file) {
    axios.get('/api/get-presigned-url', {
      params: {
        filename: file.name,
        filetype: file.type
      }
    }).then(response => {
      if (!response.data.url) {
        throw new Error('Failed to get the presigned URL');
      }
      const options = {
        headers: {
          'Content-Type': file.type
        }
      };
      return axios.put(response.data.url, file, options);
    }).then(() => {
      this.setState(prevState => ({
        images: [...prevState.images, {
          name: file.name,    
          url: `https://amplify-mobirtatest02-dev-1daaf-deployment.s3-website-us-east-1.amazonaws.com/${file.name}`
        }],
        uploadCompleted: true,
        isUploading: false
      }));
    }).catch(error => {
      console.error('Upload failed:', error);
      this.setState({ isUploading: false, errorMessage: 'Upload failed. Please try again.' });
    });
  }

  render() {
    const { isUploading, uploadCompleted, images, errorMessage } = this.state;
    return (
      <div style={{ width: 960, margin: '20px auto' }}>
        <h1>ファイルアップロード</h1>
        <Dropzone onDrop={this.handleOnDrop} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} style={{ border: '1px dashed #ccc', padding: '20px', textAlign: 'center' }}>
              <input {...getInputProps()} />
              <p>画像をドラックまたはクリック</p>
            </div>
          )}
        </Dropzone>
        {isUploading && <div>ファイルをアップロードしています…</div>}
        {uploadCompleted && <div>アップロードが完了しました！</div>}
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {images.length > 0 && (
          <div style={{ margin: 30 }}>
            {images.map(({ name, url }) => (
              <img key={name} src={url} alt={name} style={{ width: 200, height: 200 }} />
            ))}
          </div>
        )}
        <div><p><Link to="/">戻る</Link></p></div>
      </div>
    );
  }
}

export default Uploader;
