using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;
    private readonly IConfiguration _config;

    public AuthController(IUserService userService, IConfiguration config)
    {
        _userService = userService;
        _config = config;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginModel userLogin)
    {
        var isValidUser = await _userService.ValidateCredentialsAsync(userLogin.Username, userLogin.Password);

        if (!isValidUser)
        {
            return Unauthorized();
        }

        var user = await _userService.GetUserByUsernameAsync(userLogin.Username);

        if (user == null)
        {
            return NotFound("User not found.");
        }

        var token = GenerateJwtToken(user);
        return Ok(new { token,user.RoleId,user.UserId});
    }

    private string GenerateJwtToken(User user)
    {
        // Ensure the role is not null. Default to "User" if role is not set
        var roleName = user.Role?.RoleName ?? "User";

        var claims = new[]
        {
        new Claim(JwtRegisteredClaimNames.Sub, user.Username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.Role, roleName), // Use roleName here
        new Claim("UserId", user.UserId.ToString()),
        new Claim("name", user.Username.ToString())
    };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.Now.AddHours(2),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

}

public class UserLoginModel
{
    public string Username { get; set; }
    public string Password { get; set; }
}