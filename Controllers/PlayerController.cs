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

        [HttpDelete("delete-welness/{playerId}")]
        public async Task<IActionResult> DeleteWelness(int playerId, DayOfWeekEnum dayOfWeek, int LeagueWeek)
        {
            await _playerHelper.DeleteWelness(playerId, dayOfWeek, LeagueWeek);
            return Ok(new { message = "Wellness data deleted successfully." });
        }

        [HttpPost("add-rpe/{playerId}")]
        public async Task<IActionResult> AddRPE(int playerId, [FromBody] RpeInput input)
        {
            await _playerHelper.AddRPEToDb(playerId, input);
            return Ok(new { message = "RPE data added successfully." });
        }

        [HttpDelete("delete-rpe/{playerId}")]
        public async Task<IActionResult> DeleteRPE(int playerId, DayOfWeekEnum dayOfWeek, int LeagueWeek)
        {
            await _playerHelper.DeleteRPE(playerId, dayOfWeek, LeagueWeek);
            return Ok(new { message = "RPE data deleted successfully." });
        }

        [HttpGet("get-welness/{leagueweek}/{dayofweek}")]
        public async Task<IActionResult> GetWelness(int leagueweek, DayOfWeekEnum dayofweek)
        {
            var welness = await _playerHelper.GetWelness(leagueweek, dayofweek);
            return Ok(welness);
        }

        [HttpGet("get-welness/{leagueweek}/{startday}/{endday}")]
        public async Task<IActionResult> GetWelness(int leagueweek, DayOfWeekEnum startday, DayOfWeekEnum endday)
        {
            var welness = await _playerHelper.GetWelnessOfaWeek(leagueweek, startday, endday);
            return Ok(welness);
        }
    }
}
