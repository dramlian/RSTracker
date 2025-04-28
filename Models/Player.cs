namespace RSTracker.Models;
public record Player
{
    public readonly int id;
    private readonly string _name;
    private readonly int _age;
    private readonly string _position;
    private readonly int _weight;
    private readonly int _height;
    private IEnumerable<Welness>? _welnessRecords;
    private IEnumerable<RPE>? _rpeRecords;

    public Player(int id, string name, int age, string position, int weight, int height)
    {
        this.id = id;
        _name = name;
        _age = age;
        _position = position;
        _weight = weight;
        _height = height;
    }

    public void AddWelnessRecord(Welness welness)
    {
        if (_welnessRecords == null)
        {
            _welnessRecords = new List<Welness>();
        }
        ((List<Welness>)_welnessRecords).Add(welness);
    }

    public void AddRPERecord(RPE rpe)
    {
        if (_rpeRecords == null)
        {
            _rpeRecords = new List<RPE>();
        }
        ((List<RPE>)_rpeRecords).Add(rpe);
    }
}