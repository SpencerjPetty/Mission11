import { useState } from 'react';
import { Book } from '../types/Book';
import { updateBook } from '../api/BooksAPI';

interface EditBookFormProps {
  book: Book;
  onSuccess: () => void;
  onCancel: () => void;
}

const EditBookForm = ({ book, onSuccess, onCancel }: EditBookFormProps) => {
  const [formData, setFormData] = useState<Book>({ ...book });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: id === 'pageCount' || id === 'price' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stops the website from reloading
    await updateBook(formData.bookID, formData);
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="container p-3 shadow-sm bg-light rounded"
      style={{ maxWidth: '400px' }}
    >
      <div className="mb-2">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label htmlFor="author" className="form-label">
          Author
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label htmlFor="publisher" className="form-label">
          Publisher
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="publisher"
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="isbn" className="form-label">
          ISBN
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="isbn"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          required
        />
      </div>

      <div className="mb-2">
        <label htmlFor="classification" className="form-label">
          Classification
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="classification"
          name="classification"
          value={formData.classification}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="category" className="form-label">
          Category
        </label>
        <input
          type="text"
          className="form-control form-control-sm"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>

      <div className="mb-2">
        <label htmlFor="pageCount" className="form-label">
          Page Count
        </label>
        <input
          type="number"
          className="form-control form-control-sm"
          id="pageCount"
          name="pageCount"
          value={formData.pageCount}
          onChange={handleChange}
          min="1"
          required
        />
      </div>

      <div className="mb-2">
        <label htmlFor="price" className="form-label">
          Price ($)
        </label>
        <input
          type="number"
          className="form-control form-control-sm"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-primary btn-sm">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditBookForm;
