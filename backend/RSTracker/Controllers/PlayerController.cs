using Microsoft.AspNetCore.Mvc;
using RSTracker.Models;
using RSTracker.Helpers;
using RSTracker.Services;
using Microsoft.EntityFrameworkCore;
using RSTracker.Abstractions;

namespace RSTracker.Controllers
{
    [ApiController]
    [Route("player")]
    public class PlayerController : ControllerBase
    {
        private readonly PlayerHelper _playerHelper;
        private readonly WelnessManager _welnessManager;
        private readonly RPEManager _rpeManager;

        public PlayerController(IDbContextFactory<PlayerDbContext> contextFactor, IBlobLogger blobLogger, ICacheService cacheService)
        {
            _playerHelper = new PlayerHelper(contextFactor, blobLogger, cacheService);
            _welnessManager = new WelnessManager(contextFactor, blobLogger, cacheService);
            _rpeManager = new RPEManager(contextFactor, blobLogger, cacheService);
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
            await _welnessManager.AddWelnessToDb(playerId, input);
            return Ok(new { message = "Wellness data added successfully." });
        }

        [HttpDelete("delete-welness/{playerId}/{dateTarget}")]
        public async Task<IActionResult> DeleteWelness(int playerId, DateOnly dateTarget)
        {
            await _welnessManager.DeleteWelness(playerId, dateTarget);
            return Ok(new { message = "Wellness data deleted successfully." });
        }

        [HttpPost("add-rpe/{playerId}")]
        public async Task<IActionResult> AddRPE(int playerId, [FromBody] RpeInput input)
        {
            await _rpeManager.AddRPEToDb(playerId, input);
            return Ok(new { message = "RPE data added successfully." });
        }

        [HttpDelete("delete-rpe/{playerId}/{dateTarget}")]
        public async Task<IActionResult> DeleteRPE(int playerId, DateOnly dateTarget)
        {
            await _rpeManager.DeleteRPE(playerId, dateTarget);
            return Ok(new { message = "RPE data deleted successfully." });
        }

        [HttpGet("get-rpe/{startDate}")]
        public async Task<IActionResult> GetRpeOfLeagueWeek(DateOnly startDate)
        {
            var rpe = await _rpeManager.GetRPEOfLeagueWeek(startDate);
            return Ok(rpe);
        }

        [HttpGet("get-welness/{startDate}")]
        public async Task<IActionResult> GetWelnessOfLeagueWeek(DateOnly startDate)
        {
            var welness = await _welnessManager.GetWelnessOfLeagueWeek(startDate);
            return Ok(welness);
        }

        [HttpGet("get-players")]
        public async Task<IActionResult> GetPlayers()
        {
            var players = await _playerHelper.GetAllPlayers();
            return Ok(players);
        }

        [HttpGet("dummy")]
        public async Task<IActionResult> Dummy()
        {
            // This is a dummy endpoint for testing purposes.
            return Ok(new { message = "Dummy endpoint reached successfully." });
        }
    }
}
