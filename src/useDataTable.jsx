import { useState, useEffect } from "react";

const useDataTable = (initialState) => {
    const { itemsPerPage, data } = initialState
    const [filteredData, setFilteredData] = useState(data)
    const [searching, setSearching] = useState(false)
    const perPage = itemsPerPage ? itemsPerPage : 10
    const [pages, setPages] = useState(Math.ceil(data.length / perPage))
    const pagination = []
    const [currentPage, setCurrentPage] = useState(1)
    const [slicedData, setSlicedData] = useState([...data].slice((currentPage - 1) * perPage, currentPage * perPage))

    useEffect(() => {
        setSlicedData([...filteredData].slice((currentPage - 1) * perPage, currentPage * perPage))
        if(searching) {
            setCurrentPage(1)
            setPages(Math.ceil(filteredData.length / perPage))
            setSearching(false)
        }
        // eslint-disable-next-line
      }, [filteredData, currentPage])

    let ellipsisLeft = false
    let ellipsisRight = false

    for(let i = 1; i <= pages; i++) {
        if(i === currentPage) {
            pagination.push({id: i, current: true, ellipsis: false})
        } else {
            if(i < 2 || i > pages - 1 || i === currentPage - 1 || i === currentPage + 1) {
                pagination.push({id: i, current: false, ellipsis: false})
            } else if(i > 1 && i < currentPage && !ellipsisLeft) {
                pagination.push({id: i, current: false, ellipsis: true})
                ellipsisLeft = true
            } else if(i < pages && i > currentPage && !ellipsisRight) {
                pagination.push({id: i, current: false, ellipsis: true})
                ellipsisRight = true
            }
        }
    }

    /**
     * @param {number} page 
     * @param {event} e 
     */
    const changePage = (page, e) => {
        e.preventDefault()
        if(page !== currentPage) {
            setCurrentPage(page)
            setSlicedData([...filteredData].slice((page - 1) * perPage, page * perPage))
        }
    }

    /**
     * @param {event} e 
     */
    const goToPrevPage = (e) => {
        e.preventDefault()
        setCurrentPage(preVal => preVal - 1 === 0 ? preVal : preVal - 1)
        if(currentPage !== 1) {
            setSlicedData([...filteredData].slice((currentPage - 2) * perPage, (currentPage - 1) * perPage))
        }
    }

    /**
     * @param {event} e 
     */
    const goToNextPage = (e) => {
        e.preventDefault()
        setCurrentPage(preVal => preVal === pages ? preVal : preVal + 1)
        if(currentPage !== pages) {
            setSlicedData([...filteredData].slice(currentPage * perPage, (currentPage + 1) * perPage))
        }
    }

    return {
        slicedData,
        pagination,
        prevPage: goToPrevPage,
        nextPage: goToNextPage,
        changePage,
        currentPage,
        pages,
        setFilteredData,
        setSearching,
        filteredData
    }

}

export default useDataTable