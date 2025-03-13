using truYumApi.Models;

public interface ICartItemRepository
{
    Task<IEnumerable<CartItem>> GetAllAsync();
    Task<CartItem> GetByIdAsync(int id);
    Task AddAsync(CartItem entity);
    Task UpdateAsync(CartItem entity);
    Task DeleteAsync(int id);
}
