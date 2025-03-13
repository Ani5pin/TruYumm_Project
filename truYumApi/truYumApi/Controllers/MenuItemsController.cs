using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using truYumApi.Models;
using Newtonsoft.Json.Linq;

[ApiController]
[Route("api/[controller]")]
public class MenuItemsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public MenuItemsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    //[Authorize(Roles = "Admin,Customer")]
    public IActionResult GetMenuItems()
    {
        var items = _context.MenuItems.ToList();
            //.Where(m =>  (m.IsActive && m.LaunchDate <= DateTime.Now))
            //.ToList();

        return Ok(items);
    }

    [HttpPost]
    //[Authorize(Roles = "Admin")]
    public IActionResult AddMenuItem(MenuItem menuItem)
    {
        _context.MenuItems.Add(menuItem);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetMenuItems), new { id = menuItem.MenuItemId }, menuItem);
    }

    [HttpPut("{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult EditMenuItem(int id, MenuItem menuItem)
    {
        var existingItem = _context.MenuItems.Find(id);
        if (existingItem == null) return NotFound();

        existingItem.Name = menuItem.Name;
        existingItem.Price = menuItem.Price;
        existingItem.IsActive = menuItem.IsActive;
        existingItem.LaunchDate = menuItem.LaunchDate;
        existingItem.IsFreeDelivery = menuItem.IsFreeDelivery;
        existingItem.Category = menuItem.Category;

        _context.SaveChanges();
        var success = true;
        return Ok(new { success });

    }


    [HttpDelete("{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult DeleteMenuItem(int id)
    {
        var menuItem = _context.MenuItems.Find(id);
        if (menuItem == null) return NotFound();

        _context.MenuItems.Remove(menuItem);
        _context.SaveChanges();
        var success = true;
        return Ok(new { success });
    }


    [HttpGet("{id}")]
    //[Authorize(Roles = "Admin")]
    public IActionResult GetMenuItemById(int id)
    {
        var menuItem = _context.MenuItems.Find(id);

        return Ok(new { menuItem });
    }
}
