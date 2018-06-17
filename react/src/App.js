import React, { Component } from 'react';

import './App.css';
import List from './List.js';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      cTypes: []
    };
  }

  componentDidMount = () => {
    fetch(process.env.REACT_APP_API_URL + '/getComponentTypes').then(resp => {
      console.log(resp);
      resp.json().then(data => {
        this.setState((prevState) => {
          prevState.cTypes = data;
          return prevState;
        });
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getTags = () => {
    let typeArr = [
      ...this.state.cTypes
    ];

    return typeArr.map((typeInfo, index) =>
      <Tag key={index} type={typeInfo} />
    );
  }

  render() {
    return (
			<div className="App">
				<div className="header">
					Electronics
				</div>

				<div className="content">
          <div className="tags">
            {this.getTags()}
          </div>

					<List />
				</div>

				<div className="footer">
					ayy
				</div>
			</div>
    );
  }
}

class Tag extends Component {
  render() {
    return <div className="tag">
        {this.props.type.Name}
      </div>;
  }
}

export default App;
// vim: ts=2 sts=2 expandtab
