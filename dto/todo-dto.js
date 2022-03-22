class TodoDto {
  id;
  title;
  date;

  constructor(model) {
    this.id = model._id;
    this.title = model.title;
    this.date = model.date;
  }
}

module.exports = TodoDto;
