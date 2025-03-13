using System.ComponentModel.DataAnnotations;

public class Role
{
    [Key]
    public int RoleId { get; set; }

    [Required]
    public string? RoleName { get; set; }

    // Navigation property for related users
    public ICollection<User> Users { get; set; }
}
