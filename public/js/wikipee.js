
    $("#search").on("click", function() {

    var searchTerm = $("#city").val();
		var url = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+ searchTerm +"&format=json&callback=?";
		$.ajax({
			url: url,
			type: 'GET',
			contentType: "application/json; charset=utf-8",
			async: false,
      dataType: "json",
      success: function(data, status, jqXHR) {
        		console.log(data);
            console.log(data[2]["0"]);
            console.log(data[0])
        		// $("#output").html();

        			$("#output").append("<div><a href=https://en.wikipedia.org/wiki/"+data[0]+"><h1>" + data[2]["0"] +  "<h1></a></div>");
        	}
		})
		.done(function() {
			console.log("success");
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

    });
