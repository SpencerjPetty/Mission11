using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WaterProject.API.Data;

namespace WaterProject.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private readonly BookDbContext _context;
        public BookController(BookDbContext temp) => _context = temp;

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(
            int pageSize = 10,
            int pageNum = 1,
            string sortBy = "title",
            string sortOrder = "asc",
            [FromQuery] List<string>? categories = null)
        {
            var query = _context.Books.AsQueryable();

            // Filter by category if provided
            if (categories != null && categories.Any())
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            // Apply sorting
            query = sortBy.ToLower() switch
            {
                "title" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Title) : query.OrderByDescending(b => b.Title),
                "author" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Author) : query.OrderByDescending(b => b.Author),
                "publisher" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Publisher) : query.OrderByDescending(b => b.Publisher),
                "price" => sortOrder.ToLower() == "asc" ? query.OrderBy(b => b.Price) : query.OrderByDescending(b => b.Price),
                _ => query.OrderBy(b => b.Title)
            };

            var totalNumBooks = query.Count();

            var bookList = query
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                Books = bookList,
                TotalNumBooks = totalNumBooks
            };

            return Ok(response);
        }

        [HttpGet("GetCategories")]
        public IActionResult GetCategories()
        {
            var categories = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(categories);
        }
    }
}
