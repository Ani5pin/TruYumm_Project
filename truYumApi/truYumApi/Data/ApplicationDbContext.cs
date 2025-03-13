using Microsoft.EntityFrameworkCore;
using truYumApi.Models;

public class ApplicationDbContext : DbContext
{
    public DbSet<MenuItem> MenuItems { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Define relationships
        //modelBuilder.Entity<MenuItem>()
        //    .HasOne(m => m.Category)
        //    .WithMany(c => c.MenuItems)
        //    .HasForeignKey(m => m.CategoryId);

        modelBuilder.Entity<CartItem>()
            .HasOne(c => c.MenuItem)
            .WithMany()
            .HasForeignKey(c => c.MenuItemId);

        // Seed data for roles
        modelBuilder.Entity<Role>().HasData(
            new Role { RoleId = 1, RoleName = "Admin" },
            new Role { RoleId = 2, RoleName = "Customer" }
        );

        // Seed data for users with hashed passwords
        modelBuilder.Entity<User>().HasData(
            new User
            {
                UserId = 100,
                Username = "admin1",
                Password = BCrypt.Net.BCrypt.HashPassword("admin1"), // Hash the password
                Email = "admin1@example.com",
                RoleId = 1
            },
            new User
            {
                UserId = 101,
                Username = "cust1",
                Password = BCrypt.Net.BCrypt.HashPassword("cust1"), // Hash the password
                Email = "cust1@example.com",
                RoleId = 2
            }
        );
    }
}
