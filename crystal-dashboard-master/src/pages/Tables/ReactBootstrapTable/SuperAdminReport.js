import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { DateRangePicker } from 'react-dates';
import Function from '../../../function';
import axios from 'axios';
import moment from 'moment';

class SuperAdminReportTable extends Component {
  state = {
    data: [],
    startDate: moment().startOf('day'),
    endDate: moment().add(7,'days'),
    dateRangeFocusedInput: null,
    update: true    
  };
  async componentDidMount() {
        const token = localStorage.getItem("token");
        const startDate = this.state.startDate.toDate();
        const endDate =this.state.endDate ? this.state.endDate.toDate() : startDate;
        if(startDate && endDate){
        const reportList = await axios.get('http://localhost:3001/v1/user/admin-report',{
          'headers': { authorization : token},
          params: {
            startDate: startDate,
            endDate: endDate
          }
        });
        if(reportList){
          await this.setState({data : reportList.data.data});
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
    const reportList = await axios.get('http://localhost:3001/v1/user/admin-report',{
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
  organizationNameFormat(cell){
      if(cell)
      return cell.organization_name;
  }
  nameFormat(cell){
    if(cell)
    return cell.created_by.name;
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
              onDatesChange={this.changeDate}
                 />
              </div>
              </div>
          </div>
        </div>
              </div>
              <div className="content">
                <div>
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
                    dataField='createdAt'
                    dataFormat = {Function.timeFormat}
                    width="15%"
                    dataSort>
                    Date
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='name'
                    width="15%"
                    >
                     Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='avatar'
                    dataFormat={Function.imageFormat}
                    width="20%"
                    >
                     Avatar
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='email'
                    width="20%"
                    >
                    Email
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='phone'
                    width="10%"
                   >
                    Phone
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='organization_id'
                    dataFormat={this.organizationNameFormat}
                    width="20%"
                    >
                    Organization Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='organization_id'
                    dataFormat={this.nameFormat}
                    width="15%"
                   >
                     Create By
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
export default SuperAdminReportTable