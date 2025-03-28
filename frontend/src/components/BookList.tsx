import { useEffect, useState } from 'react';
import { Book } from '../types/Book';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalNumBooks, setTotalNumBooks] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [subtotal, setSubtotal] = useState<number>(0);
  const navigate = useNavigate();
  const { addToCart, getCartSubtotal } = useCart();

  const handleAddToCart = (book: Book) => {
    console.log('Adding book:', book);
    const newItem: CartItem = {
      bookID: Number(book.bookID),
      title: book.title || 'No title found',
      price: Number(book.price),
      quantity: 1,
    };
    addToCart(newItem);
    setSubtotal(getCartSubtotal()); // Get updated subtotal after adding the item
    setShowToast(true); // Show the toast
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  useEffect(() => {
    // Update subtotal whenever cart changes
    setSubtotal(getCartSubtotal());
  }, [getCartSubtotal]); // Depend on getCartSubtotal so it updates on cart change

  const handleToast = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000); // Hide toast after 3 seconds
  };

  // Ensure the toast is shown after the subtotal is updated
  useEffect(() => {
    if (subtotal > 0) {
      handleToast();
    }
  }, [subtotal]);

  useEffect(() => {
    const fetchBooks = async () => {
      const categoryParams = selectedCategories
        .map((category) => `categories=${encodeURIComponent(category)}`)
        .join('&');

      const response = await fetch(
        `https://localhost:5000/api/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&sortOrder=${sortOrder}${
          categoryParams ? `&${categoryParams}` : ''
        }`,
        { credentials: 'include' }
      );

      const data = await response.json();
      setBooks(data.books);
      setTotalNumBooks(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum, sortBy, sortOrder, selectedCategories]);

  return (
    <div className="container mt-4">
      <h1 className="mb-4 text-center">All Books</h1>
      <div className="row justify-content-center d-flex">
        {books.map((book) => (
          <div className="col-auto mb-4" key={book.bookID}>
            <div className="card h-100 shadow-sm text-center p-3 w-100">
              <div className="card-body">
                <h5 className="card-title text-wrap">{book.title}</h5>
                <ul className="list-unstyled text-start">
                  <li>
                    <strong>Author:</strong> {book.author}
                  </li>
                  <li>
                    <strong>Publisher:</strong> {book.publisher}
                  </li>
                  <li>
                    <strong>ISBN:</strong> {book.isbn}
                  </li>
                  <li>
                    <strong>Classification:</strong> {book.classification}
                  </li>
                  <li>
                    <strong>Category:</strong> {book.category}
                  </li>
                  <li>
                    <strong>Page Count:</strong> {book.pageCount}
                  </li>
                  <li>
                    <strong>Price:</strong> ${book.price.toFixed(2)}
                  </li>
                </ul>

                <button
                  className="btn btn-success"
                  onClick={() => {
                    handleAddToCart(book);
                    setSubtotal(getCartSubtotal()); // Ensure subtotal is updated
                  }}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-primary me-2"
          disabled={pageNum === 1}
          onClick={() => setPageNum(pageNum - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`btn btn-outline-primary mx-1 ${pageNum === index + 1 ? 'active' : ''}`}
            onClick={() => setPageNum(index + 1)}
            disabled={pageNum === index + 1}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="btn btn-primary ms-2"
          disabled={pageNum === totalPages}
          onClick={() => setPageNum(pageNum + 1)}
        >
          Next
        </button>
      </div>

      {/* Sort and results per page */}
      <div className="row g-2 align-items-center">
        {/* Add dropdowns for sort by and results per page here... */}
      </div>

      {/* Toast Notification for Cart */}
      {showToast && (
        <div
          className="position-fixed bottom-0 end-0 p-3"
          style={{ zIndex: 1050 }}
        >
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Cart Update</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">
              <p>Item added to cart!</p>
              <p>Updated subtotal: ${subtotal.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookList;
