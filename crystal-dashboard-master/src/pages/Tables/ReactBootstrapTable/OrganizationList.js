import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import Modal from '../../Components/PopUp/AddOrganization';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import FUNCTION from '../../../function';
import axios from 'axios';


class OrganizationList extends Component {
  
  state = {
    data: {}
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    const data = await axios.get("http://localhost:3001/v1/organization/organization-list",{
      'headers': {'authorization': token }
    });
      if(data)
      {
        console.log(data);
        this.setState({ data: data.data.data });
      }
  }
  indexFormat(cell, row, enumObject, index){
    return <div>{index+1}</div>
}
  render() {
    const { data } = this.state;
    const options = {
      sizePerPage: 20,
      prePage: 'Previous',
      nextPage: 'Next',
      firstPage: 'First',
      lastPage: 'Last',
      hideSizePerPage: true
    /*
      onRowClick: (row) => {
        const path = `./profile/${row._id}`;
        this.props.history.push(path);
      }
    */
    };

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
              <h4>Organization List</h4>
              </div>
              <div className="content">
              <div className="col-xs-6 col-sm-6 col-md-6 col-lg-8">
                <Modal/>
                </div>
                {data.length>0 ? (
                <BootstrapTable
                  data={data}
                  bordered={true}
                  striped
                  search
                  hover
                  pagination
                  options={options}>
                    <TableHeaderColumn
                    dataField='any'
                    dataFormat={this.indexFormat}
                    editable= { {type: 'textarea'} }
                    width="10%"
                    isKey
                    dataSort>
                    Index
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='organization_code'
                    editable= { {type: 'textarea'} }
                    width="20%"
                    >
                    Code
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='organization_name'
                    width="15%"
                    editable= { {type: 'textarea'} }
                    dataSort>
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='phone'
                    editable= { {type: 'textarea'} }
                    width="15%"
                    >
                    Phone
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='email'
                    editable= { {type: 'email'} }
                    width="20%">
                    Email
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='address'
                    editable= { {type: 'textarea'} }
                    width="15%"
                    dataSort>
                    Address
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='limit_card'
                    width="15%"
                    editable= { {type: 'textarea'} }
                    dataSort>
                    Limit Card
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='effective_card'
                    width="15%"
                    editable= { {type: 'textarea'} }
                    dataSort>
                    Effective Card
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='is_active'
                    dataFormat={FUNCTION.activeFormat}
                    editable= { {type: 'textarea'} }
                    dataSort
                    width="10%">
                    Active
                  </TableHeaderColumn>
                </BootstrapTable>
                ) : (
                  <div> Loading......... </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OrganizationList