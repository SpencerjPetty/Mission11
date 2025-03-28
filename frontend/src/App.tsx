import './App.css';
import BookListPage from './pages/BookListPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartPage from './pages/CartPage';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BookListPage />} />
            <Route path="/books" element={<BookListPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
