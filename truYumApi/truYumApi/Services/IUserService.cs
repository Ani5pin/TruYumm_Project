using System.Threading.Tasks;

public interface IUserService
{
    Task<User> GetUserByUsernameAsync(string username);
    // Add other user-related methods here
    Task<bool> ValidateCredentialsAsync(string username, string password);
}
