import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(attribute, options, constraint) {
  return { attribute, options, constraint };
}

const rows = [
  createData('Department', 'Marketing, Sales, Production, RnD', 'everyone except same option'),
  createData('Location', 'Munich, Berlin, Melbourne', 'everyone except same option'),
  createData('Skill Set', 'skill1, skill2, skill3, skill4',  'everyone')
];

export default function BasicTable() {
  const classes = useStyles();

  return (
    <TableContainer>
      <Table className={classes.table} stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell>Attribute</TableCell>
            <TableCell>Options</TableCell>
            <TableCell>Constraint for Chats</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.attribute}>
              <TableCell component="th" scope="row">
                {row.attribute}
              </TableCell>
              <TableCell>{row.options}</TableCell>
              <TableCell>{row.constraint}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}