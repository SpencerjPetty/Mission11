interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalNumBooks: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  pageSize,
  totalNumBooks,
  onPageChange,
  onPageSizeChange,
}: PaginationProps) => {
  return (
    <>
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-primary me-2"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn btn-outline-primary mx-1 ${currentPage === index + 1 ? 'active' : ''}`}
            onClick={() => onPageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-primary ms-2"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>

      <div className="text-center my-3">
        <div className="d-flex flex-column align-items-center">
          <label className="form-label">Results per page:</label>
          <select
            className="form-select w-auto"
            value={pageSize}
            onChange={(e) => {
              onPageSizeChange(parseInt(e.target.value));
              onPageChange(1);
            }}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Pagination;
