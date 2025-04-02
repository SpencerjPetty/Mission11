import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://bookstore-petty-backend.azurewebsites.net/api/Book/GetCategories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCategoryChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((category) => category !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h2>Category Filter</h2>
      <div className="category-list">
        {categories.map((category) => (
          <div className="category-item" key={category}>
            <input
              className="category-checkbox"
              type="checkbox"
              id={category}
              value={category}
              onChange={handleCategoryChange}
            />
            <label className="category-item-label" htmlFor={category}>
              {category}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
