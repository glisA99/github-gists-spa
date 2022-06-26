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
            {arr.map(value => <PageNumber value={value} onClick={onPageClick} current={value == currentPage} />)}
        </>
    }

    const pagination = generatePagination(currentPage,numberOfPages);

    return (
        <React.Fragment>
            {pagination.start && <>
                <PageNumber 
                    value={1} 
                    onClick={onPageClick} 
                    current={1 == currentPage} 
                />
                <span className='page-nav-span'>...</span>
            </>}
            {pagination.center.map(num => <PageNumber value={num} key={num} onClick={onPageClick} current={num == currentPage}/>)}
            {pagination.end && <>
                <span className='page-nav-span'>...</span>
                <PageNumber 
                    value={numberOfPages} 
                    onClick={onPageClick} 
                    current={numberOfPages == currentPage}
                />
            </>}
        </React.Fragment>
    )
}

export default PageNumbersNavigation;

interface IPageNumberProps {
    value: number,
    onClick: (pageNumber: number) => void,
    current: boolean
}

const PageNumber:React.FC<IPageNumberProps> = ({ value, onClick, current }) => {

    return (
        <span
            className={`page-nav-span ${current && "page-active"} clickable`}
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