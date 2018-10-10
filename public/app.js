
$.getJSON("/articles", function(data) {
  for (var i = 0; i < data.length; i++) {
    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + "This would be where the summary is, but the api doesn't have a summary object." + "<br />" +  data[i].link + "</p>");
  }
});


$(document).on("click", "p", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function(data) {
      console.log(data);
      $('#notes').append("<form action='/submit' method='post'>");
      $("#notes").append("<h2 class='font-weight-bold'>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<button data-id='" + data._id + "' id='deletenote'>Delete Note</button>");
      $('#notes').append("</form>");

      if (data.note) {

        $("#notes").append("<h2>" + data.note.title + "</h2>");
        console.log(data.note)
        $("#notes").append("<h3>" + data.note.body + "</h3>");

        
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");
  var notes = [];
  notes.push($("#bodyinput").val());
  console.log(notes);
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()

    }
  })
    .then(function(data) {
      console.log(data.length);
      $("#notes").empty();
      console.log(data);
      $("#titleinput").val("");
      $("#bodyinput").val("");
      
    });
    
    $(document).on("click", "#deletenote", function() {
      var thisId = $(this).attr("data-id");
      $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: {
          title: $("#titleinput").val(),
          body: $("#bodyinput").val(),
        }
      })
        .then(function(data) {
          $("#notes").empty();
          console.log(data)
        });
      });
  $("#titleinput").val("");
  $("#bodyinput").val("");

});

