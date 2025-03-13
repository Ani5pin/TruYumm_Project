using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace truYumApi.Models
{
    public class MenuItem
    {
        [Key]
        public int MenuItemId { get; set; }

        [Required]
        [StringLength(100)]
        public string? Name { get; set; }

        [Required]
        [Range(0.01, 1000.00)]
        public decimal Price { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public bool IsFreeDelivery { get; set; }

        [Required]
        public DateTime LaunchDate { get; set; }
        
        [Required]
        public string Category { get; set; }

        //public string ImagePath { get; set; }
        

    }
}
