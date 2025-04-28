using Microsoft.AspNetCore.Mvc;
using RSTracker.Models;

namespace RSTracker.Controllers
{
    [ApiController]
    [Route("player")]

    public class PlayerController : ControllerBase
    {
        public PlayerController()
        {

        }

        [HttpPost("addplayer")]
        public IActionResult AddPlayer([FromBody] PlayerInput playerInput)
        {
            if (playerInput == null)
            {
                return BadRequest("Player input cannot be null.");
            }

            // Here you would typically add the player to a database or a list
            // For now, we just return the received input
            return Ok(playerInput);
        }


        [HttpGet("get-players")]
        public IActionResult GetPlayers(
            [FromQuery] List<int> playerIds,
            [FromQuery] int week,
            [FromQuery] DateOnly? date,
            [FromQuery] bool addWelness = false,
            [FromQuery] bool addRpe = false)
        {
            var players = new List<Player>
            {
                new Player(1, "John Doe", 25, "Forward", 180, 75),
                new Player(2, "Jane Smith", 22, "Midfielder", 170, 65)
            };

            return Ok(players);
        }


        [HttpPost("add-welness/{playerId}")]
        public IActionResult AddWelness(int playerId, [FromBody] WelnessInput input)
        {
            var welness = new Welness(
                input.MuscleStatus,
                input.RecoveryStatus,
                input.StressStatus,
                input.SleepStatus,
                input.Date,
                input.LeagueWeek
            );

            // Now you can save 'welness' to database, or add to Player, etc.

            return Ok();
        }

        [HttpPost("add-rpe/{playerId}")]
        public IActionResult AddRPE(int playerId, [FromBody] RpeInput input)
        {
            var rpe = new RPE(
                input.IntervalInMinutes,
                input.Value
            );

            // Now you can save 'rpe' to database, or add to Player, etc.

            return Ok();
        }
    }
}
