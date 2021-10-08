import React, { useState, useEffect, useCallback } from 'react'
import useDataTable from './useDataTable'
import PropTypes from 'prop-types'
import styles from './styles.module.css'

const DataTable = ({ data, itemsPerPage, labels }) => {
    const [search, setSearch] = useState('')
    const [sortByKey, setSortByKey] = useState('firstName')
    const [order, setOrder] = useState('asc')
    const { slicedData, pagination, nextPage, prevPage, changePage, currentPage, pages, setFilteredData, setSearching, filteredData } = useDataTable({ itemsPerPage, data })

    useEffect(() => {
        sortHandler(Object.keys(slicedData[0])[0], 'asc')
        // eslint-disable-next-line
    }, [])

    /**
     * formate date
     * @param {Date} date 
     */
    const formatDate = useCallback((date) => {
        const newDate = new Date(date)
        return new Intl.DateTimeFormat('fr-FR').format(newDate)
    }, [slicedData])

    /**
     * handler submit form "Sort by"
     * @param {event} e 
     */
    const handleSearchSubmit = (e) => {
        e.preventDefault()
        setSearching(true)
        if(search.trim() !== '') {
            const copiedData = [...data];
            const filtered = copiedData.filter((v) => {
                return v[Object.keys(v)[0]].toLowerCase().includes(search.trim().toLowerCase())
            });
            const copyOfFilteredData = [...filtered]
            const sortFiltered = sortData(copyOfFilteredData, sortByKey, order)
            setFilteredData(sortFiltered)          
        } else {
            const sortFiltered = sortData(data, sortByKey, order)
            setFilteredData(sortFiltered)
        }
    }

    /**
     * handler sort data array
     * @param {string} sortBy 
     * @param {string} orderBy 
     */
    const sortHandler = (sortBy, orderBy) => {
        setSearching(true)
        if(sortByKey !== sortBy) {
          setSortByKey(sortBy)
        }
        if(order !== orderBy) {
          setOrder(orderBy)
        }
    
        const copyOfFilteredData = [...filteredData]
        const filtered = sortData(copyOfFilteredData, sortBy, orderBy)
        setFilteredData(filtered)
    }

    /**
     * Sort data array by "sortBy" and order by "orderBy"
     * @param {array} dataToSort 
     * @param {string} sortBy 
     * @param {string} orderBy 
     * @returns 
     */
    const sortData = (dataToSort, sortBy, orderBy) => {
        const filtered = dataToSort.sort((a, b) => {
            if(!isNaN(a[sortBy]) || !isNaN(b[sortBy])) {
                if(orderBy === 'asc') {
                    if(a[sortBy] < b[sortBy]) {
                        return -1
                    } else if(a[sortBy] > b[sortBy]) {
                        return 1
                    } else {
                        return 0
                    }
                } else {
                    if(b[sortBy] < a[sortBy]) {
                        return -1
                    }  else {
                        return 0
                    }
                }
            } else {
                if(orderBy === 'asc') {
                    if(a[sortBy].toLowerCase() < b[sortBy].toLowerCase()) {
                        return -1
                    } else if(a[sortBy].toLowerCase() > b[sortBy].toLowerCase()) {
                        return 1
                    } else {
                        return 0
                    }
                } else {
                    if(b[sortBy].toLowerCase() < a[sortBy].toLowerCase()) {
                        return -1
                    } else {
                        return 0
                    }
                }
            }
        })
        return filtered;
    }

    /**
     *  return true if value is a type Date else return false
     *  @param {any} value
     */
    const isDate = useCallback((value) => {
        var dateFormat;
        if (toString.call(value) === '[object Date]') {
            return true;
        }
        if (typeof value.replace === 'function') {
            value.replace(/^\s+|\s+$/gm, '');
        }
        // eslint-disable-next-line
        dateFormat = /(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/;
        return dateFormat.test(value);
    }, [slicedData])

    return (
        <div className={styles.dataTable}>
            <form className={styles.dataTable__form} onSubmit={handleSearchSubmit} >
                <input 
                    data-testid="search"
                    type="text" 
                    className={styles.dataTable__input}
                    placeholder={`Search by ${labels[0].label}...`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                <button className={styles.dataTable__button_submit} data-testid="search-button" type="submit">Search</button>
            </form>
            <table className={styles.dataTable__table}>
                <thead className={styles.dataTable__header}>
                    <tr>
                        {labels.map((col, index) => (
                            <th 
                                className={styles.dataTable__label}
                                key={index}
                                onClick={() => sortHandler(col.sortKey, sortByKey === col.sortKey ? order === 'asc' ? 'desc' : 'asc' : 'asc')} >
                            <p>{col.label}
                            {sortByKey === col.sortKey &&
                                order === 'asc'
                                    ? <span className={styles.dataTable__label_icon_up}><i className="fas fa-sort-up"></i></span>
                                    : <span className={styles.dataTable__label_icon_down}><i className="fas fa-sort-down"></i></span>
                            }</p>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {slicedData.map((el, idx) => (
                        <tr role="tablist" className={styles.dataTable__body} key={idx}>
                            {Object.values(el).map((key, idx) => {
                                if(isDate(key) !== false) { 
                                    return <td role="tab" key={idx} className={styles.dataTable__body_td}>{formatDate(key)}</td>
                                } else {
                                    return <td role="tab" key={idx} className={styles.dataTable__body_td}>{key}</td>
                                }    
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={styles.dataTable__footer}>
                <p data-testid="result-info" className={styles.dataTable__info}>
                    Showing
                    <span className={styles.dataTable__info_bold}> {currentPage} </span>
                    to
                    <span className={styles.dataTable__info_bold}> {pages} </span>
                    of
                    <span className={styles.dataTable__info_bold}> {filteredData.length} </span>
                    results 
                </p>
                <nav className={styles.dataTable__pagination}>
                    <button 
                        data-testid="paginate-prev"
                        className={styles.dataTable__pagination_previous} 
                        onClick={prevPage} 
                    >
                        Previous
                    </button>
                    <div className={styles.dataTable__pagination_links}>
                        {pagination.map(page => {
                            if(!page.ellipsis) {
                                return <button data-testid={`paginate-button-${page.id}`} 
                                            key={page.id} 
                                            className={page.current ? styles.dataTable__pagination_link_current : styles.dataTable__pagination_link } 
                                            onClick={e => changePage(page.id, e)} 
                                        >{page.id}
                                    </button>
                            } else {
                                return <button key={page.id} className={styles.dataTable__pagination_link}>&hellip;</button>
                            }
                        })}
                    </div>
                    <button 
                        data-testid="paginate-next"
                        className={styles.dataTable__pagination_previous}
                        onClick={nextPage}
                    >
                        Next
                    </button>
                </nav>
            </div>
        </div>
    )
}

DataTable.propTypes = {
    data: PropTypes.array.isRequired,
    itemsPerPage: PropTypes.number,
    labels: PropTypes.array.isRequired,
}

export default DataTable


