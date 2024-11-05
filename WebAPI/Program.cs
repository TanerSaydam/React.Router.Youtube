var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.MapGet("/getall", async (string? search = "") =>
{
    if (search == "null")
    {
        search = "";
    }

    await Task.Delay(0001);
    return Employee.List.Where(p => p.FirstName.ToLower().Contains(search.ToLower()));
});


app.MapPost("/create", async (Employee request) =>
{
    Employee? employee = Employee.List.FirstOrDefault(p => p.Id == request.Id);
    if (employee is null)
    {
        Employee.List.Add(request);
    }
    else
    {
        employee.FirstName = request.FirstName;
        employee.LastName = request.LastName;
        employee.Profession = request.Profession;
        employee.AvatarUrl = request.AvatarUrl;
        employee.Salary = request.Salary;
    }

    await Task.Delay(0001);
    return Results.NoContent();
});

app.MapDelete("/deleteById", (Guid id) =>
{
    Employee.List = Employee.List.Where(p => p.Id != id).ToList();
    return Results.NoContent();
});

app.MapGet("/getById", (Guid id) =>
{
    return Employee.List.First(p => p.Id == id);
});

app.Run();


internal class Employee
{
    public static List<Employee> List { get; set; } = new()
    {
        new()
        {
            Id =  Guid.Parse("48960d06-4942-4820-b577-1fd49c65f7a6"),
            FirstName = "Taner",
            LastName = "Saydam",
            Profession = "Software Trainer",
            AvatarUrl = "https://cdn.pixabay.com/photo/2021/12/26/17/31/pokemon-6895600_1280.png",
            Salary = 130000
        },
        new()
        {
            Id =  Guid.Parse("c15f1493-6161-4e34-83bf-040ad111766e"),
            FirstName = "Toprak",
            LastName = "Saydam",
            Profession = "Öðrenci",
            AvatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlvgt4O7bdc3ZlDEvYvma4MmUh_by2nZrV0A&s",
            Salary = 17000
        },
         new()
        {
            Id =  Guid.Parse("d1d60680-fbb8-4543-bb2f-0ab640e149fe"),
            FirstName = "Tahir",
            LastName = "Saydam",
            Profession = "Öðrenci",
            AvatarUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaBRl6Tw8bwIQgfhCLnwfAymcMjL1YcCoIaQ&s",
            Salary = 19000
        }
    };
    public Employee()
    {
        Id = Guid.NewGuid();
    }
    public Guid? Id { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Profession { get; set; } = default!;
    public string AvatarUrl { get; set; } = default!;
    public decimal Salary { get; set; } = default!;
}