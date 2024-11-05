var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

var app = builder.Build();

app.UseCors(x => x.AllowAnyHeader().AllowAnyOrigin().AllowAnyMethod());

app.MapGet("/getall", async (string search = "") =>
{
    await Task.Delay(2000);
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

    await Task.Delay(2000);
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
        }
    };
    public Employee()
    {
        Id = Guid.NewGuid();
    }
    public Guid Id { get; set; }
    public string FirstName { get; set; } = default!;
    public string LastName { get; set; } = default!;
    public string Profession { get; set; } = default!;
    public string AvatarUrl { get; set; } = default!;
    public decimal Salary { get; set; } = default!;
}