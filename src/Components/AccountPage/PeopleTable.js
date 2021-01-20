import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';


const HeadRow = withStyles({
  root: {
    boxShadow: '0 3px 5px 2px rgba(128,0,128, .3)',
  }
})(TableHead);

const HeadCell = withStyles({
  root: {
    fontWeight: 'bold',
  }
})(TableCell);

export default class PeopleTab extends Component {
  constructor(props) {
    super(props);

    this.rows = [
      {'email' : 'employee_1@resobu.com', 'attribute1': 'Marketing', 'attribute2': 'Munich', 'attribute3': ['skill1',' skill3']},
      {'email' : 'employee_2@resobu.com', 'attribute1': 'RnD', 'attribute2': 'Munich', 'attribute3': ['skill1',' skill3','skill2']}
    ];

    this.columns = [
      { id: 'email', label: 'Email', minWidth: 170 },
      { id: 'attribute1', label: 'Department', minWidth: 100 },
      { id: 'attribute2', label: 'Location', minWidth: 170},
      { id: 'attribute3', label: 'Skillset', minWidth: 170}
    ]
  }

  render() {  
    return (
      <div>
      <TableContainer>
        <Table className='table-tab' stickyHeader aria-label="sticky table">
          <HeadRow className='table-header'>
            <TableRow>
            {this.columns.map((column) => (
                <HeadCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </HeadCell>
              ))}
            </TableRow>
          </HeadRow>
          <TableBody>
            {this.rows.map((row) => (
              <TableRow key={row.email}>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell>{row.department}</TableCell>
                <TableCell>{row.location}</TableCell>
                <TableCell>{row.skillset}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    )
  }
}