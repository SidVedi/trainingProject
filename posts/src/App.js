import React, { Component } from 'react';
import './App.css';
import axios from './axios_posts';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';


class App extends Component {
  state = {
    rows: null
  }
  fullPosts = null;
  componentDidMount() {
    //fetch rows here
    axios.get('/posts')
         .then(response=>{
           //curate data here
           const data = response.data.filter(row => {
             return row.title;
           });
           this.fullPosts = data;
           this.setState({
             ...this.state,
             rows: [...data]
           })
         });
  }

  handleFilter = (event) => {
    const value = event.target.value;
    this.setState((prevState) => {
      const filteredRows = this.fullPosts.filter(row => {
        return row.title.includes(value);
      });
      return {
        ...prevState,
        rows: filteredRows
      }
    })
  }
  render() {
    let table = <div>No data fetched...</div>
    if(this.state.rows) {
      table = (
        <Table className="Table">
          <TableHead className="TableHead">
            <TableRow>
              <TableCell className="TableCell">No</TableCell>
              <TableCell className="TableCell">User Id</TableCell>
              <TableCell className="TableCell">Title</TableCell>
              <TableCell className="TableCell">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.rows.map(row=>{
              return (
                <TableRow className="TableRow" key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.userId}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.body}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )
    }
    return (
      <div className="App">
        <h3 className="Heading">List of Posts</h3>
        <label htmlFor="titleFilter">Filter data as per title: </label>
        <input type="text" id="titleFilter" onChange={this.handleFilter}></input>
        {table}
      </div>
    );
  }
}

export default App;
