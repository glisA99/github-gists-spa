import React from 'react'

interface IPaginationButton {
    content: string,
    disabled: boolean,
    onClick: () => void
}

export const PaginationButton:React.FC<IPaginationButton> = ({ content, onClick, disabled }) => {
  
    return (
        <div style={{width: "auto", display: "inline-block"}}>
            <button 
                className={`pagination-button ${disabled === true && "disabled-button"}`}
                onClick={disabled === false ? onClick : undefined}
            >
                {content}
            </button>
        </div>
    )

}

export default PaginationButton;
