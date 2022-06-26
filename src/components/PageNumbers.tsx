import React from 'react'

interface IPageNumbersNavigationProps {
    currentPage: number,
    numberOfPages: number,
    onPageClick: (pageNumber: number) => void 
}

export const PageNumbersNavigation:React.FC<IPageNumbersNavigationProps> = ({ currentPage, numberOfPages, onPageClick }) => {
  
    if (numberOfPages <= 5) {
        const arr = Array.from(Array(5), (_, index) => index + 1);
        return <>
            {arr.map(value => <PageNumber value={value} onClick={() => null} current={value == currentPage} />)}
        </>
    }

    const pagination = generatePagination(currentPage,numberOfPages);

    return (
        <React.Fragment>
            {pagination.start && <><PageNumber value={1} onClick={onPageClick} current={1 == currentPage} />...</>}
            {pagination.center.map(num => <PageNumber value={num} onClick={onPageClick} current={num == currentPage}/>)}
            {pagination.end && <><PageNumber value={numberOfPages} onClick={onPageClick} current={numberOfPages == currentPage}/></>}
        </React.Fragment>
    )
}

export default PageNumbersNavigation;

interface IPageNumberProps {
    value: number,
    onClick: (pageNumber: number) => void,
    current: boolean
}

const PageNumber:React.FC<IPageNumberProps> = ({ value, onClick }) => {

    return (
        <span
            className='page-nav-span'
            onClick={() => onClick(value)}
        >
            {value}
        </span>
    )

}

const generatePagination = (currentPage: number,numberOfPages: number) => {
    const center = [currentPage];
    if ((currentPage - 1) >= 1) center.unshift(currentPage - 1);
    if ((currentPage + 1) <= numberOfPages) center.push(currentPage + 1);

    const start = (currentPage - 1) > 1;
    const end = (currentPage + 1) < numberOfPages;

    return { center, start, end }
}