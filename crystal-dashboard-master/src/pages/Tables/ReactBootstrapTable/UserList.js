import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import Switch from 'components/Switch';
import FUNCTION from '../../../function';
import AddUser from '../../Components/PopUp/AddUser';
import axios from 'axios';


class UserList extends Component {
  state = {
    data: {}
  };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    const data = await axios.get("http://localhost:3001/v1/user/list-user",{
      'headers': {'authorization': token }
    });
      if(data)
      {
        console.log(data);
        this.setState({ data: data.data.data });
      }
  }

  organizationNameFormat(cell){
    if(cell)
    return cell.organization_name;
    else return 
  }
  
  roleFormatter(cell, row){
    console.log(cell)
    if(cell)
    return <div>Premium User </div>
    else
    return <div>Secondary User</div>
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
      hideSizePerPage: true,
      onRowClick: (row) => {
        const path = `./profile/${row._id}`;
        this.props.history.push(path);
      }
    };
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="header">
              <h4>User List</h4>
              </div>
              <div className="content">
                <AddUser/>
                {data.length>0 ? (
                <BootstrapTable
                  data={data}
                  bordered={false}
                  striped
                  search
                  pagination={true}
                  options={options}>
                    <TableHeaderColumn
                    dataField='any'
                    dataFormat={this.indexFormat}
                    width="10%"
                    dataSort>
                    Index
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='_id'
                    isKey
                    width="20%"
                    dataSort>
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='avatar'
                    width="20%"
                    dataFormat={FUNCTION.imageFormat}>
                    Avatar
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='name'
                    width="15%"
                    
                    dataSort>
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='phone'
                    width="15%"
                    >
                    Phone
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='email'
                    
                    width="20%">
                    Email
                  </TableHeaderColumn>
                  {localStorage.getItem('admin')?(
                    <TableHeaderColumn
                    dataField='organization_id'
                    dataSort
                    dataFormat={this.organizationNameFormat}
                    width="10%">
                    Organization Name
                  </TableHeaderColumn>
                  ) :(
                  <TableHeaderColumn
                    dataField='is_organization_admin'
                    dataFormat={this.roleFormatter}
                    dataSort
                    width="10%">
                    Role
                  </TableHeaderColumn>
                  )}
                  <TableHeaderColumn
                    dataField='is_active'
                    dataFormat={FUNCTION.activeFormat}
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
export default UserList