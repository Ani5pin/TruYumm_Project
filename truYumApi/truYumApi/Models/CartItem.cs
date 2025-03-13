using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace truYumApi.Models
{
    public class CartItem
    {
        [Key]
        public int CartItemId { get; set; }

        // Foreign key for MenuItem
        [Required]
        public int MenuItemId { get; set; }
        public MenuItem? MenuItem { get; set; }

        // Quantity of the MenuItem in the cart
        [Required]
        public int Quantity { get; set; }

        // Foreign key for User/Customer
        [Required]
        public int? UserId { get; set; } // Assuming UserId is a string like a GUID or username
        //public User User { get; set; } // Assuming you have a User entity

        //// Calculate total price based on quantity and item price
        //[NotMapped] // This ensures it is not mapped to the database, only for calculation purposes
        //public decimal TotalPrice => Quantity * MenuItem.Price;
    }
}