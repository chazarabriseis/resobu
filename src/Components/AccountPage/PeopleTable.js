import React, { Component } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
// import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

import Spinner from '../../Components/Common/Spinner';
import './PeopleTable.css';


export default class PeopleTable extends Component {
    constructor(props) {
        super(props) 

        this.columns = [
            {
              key: 'personId',
              dataField: 'personId',
              text: 'Person ID',
              headerFormatter: this.headerFormatter,
              hidden: true
            },
            {
              key: 'personEmail',
              dataField: 'personEmail',
              text: 'Email',
              headerFormatter: this.headerFormatter,
              filter: textFilter({
                placeholder: 'Search'
              }),
              sort: true
            },
            {
              key: 'teamColleagues',
              dataField: 'teamColleagues',
              text: 'Team Colleagues',
              headerFormatter: this.headerFormatter
            },
            {
              key: 'projectColleagues',
              dataField: 'projectColleagues',
              text: 'Project Colleagues',
              headerFormatter: this.headerFormatter,
            },
            {
              key: 'connectedColleagues',
              dataField: 'connectedColleagues',
              text: 'Connected Colleagues',
              headerFormatter: this.headerFormatter
            }
        ]
    }

    headerFormatter = (column, colIndex, { sortElement, filterElement }) => {
        return (
            <div style={ { 'display': 'table-caption' } }>
                <h5 style= {{ 
                    'color' : '#0E253A',
                    'fontSize' : '17px',
                    'paddingBottom': '18px',
                    'fontWeight' : '400',
                    'width' : '215px',
                    'overflowWrap': 'break-word',
                    'textAlign': 'left'
                    }}>{ column.text }{ sortElement }<br/>
                    { filterElement }</h5>
            </div>
        )
    }

    handleSingleSelect = (row) => {
      const personId = [row.personId]
      const personEmail = [row.personEmail]
      this.props.onUpdateSelectedEmailId(personId, personEmail)
    }

    handleNextPage = ({
      page,
      onPageChange
    }) => () => {onPageChange(page + 1);}
    
    handlePrevPage = ({ 
        page, 
        onPageChange
    }) => () => {onPageChange(page - 1);}

    render() {
        const indexSorted = [{dataField: 'personEmail', order:'asc'}];

        /*
        const customTotal = (from, to, size) => (
          <span className="react-bootstrap-table-pagination-total">
          Showing { from } to { to } of { size } search results
          </span>
        )
        
        const optionsPag = {
            page: this.props.currentPage,
            firstPageText: 'First',
            prePageText: 'Back',
            nextPageText: 'Next',
            lastPageText: 'Last',
            nextPageTitle: 'First page',
            prePageTitle: 'Pre page',
            firstPageTitle: 'Next page',
            lastPageTitle: 'Last page',
            showTotal: true,
            onPageChange: this.props.onPageChange,
            // paginationTotalRenderer: customTotal,
            sizePerPageList: [{
                text: '10', value: 10
            }, {
                text: '25', value: 25
            }, {
                text: '50', value: 50
            }
            ]
        }  
        */

        const selectRowSingle = {
          mode: 'radio',
          clickToSelect: true,
          hideSelectColumn: true,
          selected: this.props.selectedEmail,
          style: { backgroundColor: 'purple', color: 'white' },
          onSelect: this.handleSingleSelect
      }

        let peopleTable = (
          <ToolkitProvider
            classes='peopleTable'
            keyField="personId"
            data={ this.props.peopleList }
            columns={ this.columns }
            columnToggle
          >
            {props => (
                <div>
                    <BootstrapTable
                        filter={ filterFactory() }
                        // pagination={ paginationFactory(optionsPag) }
                        selectRow={selectRowSingle}
                        defaultSorted={indexSorted}
                        noDataIndication='No data matches your search.'
                        { ...props.baseProps }
                        bordered={ false } 
                    />
                </div>
                )
            }
          </ToolkitProvider>)

        return (
            <div className='peopleTable'>
                {this.props.isLoadingPeopleList ? (
                    <Spinner />
                    ) : this.props.isLoadingPeopleList.length === 0 ? (
                    <div>
                        <p className='nodata-indication' style={{color: '#0E253A', width: '60%', margin: '0 auto', paddingTop: '10px'}}>
                            Go ahead and add people who should join the social butterfly chats
                        </p>
                    </div>
                    ) : (
                    <div className='row-table' style={{backgroundColor: '#fff', display: 'flex'}}>
                        <div style={{width: '100%'}}>
                            <div className='tablePeople'>
                                {peopleTable}
                            </div>
                        </div>
                    </div>
                    )
                }
            </div>
        )
    }
}

