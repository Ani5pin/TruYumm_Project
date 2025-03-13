using Microsoft.EntityFrameworkCore;
using truYumApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;


public class CartItemRepository : ICartItemRepository
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<CartItem> _dbSet;

    public CartItemRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<CartItem>();
    }

    public async Task<IEnumerable<CartItem>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<CartItem> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task AddAsync(CartItem entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public async Task UpdateAsync(CartItem entity)
    {
        _dbSet.Update(entity);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await GetByIdAsync(id);
        if (entity != null)
        {
            _dbSet.Remove(entity);
            await _context.SaveChangesAsync();
        }
    }
}
