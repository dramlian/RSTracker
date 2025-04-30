using Microsoft.AspNetCore.Mvc;
using RSTracker.Models;
using RSTracker.Helpers;

namespace RSTracker.Controllers
{
    [ApiController]
    [Route("player")]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerHelper _playerHelper;
        public PlayerController(PlayerDbContext context)
        {
            _playerHelper = new PlayerHelper(context);
        }

        [HttpPost("addplayer")]
        public async Task<IActionResult> AddPlayer([FromBody] PlayerInput playerInput)
        {
            await _playerHelper.AddPlayerToDbAsync(playerInput);
            return Ok(new { message = "Player added successfully." });
        }

        [HttpPost("add-welness/{playerId}")]
        public async Task<IActionResult> AddWelness(int playerId, [FromBody] WelnessInput input)
        {
            await _playerHelper.AddWelnessToDbAsync(playerId, input);
            return Ok(new { message = "Wellness data added successfully." });
        }

        [HttpPost("add-rpe/{playerId}")]
        public async Task<IActionResult> AddRPE(int playerId, [FromBody] RpeInput input)
        {
            await _playerHelper.AddRpeToDbAsync(playerId, input);
            return Ok(new { message = "RPE data added successfully." });
        }

    }
}
