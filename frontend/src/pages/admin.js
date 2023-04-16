import axios from 'axios';

import React, { Component } from 'react';
import { API_BASE_URL } from '../constants';
import { Button, Input, Text, Checkbox } from '@nextui-org/react';

class Admin extends Component {
  state = {
    selectedFile: null,
    text: '',
  };

  onFileChange = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
  };
  onTextChange = (event) => {
    console.log(event.target.value);
    this.setState({ text: event.target.value });
  };

  onFileUpload = () => {
    const formData = new FormData();
    formData.append('file', this.state.selectedFile);
    formData.append('text', this.state.text);
    axios.post(`${API_BASE_URL}/upload`, formData);
  };

  fileData = () => {
    if (this.state.selectedFile) {
      return (
        <p>
          File Name: {this.state.selectedFile.name}
          <br />
          File Type: {this.state.selectedFile.type}
          <br />
          Last Modified:{' '}
          {this.state.selectedFile.lastModifiedDate.toDateString()}
        </p>
      );
    }
  };

  render() {
    return (
      <div>
        <div className="navbar navbar-dark bg-warning fixed-top">
          <div className="container py-2">
            <a href="/" className="navbar-brand">
              Fanstop Demo
            </a>
            <a href="https://github.com/csinha134/hackowasp5.0">
              <img
                src="github-logo-6531.png"
                alt="public-address"
                className="ml-2"
              />
            </a>
          </div>
        </div>
        <section className="intro">
          <div className="mask mt-2 d-flex align-middle align-items-center h-100">
            <div className="container" style={{ marginTop: '100px' }}>
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body p-0">
                      <center>
                        <div
                          style={{
                            height: '400px',
                            minWidth: '40vw',
                            paddingTop: '100px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                            alignItems: 'center',
                          }}
                        >
                          <Text h3>
                            Upload your new content to IPFS with encryption now!
                          </Text>
                          <div
                            style={{
                              display: 'flex',
                              gap: '20px',
                            }}
                          >
                            <Input
                              label="Encryption text"
                              width="100%"
                              onChange={this.onTextChange}
                            />
                          </div>
                          <Checkbox.Group
                            color="secondary"
                            defaultValue={['buenos-aires']}
                          >
                            <Checkbox>Enable Profanity</Checkbox>
                          </Checkbox.Group>
                          <div
                            style={{
                              display: 'flex',
                              maxWidth: '50%',
                              gap: '30px',
                            }}
                          >
                            <Input type="file" onChange={this.onFileChange} />
                            <Button
                              shadow
                              color="warning"
                              auto
                              onPress={this.onFileUpload}
                            >
                              Encrypt and Upload!
                            </Button>
                          </div>
                          <div>{this.fileData()}</div>
                        </div>
                      </center>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Admin;
