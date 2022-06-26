import React from "react";
import PageNumbersNavigation from "./PageNumbers";
import PaginationButton from "./PaginationButton";

interface IPaginationProps {
  disabledPrevious: boolean,
  disabledNext: boolean,
  currentPage: number,
  numberOfPages: number,
  goToPage: (pageNumber: number) => void
}

export const Pagination: React.FC<IPaginationProps> = ({
  disabledNext,
  disabledPrevious,
  goToPage,
  currentPage,
  numberOfPages
}) => {
  return (
    <div>
      <PageNumbersNavigation currentPage={currentPage} numberOfPages={numberOfPages} onPageClick={goToPage} />
      <PaginationButton
        content="<"
        onClick={() => goToPage(currentPage - 1)}
        disabled={disabledPrevious}
      />
      <PaginationButton
        content=">"
        onClick={() => goToPage(currentPage + 1)}
        disabled={disabledNext}
      />
    </div>
  );
};
