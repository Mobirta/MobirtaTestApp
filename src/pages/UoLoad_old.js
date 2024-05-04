import { Link } from "react-router-dom";
import React, {Component} from 'react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
  
  class Uploader extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isUploading: false,
        images: []
      };
      this.handleOnDrop = this.handleOnDrop.bind(this);
    }
  
    handleOnDrop(files) {
      this.setState({isUploading: true});
  
      Promise.all(files.map(file => this.uploadImage(file)))
        .then(images => {
          this.setState({
            isUploading: false,
            images: this.state.images.concat(images)
          });
        }).catch(e => console.log(e));
    }
  
    uploadImage(file) {
      return axios.get('/upload', {
        params: {
          filename: file.name,
          filetype: file.type
        }
      }).then(res => {
        const options = {
          headers: {
            'Content-Type': file.type
          }
        };
        return axios.put(res.data.url, file, options);
      }).then(res => {
        const {name} = res.config.data;
        return {
          name,
          isUploading: true,
          url: `http://mobirtatest01.s3-website-us-east-1.amazonaws.com/${file.name}`
        };
      });
    }
  
    render() {
      return (
        <div style={{width: 960, margin: '20px auto'}}>
          <h1>ファイルアップロード</h1>

          <Dropzone onDrop={this.handleOnDrop} accept="image/*">
            {({getRootProps, getInputProps}) => (
            <div {...getRootProps()} style={{border: '1px dashed #ccc', padding: '20px', textAlign: 'center'}}>
                <input {...getInputProps()} />
                <p>画像をドラックまたはクリック</p>
                </div>
            )}
            </Dropzone>

          <div><p><Link to="/">戻る</Link></p></div>

            {this.state.isUploading ? (
            <div>ファイルをアップロードしています…</div>
        ) : this.state.uploadCompleted ? (
        <div>アップロードが完了しました！</div>
        ) : null}

          {this.state.images.length > 0 &&
            <div style={{margin: 30}}>
              {this.state.images.map(({name, url}) =>
                <img key={name} src={url} style={{width: 200, height: 200}}/>)}
            </div>}
        </div>
      );
    }
  }
  
  export default Uploader;
