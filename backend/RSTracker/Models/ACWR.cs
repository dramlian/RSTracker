public record ACWRRPE
{
    public DateOnly Date { get; set; }
    public double Rpe { get; set; }
    public double Volume { get; set; }
    public double Intensity { get; set; }

    public ACWRRPE(DateOnly date, double rpe, double volume, double intensity)
    {
        Date = date;
        Rpe = rpe;
        Volume = volume;
        Intensity = intensity;
    }
}

public record ACWRWeek
{
    public double TotalWeekRpe { get; set; }
    public double AverageIntensity { get; set; }
    public double AverageVolume { get; set; }
    public DateOnly FirstDayOfWeek { get; set; }
    public double ACWRCalculated { get; set; }

    public ACWRWeek(IEnumerable<ACWRRPE> acwrRecords)
    {
        TotalWeekRpe = Math.Round(acwrRecords.Sum(x => x.Rpe), 1);
        AverageIntensity = Math.Round(acwrRecords.Average(x => x.Intensity), 2);
        AverageVolume = Math.Round(acwrRecords.Average(x => x.Volume), 2);
        FirstDayOfWeek = acwrRecords.First().Date;
    }

    public void CalculateAcwr(double sumFromPreviousWeeks)
    {
        this.ACWRCalculated = Math.Round(this.TotalWeekRpe / sumFromPreviousWeeks, 2);
    }
}
