using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductAPI.Model;
namespace ProductAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(Product product)
        {
            _context.Products.Add(product);
            product.CreatedDateTime = DateTime.UtcNow;
            product.UpdatedDateTime = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return Ok(product);
        }
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var product = await _context.Products.ToListAsync();
            return Ok(product);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound("product not found");
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return Ok();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] Product product)
        {
            try
            {
                var existingProduct = await _context.Products.FindAsync(id);
                if (existingProduct == null)
                {
                    return NotFound("Product not found");
                }
                existingProduct.UpdatedDateTime = DateTime.UtcNow;
                existingProduct.Name = product.Name;
                existingProduct.Quantity = product.Quantity;
                existingProduct.Price = product.Price;
                existingProduct.Category = product.Category;
                existingProduct.Location = product.Location;
                existingProduct.Description = product.Description;
                existingProduct.Company = product.Company;
                await _context.SaveChangesAsync();
                return Ok("Product updated successfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
