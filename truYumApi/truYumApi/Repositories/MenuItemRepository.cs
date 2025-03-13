using Microsoft.EntityFrameworkCore;
using truYumApi.Repositories;
using truYumApi.Models;

public class MenuItemRepository : IMenuItemRepository
{
    private readonly ApplicationDbContext _context;
    private readonly DbSet<MenuItem> _dbSet;

    public MenuItemRepository(ApplicationDbContext context)
    {
        _context = context;
        _dbSet = _context.Set<MenuItem>();
    }

    public async Task<IEnumerable<MenuItem>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    public async Task<MenuItem> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task AddAsync(MenuItem entity)
    {
        await _dbSet.AddAsync(entity);
    }

    public async Task UpdateAsync(MenuItem entity)
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
