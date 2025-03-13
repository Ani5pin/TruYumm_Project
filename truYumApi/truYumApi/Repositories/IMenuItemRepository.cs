using truYumApi.Models;
namespace truYumApi.Repositories;

public interface IMenuItemRepository
{
    Task<IEnumerable<MenuItem>> GetAllAsync();
    Task<MenuItem> GetByIdAsync(int id);
    Task AddAsync(MenuItem entity);
    Task UpdateAsync(MenuItem entity);
    Task DeleteAsync(int id);
}
