import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { DateRangePicker } from 'react-dates';
import axios from 'axios';
import { set, get, isEmpty } from 'lodash';
import moment from 'moment';


class CheckInCheckOutHistory extends Component {
  state = {
    data: []
  };
  componentDidMount = async () => {
    const token = localStorage.getItem("token");
    const listCheckInCheckOut = await axios.get('http://localhost:3001/v1/organization/card/histories',{
      'headers': {'authorization': token }
    });
    if (listCheckInCheckOut)
      {
        console.log(listCheckInCheckOut.data.data);
        this.setState({data: listCheckInCheckOut.data.data});
        console.log(this.state.data.length);
      }
  }
  completeFormat(cell){
    if(cell)
    return 'Completed';
    else return 'Imcomplete';
  }
  dateFormat(cell, row){
    const date = new Date(cell);
      return date.toLocaleDateString('en-US')
  }
  indexFormat(cell, row, enumObject, index){
      return <div>{index+1}</div>
  }
  imageFormatter(cell, row){
    return "<img src='"+cell+"'/>" ;
  }
  priceFormat(cell){
    return cell.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
  render() {
    const options = {
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last'
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="content">
                <BootstrapTable
                  data={this.state.data}
                  bordered={false}
                  striped
                  search
                  pagination={true}
                  options={options}
                  >
                       <TableHeaderColumn
                    dataFormat={this.indexFormat}
                    dataField='any'
                    width="5%"
                    isKey
                   >
                    Index
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='card_id'
                    width="14%"
                   >
                    Card ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='checked_in_by'
                    dataSort
                    width="14%"
                   >
                    Checked In By
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='checked_out_by'
                    width="14%"
                    dataSort>
                    Checked Out By
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='avatar'
                    dataFormat={this.imageFormatter}
                    width="8%"
                   >
                   Check In Photo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='avatar'
                    dataFormat={this.imageFormatter}
                    width="8%">
                    Check Out Photo
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='check_in_time'
                    dataFormat= {this.dateFormat}                   
                    dataSort
                    width="8%">
                     Check In Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='check_out_time'
                    dataFormat= {this.dateFormat}                   
                    dataSort
                    width="9%">
                     Check Out Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='price'
                    dataFormat= {this.priceFormat}                   
                    dataSort
                    width="8%">
                    Price
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='is_complete'
                    dataSort
                    dataFormat={this.completeFormat}
                    width="8%">
                    Status
                  </TableHeaderColumn>
                </BootstrapTable>
                
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
export default CheckInCheckOutHistory;