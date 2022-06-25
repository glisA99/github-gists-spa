import React from 'react'
import PaginationButton from './PaginationButton'

interface IPaginationProps {
    disabledPrevious: boolean,
    onPreviousClick: () => void,
    disabledNext: boolean,
    onNextClick: () => void,
}

export const Pagination:React.FC<IPaginationProps> = ({ onNextClick, onPreviousClick, disabledNext, disabledPrevious }) => {

  return (
    <div>
        <PaginationButton 
            content='<' 
            onClick={onPreviousClick} 
            disabled={disabledPrevious} 
        />
        <PaginationButton 
            content='>' 
            onClick={onNextClick} 
            disabled={disabledNext} 
        />
    </div>
  )

}
