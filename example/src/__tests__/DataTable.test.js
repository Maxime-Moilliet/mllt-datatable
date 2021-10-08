import React from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DataTable from 'mllt-datatable'
import { employeesData, usersData } from '../data'
import { labelsEmployees, labelsUsers } from '../App'

describe('DataTable component', () => {

    afterEach(cleanup)

    test('Should render 10 data element default', () => {
        render(<DataTable data={employeesData} labels={labelsEmployees} />)
        const elements = screen.getAllByRole('tablist')
        expect(elements.length).toBe(10)
    });

    test('Should render 15 data element if props itemsPerPage = 15', () => {
        render(<DataTable data={employeesData} labels={labelsEmployees} itemsPerPage={15} startFrom={1} />)
        const elements = screen.getAllByRole('tablist')
        expect(elements.length).toBe(15)
    });

    test('Should render 5 data element if props itemsPerPage = 5', () => {
        render(<DataTable data={usersData} itemsPerPage={5} labels={labelsUsers} />)
        const elements = screen.getAllByRole('tablist')
        expect(elements.length).toBe(5)
    });

    test('Should render data sort by first labelKey value by default', () => {
        render(<DataTable data={employeesData} itemsPerPage={5} labels={labelsEmployees} />)
        const elements = screen.getAllByRole('tablist')
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Amanda")
        expect(elements[1]).toHaveTextContent("Amed")
        expect(elements[2]).toHaveTextContent("Amelia")
    });

    test('When click on header Last name dataTable, render data sort Asc (string)', () => {
        render(<DataTable data={employeesData} itemsPerPage={5} labels={labelsEmployees} />)
        const elLastName = screen.getByText(/Last name/i)
        fireEvent.click(elLastName)
        const elements = screen.getAllByRole('tablist')
        expect(elements[0]).toHaveTextContent('Calzone')    
        expect(elements[1]).toHaveTextContent('Calzone')    
        expect(elements[2]).toHaveTextContent('Calzone')    
        expect(elements[3]).toHaveTextContent('Calzone')    
    });

    test('When double click on header Last name dataTable, render data sort Desc (string)', () => {
        render(<DataTable data={employeesData} itemsPerPage={5} labels={labelsEmployees} />)
        const elLastName = screen.getByText(/Last name/i)
        fireEvent.click(elLastName)
        fireEvent.click(elLastName)
        const elements = screen.getAllByRole('tablist')
        expect(elements[0]).toHaveTextContent('Noitl')    
        expect(elements[1]).toHaveTextContent('Noitl')    
        expect(elements[2]).toHaveTextContent('Noitl')    
        expect(elements[3]).toHaveTextContent('Noitl')    
    });

    test('When click on header Start date dataTable, render data sort Asc (number)', () => {
        render(<DataTable data={employeesData} itemsPerPage={5} labels={labelsEmployees} />)
        const elStartDate = screen.getByText(/Start date/i)
        fireEvent.click(elStartDate)
        const elements = screen.getAllByRole('tablist')
        expect(elements[0]).toHaveTextContent('Marie')    
        expect(elements[1]).toHaveTextContent('Amed')    
        expect(elements[2]).toHaveTextContent('Camille')    
        expect(elements[3]).toHaveTextContent('Constance')    
    });

    test('When double click on header Start date dataTable, render data sort Desc (number)', () => {
        render(<DataTable data={employeesData} itemsPerPage={5} labels={labelsEmployees} />)
        const elStartDate = screen.getByText(/Start date/i)
        fireEvent.click(elStartDate)
        fireEvent.click(elStartDate)
        const elements = screen.getAllByRole('tablist')
        expect(elements[0]).toHaveTextContent('Anibal')    
        expect(elements[1]).toHaveTextContent('Benjamin')    
        expect(elements[2]).toHaveTextContent('Claude')    
        expect(elements[3]).toHaveTextContent('Futé')    
    });

    test('Should navigate on next or prev page, on click next or prev page button', () => {
        render(<DataTable data={employeesData} itemsPerPage={5} labels={labelsEmployees} />)
        const elements = screen.getAllByRole('tablist')
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[3]).toBeInTheDocument()
        expect(elements[4]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Amanda")
        expect(elements[1]).toHaveTextContent("Amed")
        expect(elements[2]).toHaveTextContent("Amelia")
        expect(elements[3]).toHaveTextContent("Anibal")
        expect(elements[4]).toHaveTextContent("Benjamin")
        const next = screen.getByTestId('paginate-next')
        fireEvent.click(next)
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[3]).toBeInTheDocument()
        expect(elements[4]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Bob")
        expect(elements[1]).toHaveTextContent("Camille")
        expect(elements[2]).toHaveTextContent("Carine")
        expect(elements[3]).toHaveTextContent("Carl")
        expect(elements[4]).toHaveTextContent("Casendra")
        const prev = screen.getByTestId('paginate-prev')
        fireEvent.click(prev)
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[3]).toBeInTheDocument()
        expect(elements[4]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Amanda")
        expect(elements[1]).toHaveTextContent("Amed")
        expect(elements[2]).toHaveTextContent("Amelia")
        expect(elements[3]).toHaveTextContent("Anibal")
        expect(elements[4]).toHaveTextContent("Benjamin")
    });

    test('hould navigate on page 8, on click pagination button 8', () => {
        render(<DataTable data={employeesData} itemsPerPage={10} labels={labelsEmployees} />)
        const elements = screen.getAllByRole('tablist')
        const button8 = screen.getByTestId('paginate-button-8')    
        expect(button8).toBeInTheDocument()
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[3]).toBeInTheDocument()
        expect(elements[4]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Amanda")
        expect(elements[1]).toHaveTextContent("Amed")
        expect(elements[2]).toHaveTextContent("Amelia")
        expect(elements[3]).toHaveTextContent("Anibal")
        expect(elements[4]).toHaveTextContent("Benjamin")
        fireEvent.click(button8)
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[3]).toBeInTheDocument()
        expect(elements[4]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Rudy")
        expect(elements[1]).toHaveTextContent("Shaun")
        expect(elements[2]).toHaveTextContent("Sébastien")
        expect(elements[3]).toHaveTextContent("Talon")
        expect(elements[4]).toHaveTextContent("TinTin")
    });

    test('hould navigate on page 2, on click pagination button 2', () => {
        render(<DataTable data={employeesData} itemsPerPage={10} labels={labelsEmployees} />)
        const elements = screen.getAllByRole('tablist')
        const button2 = screen.getByTestId('paginate-button-2')    
        expect(button2).toBeInTheDocument()
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[3]).toBeInTheDocument()
        expect(elements[4]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Amanda")
        expect(elements[1]).toHaveTextContent("Amed")
        expect(elements[2]).toHaveTextContent("Amelia")
        expect(elements[3]).toHaveTextContent("Anibal")
        expect(elements[4]).toHaveTextContent("Benjamin")
        fireEvent.click(button2)
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(elements[3]).toBeInTheDocument()
        expect(elements[4]).toBeInTheDocument()
        expect(elements[0]).toHaveTextContent("Caty")
        expect(elements[1]).toHaveTextContent("Cecile")
        expect(elements[2]).toHaveTextContent("Charlotte")
        expect(elements[3]).toHaveTextContent("Claude")
        expect(elements[4]).toHaveTextContent("Claudy")
    });

    test('Should render pagination buttons, default number page 1, 2 and number last page is render', () => {
        render(<DataTable data={employeesData} itemsPerPage={10} labels={labelsEmployees} />)
        const button1 = screen.getByTestId('paginate-button-1')    
        const button3 = screen.queryByTestId('paginate-button-3')
        const button4 = screen.queryByTestId('paginate-button-4')
        const button2 = screen.getByTestId('paginate-button-2') 
        const button8 = screen.getByTestId('paginate-button-8')    
        expect(button1).toBeInTheDocument()
        expect(button2).toBeInTheDocument()
        expect(button3).toBeNull()
        expect(button4).toBeNull()
        expect(button8).toBeInTheDocument()
    });

    test('Should render pagination buttons, number last and prev current page and first and last number page', () => {
        render(<DataTable data={employeesData} itemsPerPage={10} labels={labelsEmployees} />)
        const next = screen.getByTestId('paginate-next')
        fireEvent.click(next)
        fireEvent.click(next)
        fireEvent.click(next)
        const button1 = screen.getByTestId('paginate-button-1')    
        const button2 = screen.queryByText('paginate-button-2') 
        const button3 = screen.getByTestId('paginate-button-3')
        const button4 = screen.getByTestId('paginate-button-4')
        const button5 = screen.getByTestId('paginate-button-5')
        const button6 = screen.queryByText('paginate-button-6')
        const button7 = screen.queryByText('paginate-button-7')
        const button8 = screen.getByTestId('paginate-button-8')    
        expect(button1).toBeInTheDocument()
        expect(button2).toBeNull()
        expect(button3).toBeInTheDocument()
        expect(button4).toBeInTheDocument()
        expect(button5).toBeInTheDocument()
        expect(button6).toBeNull()
        expect(button7).toBeNull()
        expect(button8).toBeInTheDocument()
    });

    test('Should render data contains (Ma), if user type in search bar', () => {
        render(<DataTable data={employeesData} itemsPerPage={10} labels={labelsEmployees} />)
        const search = screen.getByTestId('search')

        const buttonSearch = screen.getByTestId('search-button')
        fireEvent.change(search, { target: { value: "Ame" } })
        fireEvent.click(buttonSearch)
        const elements = screen.getAllByRole('tablist')
        const el1 = screen.queryByText('Michelle')
        const el2 = screen.queryByText('Marc')
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(elements[2]).toBeInTheDocument()
        expect(el1).toBeNull()
        expect(el2).toBeNull()
        expect(elements[0]).toHaveTextContent("Amed")
        expect(elements[1]).toHaveTextContent("Amelia")
        expect(elements[2]).toHaveTextContent("Mariame")
    });

    test('Should render data contains (Ti), if user type in search bar', () => {
        render(<DataTable data={employeesData} itemsPerPage={10} labels={labelsEmployees} />)
        const search = screen.getByTestId('search')
        const buttonSearch = screen.getByTestId('search-button')
        fireEvent.change(search, { target: { value: "Ti" } })
        fireEvent.click(buttonSearch)
        const elements = screen.getAllByRole('tablist')
        const el1 = screen.queryByText(/Anibal/i)
        const el2 = screen.queryByText(/Benjamin/i)
        expect(elements[0]).toBeInTheDocument()
        expect(elements[1]).toBeInTheDocument()
        expect(el1).toBeNull()
        expect(el2).toBeNull()
        expect(elements[0]).toHaveTextContent("Sébastien")
        expect(elements[1]).toHaveTextContent("TinTin")
    });

    test('Should render info result', () => {
        render(<DataTable data={employeesData} itemsPerPage={10} labels={labelsEmployees}/>)
        expect(screen.getByTestId("result-info")).toBeInTheDocument()
        expect(screen.getByTestId("result-info")).toHaveTextContent("Showing 1 to 8 of 77 results")
        const search = screen.getByTestId('search')
        const buttonSearch = screen.getByTestId('search-button')
        fireEvent.change(search, { target: { value: "Ti" } })
        fireEvent.click(buttonSearch)
        expect(screen.getByTestId("result-info")).toBeInTheDocument()
        expect(screen.getByTestId("result-info")).toHaveTextContent("Showing 1 to 1 of 2 results")
        fireEvent.change(search, { target: { value: "" } })
        fireEvent.click(buttonSearch)
        const next = screen.getByTestId('paginate-next')
        fireEvent.click(next)
        expect(screen.getByTestId("result-info")).toBeInTheDocument()
        expect(screen.getByTestId("result-info")).toHaveTextContent("Showing 2 to 8 of 77 results")
        const prev = screen.getByTestId('paginate-prev')
        fireEvent.click(prev)
        expect(screen.getByTestId("result-info")).toBeInTheDocument()
        expect(screen.getByTestId("result-info")).toHaveTextContent("Showing 1 to 8 of 77 results")
    });
})

