import React, { Component } from 'react';

class ListItem extends Component {

  setCompAmount = (ID, amount) => {
    fetch(process.env.REACT_APP_API_URL + "/setComponentAmount?ID="
              + ID + "&amount=" + amount).then((resp) => {
      this.props.compUpdated();
    });
  }

  render() {
    return <div className='listEntry'>
			<div>{this.props.info.Name}</div>
			<div>{this.props.info.Type}</div>
			<div>
        <span onClick={() => {this.setCompAmount(
          this.props.info.ID, this.props.info.Amount - 1
        )}}> - </span>

        {this.props.info.Amount}

        <span onClick={() => {this.setCompAmount(
          this.props.info.ID, this.props.info.Amount + 1
        )}}> + </span>
      </div>
    </div>;
  }
}

class List extends Component {

  constructor(props) {
    super(props);

    this.state = {'items': []};
  }

  componentDidMount = () => {
    this.loadComps();
  }

  loadComps = () => {
    fetch(process.env.REACT_APP_API_URL + '/getComponents').then(resp => {

      resp.json().then(data => {
        this.setState((prevState) => {
          prevState.items = data;

          return prevState;
        });
      });
    }).catch(err => {
      console.log(err);
    });
  }

  getItems = () => {
    let itemsArr = [
      ...this.state.items
    ];

    return itemsArr.map((item) =>
      <ListItem key={item.ID} info={item} compUpdated={this.loadComps} />
    );
  }

  render() {
    return (
			<div>
        {this.getItems()}
			</div>
    );
  }
}

export default List;
// vim: ts=2 sts=2 expandtab
