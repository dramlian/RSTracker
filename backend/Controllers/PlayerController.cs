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
        public PlayerController(PlayerDbContext context, BlobLogger blobLogger)
        {
            _playerHelper = new PlayerHelper(context, blobLogger);
        }

        [HttpPost("addplayer")]
        public async Task<IActionResult> AddPlayer([FromBody] PlayerInput playerInput)
        {
            await _playerHelper.AddPlayerToDb(playerInput);
            return Ok(new { message = "Player added successfully." });
        }

        [HttpDelete("delete/{playerId}")]
        public async Task<IActionResult> DeletePlayer(int playerId)
        {
            await _playerHelper.DeletePlayer(playerId);
            return Ok(new { message = "Player deleted successfully." });
        }

        [HttpPost("add-welness/{playerId}")]
        public async Task<IActionResult> AddWelness(int playerId, [FromBody] WelnessInput input)
        {
            await _playerHelper.AddWelnessToDb(playerId, input);
            return Ok(new { message = "Wellness data added successfully." });
        }

        [HttpDelete("delete-welness/{playerId}/{dateTarget}")]
        public async Task<IActionResult> DeleteWelness(int playerId, DateOnly dateTarget)
        {
            await _playerHelper.DeleteWelness(playerId, dateTarget);
            return Ok(new { message = "Wellness data deleted successfully." });
        }

        [HttpPost("add-rpe/{playerId}")]
        public async Task<IActionResult> AddRPE(int playerId, [FromBody] RpeInput input)
        {
            await _playerHelper.AddRPEToDb(playerId, input);
            return Ok(new { message = "RPE data added successfully." });
        }

        [HttpDelete("delete-rpe/{playerId}/{dateTarget}")]
        public async Task<IActionResult> DeleteRPE(int playerId, DateOnly dateTarget)
        {
            await _playerHelper.DeleteRPE(playerId, dateTarget);
            return Ok(new { message = "RPE data deleted successfully." });
        }

        [HttpGet("get-rpe/{startDate}")]
        public async Task<IActionResult> GetRpeOfLeagueWeek(DateOnly startDate)
        {
            var rpe = await _playerHelper.GetRPEOfLeagueWeek(startDate);
            return Ok(rpe);
        }

        [HttpGet("get-welness/{startDate}")]
        public async Task<IActionResult> GetWelnessOfLeagueWeek(DateOnly startDate)
        {
            var welness = await _playerHelper.GetWelnessOfLeagueWeek(startDate);
            return Ok(welness);
        }

        [HttpGet("get-players")]
        public async Task<IActionResult> GetPlayers()
        {
            var players = await _playerHelper.GetAllPlayers();
            return Ok(players);
        }
    }
}
