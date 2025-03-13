using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using truYumApi.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartItemRepository _cartItemRepository;
    private readonly IUserService _userService;
    private readonly ApplicationDbContext _context;

    public CartController(ICartItemRepository cartItemRepository, IUserService userService, ApplicationDbContext context)
    {
        _cartItemRepository = cartItemRepository;
        _userService = userService;
        _context = context;
    }

    [HttpGet]
    [Authorize]
    public async Task<IActionResult> GetCartItems()
    {
        var username = User.Identity.Name;
        var user = await _userService.GetUserByUsernameAsync(username);

        // Ensure user is not null
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        var cartItems = await _context.CartItems
        .Where(c => c.UserId == user.UserId)  // Filter by UserId
        .Include(c => c.MenuItem)             // Include related MenuItem entity
        .ToListAsync();

        // Select the data, including related MenuItem info
        var customerCartItems = cartItems
            .Select(c => new
            {
                CartItemId = c.CartItemId,
                MenuItemId = c.MenuItemId,        // MenuItemId from CartItem
                MenuItemName = c.MenuItem.Name,   // MenuItem Name from the related MenuItem entity
                MenuItemPrice = c.MenuItem.Price, // MenuItem Price
                Quantity = c.Quantity
                //TotalPrice = c.Quantity * c.MenuItem.Price  // Calculate total price
            })
            .ToList();


        return Ok(customerCartItems);
    }

    [HttpPost("add")]
    [Authorize]
    public async Task<IActionResult> AddToCart(CartItem cartItem)
    {
        var username = User.Identity.Name;
        var user = await _userService.GetUserByUsernameAsync(username);

        // Ensure user is not null
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        // Find the cart item by UserId and MenuItemId
        var existingCartItem = await _context.CartItems
            .Where(ci => ci.UserId == user.UserId && ci.MenuItemId == cartItem.MenuItemId)
            .FirstOrDefaultAsync();

        if (existingCartItem != null && cartItem != null)
        {
                // Update the quantity or perform any other logic if item already exists
                existingCartItem.Quantity += cartItem.Quantity;
                _context.CartItems.Update(existingCartItem);
        }
        else
        {
            // Add new cart item if not already in cart
            cartItem.UserId = user.UserId;  // Ensure UserId is an integer
            _context.CartItems.Add(cartItem);
        }

        await _context.SaveChangesAsync();
        return Ok(cartItem);
    }

    [HttpPost("remove")]
    //[Authorize(Roles = "Customer")]
    public async Task<IActionResult> RemoveToCart(CartItem cartItem)
    {
        var username = User.Identity.Name;
        var user = await _userService.GetUserByUsernameAsync(username);

        // Ensure user is not null
        if (user == null)
        {
            return Unauthorized("User not found.");
        }

        // Find the cart item by UserId and MenuItemId
        var existingCartItem = await _context.CartItems
            .Where(ci => ci.UserId == user.UserId && ci.MenuItemId == cartItem.MenuItemId)
            .FirstOrDefaultAsync();

        if (existingCartItem != null && cartItem != null)
        {
            // Update the quantity or perform any other logic if item already exists
            existingCartItem.Quantity -= cartItem.Quantity;
            _context.CartItems.Update(existingCartItem);
        }
        else
        {
            // Add new cart item if not already in cart
            cartItem.UserId = user.UserId;  // Ensure UserId is an integer
            _context.CartItems.Add(cartItem);
        }

        await _context.SaveChangesAsync();
        return Ok(cartItem);
    }


    [HttpDelete("{id}")]
    //[Authorize(Roles = "Customer")]
    public async Task<IActionResult> RemoveFromCart(int id)
    {
            await _cartItemRepository.DeleteAsync(id);
             var success = true;
            return Ok(new {success });
    }
}
