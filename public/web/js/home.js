/**
 * Draws graphs for home page
 */
function homecontent(realm, start, end) {
	d3.selectAll("svg").remove();
	var height = 600;
	var width = $("#combinedaggregate").width();
	d3.json('http://localhost:8080/count/?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
		dataset = [];
		dataset.push(data['spotbuy'].numSearches);
		dataset.push(data['buyer'].numSearches);
		dataset.push(data['spotbuy'].numItemDetails);
		dataset.push(data['buyer'].numItemDetails);
		dataset.push(data['spotbuy'].numAddToCart);
		dataset.push(data['buyer'].numAddToCart);
		var y = d3.scaleLinear()
			.range([0, width * 0.9]);
		var x = d3.scaleBand()
	    	.range([height * 0.9, 0]);
		var xAxis = d3.axisLeft(x);
		var yAxis = d3.axisTop(y);
		y.domain([0, d3.max(dataset, function(d) { return d * 1.5; })])
		var svg = d3.select("#combinedaggregate").append("svg")
			.attr("height", height)
			.attr("width", width)
			.attr('id', 'frontpage1')
		var xax = svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(20,20)")
		    .call(xAxis)
		    
	    xax.append("text")
			.attr("y", height * 0.9)
			.attr("x", 6)
			.attr("dy", ".71em")
			.attr('stroke', 'black')
	        .style("text-anchor", "start")
   	        .text("Source page");
		svg.append("g")
		    .attr("class", "y axis")
		    .attr("transform", "translate(20, 20)")
		    .call(yAxis)
			.append("text")
			.attr("y", 6)
			.attr("x", width * 0.9 - 5)
			.attr("dy", ".71em")
			.attr('stroke', 'black')
	        .style("text-anchor", "start")
	        .text("Total");
		xax.append("text")
			.attr("y", 6)
			.attr("x", 50)
			.attr("dy", ".71em")
			.attr('stroke', 'black')
			.attr("transform", "rotate(90)")
	        .style("text-anchor", "start")
   	        .text("Searches");
		xax.append("text")
			.attr("y", 6)
			.attr("x", 50 + height * 0.3)
			.attr("dy", ".71em")
			.attr('stroke', 'black')
			.attr("transform", "rotate(90)")
	        .style("text-anchor", "start")
	        .text("Items clicked");
		xax.append("text")
			.attr("y", 6)
			.attr("x", 50 + 2 * height * 0.3)
			.attr("dy", ".71em")
			.attr('stroke', 'black')
			.attr("transform", "rotate(90)")
	        .style("text-anchor", "start")
	        .text("Added to cart");
		svg.selectAll(".searchbar")
		  .data(dataset)
	      .enter()
	      .append("rect")
	      .attr("transform", "translate(20,20)")
	      .attr('fill', function(d, i) {
	    	  if (i%2 != 0) {
	    		  return 'steelblue'
	    	  } else {
	    		  return 'orange'
	    	  }
	      })
	      .attr("class", "searchbar")
	      .attr("y", function(d, i) { 
	    	  return i * (height * 0.9 - 20)/dataset.length + 1; 
	       })
//	      .attr("height", function(d) { return y(d.repeated); })
	      .attr("x", function(d) {return 1 ;})
	      .attr("height", (height * 0.9 - 20)/dataset.length - 10)
	      .transition().delay(function (d,i) {
				return i * 100
			}).duration(200).attr("width", function(d) { return y(d); })
		createlegend(svg, width, height);
		d3.json('http://localhost:8080/user/?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
			forscale = []
			function addtoforscale(d) {
				d.date = new Date(d.day)
				forscale.push(d);
			}
			data.buyer.days.forEach(addtoforscale);
			data.spotbuy.days.forEach(addtoforscale);
			var svg = d3.select("#combinedusers").append("svg")
				.attr("height", height)
				.attr("width", width)
				.attr('id', 'frontpage2')
			var x = d3.scaleTime()
				.range([0, width * 0.9]);
			var y = d3.scaleLinear()
		    	.range([height * 0.9, 0]);
			var xAxis = d3.axisBottom(x);
			var yAxis = d3.axisLeft(y);
			y.domain([0, d3.max(forscale, function(d) { return d.num * 1.3; })])
			x.domain(d3.extent(forscale, function(d) { 
				d.date = new Date(d.day)
			    return d.date; }));
			svg.append("g")
		      .attr("class", "xaxis")
		      .attr("transform", "translate(50," + (height *0.9 + 10) + ")")
		      .call(xAxis);

		    svg.append("g")
		      .attr("class", "yaxis")
		      .attr("transform", "translate(50,10)")
		      .call(yAxis)
		      .append("text")
		      .attr("class", "axis-title")
		      .attr("transform", "rotate(-90)")
		      .attr("y", 6)
		      .attr("dy", ".71em")
		      .attr('stroke', 'black')
		      .style("text-anchor", "end")
		      .style("visiblity", "visible")
		      .text("Users");
		    var line = d3.line()
			    .x(function(d) { return x(d.date); })
			    .y(function(d) { return y(d.num); });
		    svg.append("path")
			   .datum(data.buyer.days)
			   .attr("class", "line")
			   .attr("id", "buyerline")
			   .attr("transform", "translate(50,10)")
			   .attr("d", line);
		    svg.append("path")
			   .datum(data.spotbuy.days)
			   .attr("class", "line")
			   .attr("transform", "translate(50,10)")
			   .attr("id", "spotbuyline")
			   .attr("d", line);
		    var curtain = svg.append('rect')
		    	.attr("transform", "translate(50,10)")
			    .attr('x', 1)
			    .attr('y', 0)
			    .attr('height', height* 0.9)
			    .attr('width', width* 0.95)
			    .attr('class', 'curtain')
			    .style('fill', '#ffffff')
			  svg.transition()
			    .duration(4000)
			    .select('.curtain')
			    .attr('x', width * 0.95)
			    .attr('width', 0);
		    createlegend(svg, width, height);
		})
		
	})
}
/**
 * creates legend for graphs
 */
function createlegend(svg, width, height) {
	svg.append("rect")
	    .attr("x", width * 0.8)
	    .attr("y", height * 0.8)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", 'orange');
	svg.append("rect")
	    .attr("x", width * 0.8)
	    .attr("y", height * 0.8 + 25)
	    .attr("width", 18)
	    .attr("height", 18)
	    .style("fill", 'steelblue');
	svg.append("text")
	    .attr("x", width * 0.8 - 10)
	    .attr("y", height * 0.8 + 5)
	    .attr("dy", ".71em")
		.attr('stroke', 'black')
		.style("text-anchor", "end")
	    .text("Spotbuy");
	svg.append("text")
	    .attr("x", width * 0.8 - 10)
	    .attr("y", height * 0.8 + 30)
	    .attr("dy", ".50em")
		.attr('stroke', 'black')
		.style("text-anchor", "end")
	    .text("Buyer");
}