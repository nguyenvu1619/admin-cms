import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { DateRangePicker } from 'react-dates';
import Function from '../../../function';
import axios from 'axios';
import moment from 'moment';

class ReportTable extends Component {
  state = {
    data: {},
    startDate: moment(),
    endDate: moment(),
    dateRangeFocusedInput: null,
    update: true
  };
  componentDidMount = async () => {
        const token = localStorage.getItem("token");
        const startDate = this.state.startDate.toDate();
        const endDate =this.state.endDate ? this.state.endDate.toDate() : startDate;
        if(startDate && endDate){
        const reportList = await axios.get('http://localhost:3001/v1/organization/report',{
          'headers': { authorization : token},
          params: {
            startDate: startDate,
            endDate: endDate
          }
        });
        if(reportList){
          this.setState({data : reportList.data.data});
          console.log(this.state.data);
        }
      }
  }
  callApi =async (startDate, endDate) => {
    // state
    const token = localStorage.getItem("token");
    const startDateRes = startDate.toDate();
    console.log(endDate);
    const endDateRes = endDate? endDate.toDate(): startDateRes;
    if(startDateRes && endDateRes){
    const reportList = await axios.get('http://localhost:3001/v1/user/report',{
      'headers': { authorization : token},
      params: {
        startDate: startDateRes,
        endDate: endDateRes
      }
    });
    if(reportList){
      await this.setState({data : reportList.data.data});
    }
  }
}
  
  indexFormat(cell, row, enumObject, index){
      return <div>{index+1}</div>
  }
  changeDate = ({ startDate, endDate }) =>{
    this.setState({startDate, endDate});
    this.callApi(startDate, endDate);
  }
  render() {
    const options = {
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      onRowClick: (row) => {
        const path = `./report/${row._id}`;
        this.props.history.push(path);
      }
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
              <div className="col-md-12">
          <h4 className="title">DateRange Picker</h4>
          <div className="row">
          <div className="col-md-3">
          <div className="form-group">
            <DateRangePicker
              startDate={this.state.startDate}
              enableOutsideDays = {true}
              endDate={this.state.endDate}
              isOutsideRange= {() => false}
              focusedInput={this.state.dateRangeFocusedInput}
              onFocusChange={focusedInput =>
                 this.setState({dateRangeFocusedInput: focusedInput})}
              onDatesChange={this.changeDate} />
              </div>
              </div>
              <div className="col-md-3">
                  Total Row : {Object.keys(this.state.data).length> 0 ?
                     this.state.data.detailArray.length : 0}
                </div>
                <div style={{'float':'left'}} className="col-md-4">
                  Total Price : {Object.keys(this.state.data).length> 0 ?
                    Function.priceFormat(this.state.data.totalPrice) : 0}
                  </div>
          </div>
        </div>
              </div>
              <div className="content">
                <div>
                <BootstrapTable
                  data={this.state.data.detailArray}
                  bordered={false}
                  striped
                  search
                  pagination={true}
                  options={options}
                  >
                       <TableHeaderColumn
                    dataFormat={this.indexFormat}
                    dataField='any'
                    width="10%"
                    isKey
                   >
                    Index
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='check_in_time'
                    dataFormat = {Function.dateFormat}
                    width="10%"
                    dataSort>
                    Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='card_id'
                    width="20%"
                    >
                    Card ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='checked_in_by'
                    width="20%"
                   >
                    Check In By 
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='checked_out_by'
                    width="20%"
                   >
                     Check Out By 
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='check_in_time'
                    dataSort
                    dataFormat= {Function.timeFormat}                    
                    width="15%">
                    Check In Time
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='check_out_time'
                    dataFormat= {Function.timeFormat}                   
                    dataSort
                    width="15%">
                     Check Out Time
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='price'
                    dataFormat={Function.priceFormat}
                    dataSort
                    width="10%">
                    Price
                  </TableHeaderColumn>
    
                </BootstrapTable>
            </div>
            </div>
           
          </div>
        </div>
      </div>
      </div>

    );
  }
}
export default ReportTable