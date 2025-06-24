using RSTracker.Helpers;
using Microsoft.EntityFrameworkCore;
using RSTracker.Abstractions;
public class ACWRManager : PlayerHelper
{

    public ACWRManager(IDbContextFactory<PlayerDbContext> contextFactory, IBlobLogger blobLogger, ICacheService cacheService)
        : base(contextFactory, blobLogger, cacheService)
    {
    }

    public async Task<IEnumerable<ACWRWeek>> GetACWR(DateOnly startDate, int numberOfWeeks)
    {
        await _blobLogger.LogAsync($"Calculating ACWR from {startDate} for {numberOfWeeks} weeks");
        var targetDates = GetTargetDates(startDate, numberOfWeeks);
        return CalculateACWR(await FetchRpeData(targetDates));
    }

    private IEnumerable<ACWRWeek> CalculateACWR(IEnumerable<ACWRWeek> weeks)
    {
        var weekList = weeks.ToList();

        for (int i = 0; i < weekList.Count; i++)
        {
            if (i >= 4)
            {
                double previousSum = weekList.Skip(i - 4).Take(4).Sum(w => w.TotalWeekRpe);
                double currentRpe = weekList[i].TotalWeekRpe;

                if (currentRpe != 0)
                {
                    weekList[i].CalculateAcwr(previousSum);
                }
            }
        }

        return weekList;
    }

    private async Task<IEnumerable<ACWRWeek>> FetchRpeData(IEnumerable<IEnumerable<DateOnly>> input)
    {
        var tasks = input.Select(async week =>
        {
            using var context = _contextFactory.CreateDbContext();
            List<ACWRRPE> weekData = new();

            foreach (var date in week)
            {
                var rpes = await context.RPEs
                    .Where(x => x.Date == date)
                    .ToListAsync();

                if (rpes.Count == 0)
                {
                    weekData.Add(new ACWRRPE(date, 0, 0, 0));
                    continue;
                }

                double count = rpes.Count;
                var durationSum = rpes.Sum(x => x.IntervalInMinutes);
                var commonTime = durationSum / count;

                double totalRpe = Math.Round(rpes.Sum(x => x.TotalRpeValue) / count, 1);
                double totalVolume = Math.Round(totalRpe / 760 * 100, 2);
                double totalIntensity = Math.Round(totalVolume / (commonTime / 95.0), 2);

                weekData.Add(new ACWRRPE(date, totalRpe, totalVolume, totalIntensity));
            }

            return new ACWRWeek(weekData);
        });

        var acwrWeeks = await Task.WhenAll(tasks);
        return acwrWeeks.OrderBy(x => x.FirstDayOfWeek).ToList();
    }


    private IEnumerable<IEnumerable<DateOnly>> GetTargetDates(DateOnly startDate, int numberOfWeeks)
    {
        List<List<DateOnly>> weeks = new List<List<DateOnly>>();
        for (int i = 0; i < numberOfWeeks; i++)
        {
            List<DateOnly> daysInWeek = new List<DateOnly>();
            for (int j = 0; j < 7; j++)
            {
                daysInWeek.Add(startDate.AddDays(i * 7 + j));
            }
            weeks.Add(daysInWeek);
        }
        return weeks;
    }
}