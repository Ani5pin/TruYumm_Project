using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public int UserId { get; set; }

    [Required(ErrorMessage = "Username is required")]
    [StringLength(100, ErrorMessage = "Username can't be longer than 100 characters")]
    public string? Username { get; set; }

    [Required(ErrorMessage = "Password is required")]
    [DataType(DataType.Password)]
    public string? Password { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email Address")]
    public string? Email { get; set; }

    // Foreign key for Role
    [ForeignKey("Role")]
    public int RoleId { get; set; }
    public Role Role { get; set; }
}