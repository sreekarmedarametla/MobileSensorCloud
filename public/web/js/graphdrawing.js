/**
 * Draws the Aggregate data and searches per session stats
 * @param start, start date
 * @param end, end date
 */
function newgraph(product, realm, start, end) {
	console.log("new graph");
		d3.selectAll(".barchart").remove();
		d3.selectAll(".stattext").remove();
		var h = document.getElementById("aggregate").offsetHeight - 26;
		var w = document.getElementById("aggregate").offsetWidth;
		var labels = ['Searches', 'Item Details', 'Add to Carts'];
		d3.json('http://localhost:8080/count/' + product + '/?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
			var dataset = [];
			dataset.push(data[product].numSearches);
			dataset.push(data[product].numItemDetails);
			dataset.push(data[product].numAddToCart);
			var y = d3.scaleLinear()
				.range([0, w * 0.9]);
			var x = d3.scaleBand()
		    	.range([h * 0.9, 0]);
			var xAxis = d3.axisLeft(x);
			var yAxis = d3.axisTop(y);
			y.domain([0, d3.max(dataset, function(d) { return d * 1.5; })])
			var svg = d3.select("#aggregate").append("svg")
				.attr("height", h)
				.attr("width", w)
				.attr("class", "barchart");
			var xax = svg.append("g")
			    .attr("class", "x axis")
			    .attr("transform", "translate(20,20)")
			    .call(xAxis)
			    
		    xax.append("text")
				.attr("y", h * 0.85)
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
				.attr("x", w * 0.9 - 5)
				.attr("dy", ".71em")
				.attr('stroke', 'black')
		        .style("text-anchor", "start")
		        .text("Total");
			xax.append("text")
				.attr("y", 6)
				.attr("x", 5)
				.attr("dy", ".71em")
				.attr('stroke', 'black')
				.attr("transform", "rotate(90)")
		        .style("text-anchor", "start")
	   	        .text("Searches");
			xax.append("text")
				.attr("y", 6)
				.attr("x", 5 + h * 0.3)
				.attr("dy", ".71em")
				.attr('stroke', 'black')
				.attr("transform", "rotate(90)")
		        .style("text-anchor", "start")
		        .text("Items clicked");
			xax.append("text")
				.attr("y", 6)
				.attr("x", 5 + 2 * h * 0.3)
				.attr("dy", ".71em")
				.attr('stroke', 'black')
				.attr("transform", "rotate(90)")
		        .style("text-anchor", "start")
		        .text("Added to cart");
			svg.selectAll("rect")
				.data(dataset)
				.enter()
				.append("rect")
				.attr("transform", "translate(20,20)")
				.attr("y", function(d, i) {
					return i * (h * 0.9 - 20)/dataset.length + 1; 
				})
				.attr("x", function(d) {
					return 1;
				})
				.attr("height", (h * 0.9)/dataset.length - 10)
				.transition().delay(function (d,i) {
					return i * 100
				}).duration(200)
				.attr("width", function(d) {
					return y(d);
				})
				.attr("fill", "steelblue")
				.attr("fill-opacity", 1)
				.attr("class", "bar");
			svg.selectAll(".bar")
			   .data(dataset)
			   .enter()
			   .append("text")
			   .attr('font-size', '15px')
			   .text(function(d, i) {
				   return d +" " + labels[i];
			   })
			   .attr("y", function(d, i) {
				   return i * h * 0.9/ dataset.length + 21 + (h * 0.9 / dataset.length - 25)
			   })
			   .attr("x", function(d) {
				   return 25 + y(d);
			   });
			d3.select("#minimum")
				.append("h1")
				.attr("class", "stattext")
				.text(data[product].min)
			d3.select("#maximum")
				.append("h1")
				.attr("class", "stattext")
				.text(data[product].max)
			d3.select("#mean")
				.append("h1")
				.attr("class", "stattext")
				.text(data[product].mean)
			d3.select("#mode")
				.append("h1")
				.attr("class", "stattext")
				.text(data[product].mode)
			d3.select("#median")
				.append("h1")
				.attr("class", "stattext")
				.text(data[product].median)
			d3.select("#stddev")
				.append("h1")
				.attr("class", "stattext")
				.text(data[product].stddev.toPrecision(3))
		});	
	}
/**
 * Draws the Surface spotbuy data
 * @param start, start date
 * @param end, end date
 */
function surfacebargraph(htmlid, json, realm, start, end) {
	d3.select("#svg_" + json).remove();
	var height = document.getElementById(htmlid).offsetHeight - 26;
	var width = document.getElementById(htmlid).offsetWidth;
	d3.json('http://localhost:8080/surface/?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
		var color = d3.scaleOrdinal(d3.schemeCategory20b);
		dataset = []
		for(var propertyName in data[json]) {
			var newobj = {}
			 var name = propertyName;
			 var count = data[json][propertyName];
			 newobj.name = name;
			 newobj.count = count;
			 dataset.push(newobj);
		}
		var y = d3.scaleLinear()
			.range([height * 0.9, 0]);
		var x = d3.scaleLinear()
	    	.range([0, width * 0.7]);
		var xAxis = d3.axisBottom(x).ticks(0);
		var yAxis = d3.axisLeft(y);
		y.domain([0, d3.max(dataset, function(d) {return d.count * 1.5; })]);
		var svg = d3.select("#" + htmlid).append("svg")
			.attr("height", height)
			.attr("width", width)
			.attr("id", "svg_" + json)
		svg.append("g")
		    .attr("class", "x axis")
		    .attr("transform", "translate(50," + (height * 0.9 + 5) + ")")
		    .call(xAxis);
		svg.append("g")
		     .attr("class", "y axis")
		     .attr("transform", "translate(50,5)")
		     .call(yAxis)
		     .append("text")
		     .attr("transform", "rotate(-90)")
		     .attr("y", 6)
		     .attr("dy", ".71em")
		     .attr('stroke', 'black')
		     .style("text-anchor", "end")
		     .text(json);
		svg.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("class", "sbar")
			.attr("transform", "translate(50,5)")
			.attr("x", function(d, i) { 
		    	 return i * (width * 0.7)/dataset.length + 1; 
		      })
		     .attr('fill', function (d) {
		    	 return color(d.name);
		     })
//		     .attr("height", function(d) { return y(d.repeated); })
		     .attr("y", function(d) { return height * 0.9; })
		     .attr("width", (width *0.7)/dataset.length - 15)
		     .transition().attr("height", function(d) { return height * 0.9 - y(d.count); })
		     .attr("y", function(d) { return y(d.count); });
		svg.selectAll(".stext")
			.data(dataset)
			.enter()
			.append("text")
			.attr("class", "stext")
			.text(function(d) {
				return d.count;
			})
			.attr('font-size', '12px')
			.attr('x', function(d, i) {return 50 + i * (width * 0.7)/dataset.length + 1})
			.attr('y', function(d) {return y(d.count)});
		var legend = svg.append("g")
			.attr("class", "legend")
			.attr("transform", "translate(" + width * .45 + ",10)");
		legend.selectAll("rect")
			.data(dataset)
			.enter()
			.append("rect")
			.attr("height", 10)
			.attr("width", 10)
			.attr("y", function(d, i) {
				return i * 11;
			})
			.attr('fill', function (d) {
				return color(d.name);
			});
		legend.selectAll("text")
			.data(dataset)
			.enter()
			.append("text")
			.attr("y", function(d, i) {
				return i * 11 + 10;
			})
			.attr("x", 15)
			.text( function (d) {
				return d.name;
			})
	})
}
/**
 * Draws the keyword pie graphs as well as the most searched bar graph
 * @param start, start date
 * @param end, end date
 * @param svg1, svg2 are the two svg elements in the angular controller for the pie graphs
 */
    function commonKeywords(product, svg1, svg2, height, width, realm, start, end) {
	console.log("common key graph");
    	d3.selectAll(".center").remove();
  		 d3.selectAll("#sessions").remove();
  		 d3.selectAll(".show").remove();
  		 d3.selectAll(".show1").remove();
		var color = d3.scaleOrdinal(d3.schemeCategory20);
		function key (d) {
			return d.data['keyword'];
		}
		d3.json('http://localhost:8080/keyword/' + product + '?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
			data = data[product];
			var duration = 1000;
			var data0 = svg1.select(".slices").selectAll("path.slice").data().map(function(d) {
				return d.data;
			})
			var data1 = svg2.select(".slices").selectAll("path.slice").data().map(function(d) {
				return d.data;
			})
			if (data0.length == 0) data0 = data.added;
			if (data1.length == 0) data1 = data.notadded;
			var was = findcommon(data.added, data0);
			var is = findcommon(data0, data.added);
			var was1 = findcommon(data.notadded, data1);
			var is1 = findcommon(data1, data.notadded);
			var radius = width / 3;
			var arc = d3.arc()
				.outerRadius(radius * 0.7)
				.innerRadius(radius * 0.4);
			var outerArc = d3.arc()
				.innerRadius(radius * 0.7)
				.outerRadius(radius * 0.8);
			var pie = d3.pie().sort(null)
				.value(function(d) {
					return d["repeated"];
				})
			var slice = svg1.select(".slices").selectAll("path.slice")
				.data(pie(was), key)
			slice.enter()
				.insert("path")
				.attr('id', function(d) {
					return d.data['keyword'];
				})
				.attr('class', 'slice')
				.attr('opacity', 0.5)
				.attr('d', arc)
				.attr('fill', function(d, i) {
				    return color(i);
				  });
			slice = svg1.select(".slices").selectAll("path.slice")
				.data(pie(is), key);
			slice		
			.transition().duration(duration)
				.attrTween("d", function(d) {
				var interpolate = d3.interpolate(this._current, d);
				var _this = this;
				return function(t) {
					_this._current = interpolate(t);
					return arc(_this._current);
				};
			});
			slice = svg1.select(".slices").selectAll("path.slice")
				.data(pie(data.added), key)
				.on("mouseover", function(d) {
					d3.selectAll(".show1").remove();
					svg1.append("text")
					.attr('font-size', '25px')
					.attr('class', 'show1')
					.attr('text-anchor', 'middle')
					.attr('x', width / 2)
					.attr('y', height / 2)
					.text(d.data.repeated);
					console.log("data is "+d.data.repeated);
					svg1.append("text")
					.attr('font-size', '12px')
					.attr('class', 'show1')
					.attr('text-anchor', 'middle')
					.attr('x', width / 2)
					.attr('y', height / 2 + 10)
					.text(d.data.keyword);
				});
			slice.exit().transition().delay(duration).duration(0)
				.remove();
			
			var label = svg1.select(".labels").selectAll("text")
				.data(pie(was), key);
			function midAngle(d){
				return d.startAngle + (d.endAngle - d.startAngle)/2;
				}
			label.enter()
				.append("text")
				.attr("dy", ".35em")
				.attr('font-size', '10px')
				.attr('text-anchor', 'middle')
				.text(function(d) {
					return d.data['keyword'];
				})
				.each(function(d) {
					this._current = d;
				})
				label = svg1.select(".labels").selectAll("text")
					.data(pie(is), key);
				label.transition().duration(duration)
				.attrTween("transform", function(d) {
					var interpolate = d3.interpolate(this._current, d);
					var _this = this;
					return function(t) {
						var d2 = interpolate(t);
						_this._current = d2;
						var pos = outerArc.centroid(d2);
						pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
						return "translate("+ pos +")";
					};
				})
				.styleTween("text-anchor", function(d){
					var interpolate = d3.interpolate(this._current, d.data['keyword']);
					return function(t) {
						var d2 = interpolate(t);
						return midAngle(d2) < Math.PI ? "start":"end";
				};
			});
			label = svg1.select(".labels").selectAll("text")
				.data(pie(data.added), key);
			console.log("label "+data.added);
			label
				.exit().transition().delay(duration/2)
				.remove();
			var polyline = svg1.select(".lines").selectAll("polyline")
				.data(pie(was), key);
		
			polyline.enter()
				.append("polyline")
				.style("opacity", 0)
				.style("stroke", "black")  
				.style("fill", "none")
				.each(function(d) {
					this._current = d;
				});
				polyline = svg1.select(".lines").selectAll("polyline")
					.data(pie(is), key);
				polyline.transition().duration(duration)
				.style("opacity", function(d) {
					return d.data.value == 0 ? 0 : .5;
				})
				.attrTween("points", function(d){
					var interpolate = d3.interpolate(this._current, d);
					var _this = this;
					return function(t) {
						var d2 = interpolate(t);
						_this._current = d2;
						var pos = outerArc.centroid(d2);
						pos[0] = radius * 0.85 * (midAngle(d2) < Math.PI ? 1 : -1);
						return [arc.centroid(d2), outerArc.centroid(d2), pos];
					};			
				});;
				polyline = svg1.select(".lines").selectAll("polyline")
					.data(pie(data.added), key);
			
				polyline
					.exit().transition().delay(duration / 2)
					.remove();
				/*
				 * ************
				 * 
				 * 	draw second chart
				 * 
				 * ************
				 */
				var slice1 = svg2.select(".slices").selectAll("path.slice")
				.data(pie(was1), key)
			slice1.enter()
				.insert("path")
				.attr('id', function(d) {
					return d.data['keyword'];
				})
				.attr('class', 'slice')
				.attr('opacity', 0.5)
				.attr('d', arc)
				.attr('fill', function(d, i) {
				    return color(i);
				  });
			slice1 = svg2.select(".slices").selectAll("path.slice")
				.data(pie(is1), key);
			slice1		
			.transition().duration(duration)
				.attrTween("d", function(d) {
				var interpolate = d3.interpolate(this._current, d);
				var _this = this;
				return function(t) {
					_this._current = interpolate(t);
					return arc(_this._current);
				};
			});
			slice1 = svg2.select(".slices").selectAll("path.slice")
				.data(pie(data.notadded), key)
				.on("mouseover", function(d) {
					d3.selectAll(".show").remove();
					svg2.append("text")
					.attr('font-size', '25px')
					.attr('class', 'show')
					.attr('text-anchor', 'middle')
					.attr('x', width / 2)
					.attr('y', height / 2)
					.text(d.data.repeated);
					svg2.append("text")
					.attr('font-size', '12px')
					.attr('class', 'show')
					.attr('text-anchor', 'middle')
					.attr('x', width / 2)
					.attr('y', height / 2 + 10)
					.text(d.data.keyword);
				});;
			slice1.exit().transition().delay(duration).duration(0)
			.remove();
			
			var label1 = svg2.select(".labels").selectAll("text")
				.data(pie(was1), key);
			function midAngle(d){
				return d.startAngle + (d.endAngle - d.startAngle)/2;
				}
			label1.enter()
				.append("text")
				.attr("dy", ".35em")
				.attr('font-size', '10px')
				.attr('text-anchor', 'middle')
				.text(function(d) {
					return d.data['keyword'];
				})
				.each(function(d) {
					this._current = d;
				})
				label1 = svg2.select(".labels").selectAll("text")
					.data(pie(is1), key);
				label1.transition().duration(duration)
				.attrTween("transform", function(d) {
					var interpolate = d3.interpolate(this._current, d);
					var _this = this;
					return function(t) {
						var d2 = interpolate(t);
						_this._current = d2;
						var pos = outerArc.centroid(d2);
						pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
						return "translate("+ pos +")";
					};
				})
				.styleTween("text-anchor", function(d){
					var interpolate = d3.interpolate(this._current, d.data['keyword']);
					return function(t) {
						var d2 = interpolate(t);
						return midAngle(d2) < Math.PI ? "start":"end";
				};
			});
			label1 = svg2.select(".labels").selectAll("text")
				.data(pie(data.notadded), key);

			label1
				.exit().transition().delay(duration/2)
				.remove();
			var polyline1 = svg2.select(".lines").selectAll("polyline")
				.data(pie(was1), key);
		
			polyline1.enter()
				.append("polyline")
				.style("opacity", 0)
				.style("stroke", "black")  
				.style("fill", "none")
				.each(function(d) {
					this._current = d;
				});
				polyline1 = svg2.select(".lines").selectAll("polyline")
					.data(pie(is1), key);
				polyline1.transition().duration(duration)
				.style("opacity", function(d) {
					return d.data.value == 0 ? 0 : .5;
				})
				.attrTween("points", function(d){
					var interpolate = d3.interpolate(this._current, d);
					var _this = this;
					return function(t) {
						var d2 = interpolate(t);
						_this._current = d2;
						var pos = outerArc.centroid(d2);
						pos[0] = radius * 0.85 * (midAngle(d2) < Math.PI ? 1 : -1);
						return [arc.centroid(d2), outerArc.centroid(d2), pos];
					};			
				});;
				polyline1 = svg2.select(".lines").selectAll("polyline")
					.data(pie(data.notadded), key);
			
				polyline1
					.exit().transition().delay(duration / 2)
					.remove();
				var x = d3.scaleBand()
					.range([0, width * 2], .1);
				var y = d3.scaleLinear()
				    .range([height, 0]);
				y.domain([0, d3.max(data.allsearches, function(d) { return d.repeated*1.5; })])
				var xAxis = d3.axisBottom(x);
				var yAxis = d3.axisLeft(y);
				var svg3 = d3.select("#allkeywords").append("svg")
					.attr("height", 670)
					.attr("width", width * 2)
					.attr('class', 'barchart')
				svg3.append("g")
				    .attr("class", "x axis")
				    .attr("transform", "translate(50," + (height + 60) + ")")
				    .call(xAxis);
				svg3.append("g")
			      .attr("class", "y axis")
			      .attr("transform", "translate(50,60)")
			      .call(yAxis)
			      .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", ".71em")
			      .attr('stroke', 'black')
			      .style("text-anchor", "end")
			      .text("Searches");
				svg3.selectAll(".searchbar")
			      .data(data.allsearches)
			      .enter()
			      .append("rect")
			      .on('mouseover', function (d) {
			    	  svg3.selectAll("#a" + d.keyword.replace(/\s+/g, '').trim())
			    	  .attr('opacity', 1);
			      })
			      .on('mouseout', function(d) {
			    	  svg3.selectAll("#a" + d.keyword.replace(/\s+/g, '').trim())
			    	  .attr('opacity', 0);
			      })
			      .attr("transform", "translate(50,60)")
			      .attr('fill', 'orange')
			      .attr("class", "searchbar")
			      .attr("x", function(d, i) { 
			    	  return i * (width * 2 - 50)/data.allsearches.length + 1; 
			       })
//			      .attr("height", function(d) { return y(d.repeated); })
			      .attr("y", function(d) { return height; })
			      .attr("width", (width * 2 - 50)/data.allsearches.length - 15)
			      .transition().attr("height", function(d) { return height - y(d.repeated); })
			      .attr("y", function(d) { return y(d.repeated); });
			      svg3.selectAll(".searchtext")
			      .data(data.allsearches)
			      .enter()
			      .append("text")
			      .attr('class', "searchtext")
			      .attr('id', function(d) {
			    	  return "a" + d.keyword.replace(/\s+/g, '').trim();
			      })
			      .attr('opacity', 0)
			      .attr("x", function(d, i) { 
			    	  return i * (width * 2 - 50)/data.allsearches.length + 51; 
			       })
			       .attr("y", function(d) { return y(d.repeated) + 10; })
			      .text(function(d) {
			    	  return d.keyword;
			      })
			      svg3.selectAll(".searchtext2")
			      	.data(data.allsearches)
			      	.enter()
			      	.append("text")
			      	.attr('class', 'searchtext2')
			      	.attr('id', function(d) {
			      		return "a" + d.keyword.replace(/\s+/g, '').trim();
			      	})
			      	.attr('opacity', 0)
			      	.attr("x", function(d, i) { 
			    	  return i * (width * 2 - 50)/data.allsearches.length + 51; 
			      	})
			      	.attr("y", function(d) { return y(d.repeated) + 35; })
			      	.text(function(d) {
			    	  return d.repeated;
			      	})
		})
		d3.json('http://localhost:8080/user/' + product + '?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
		var active = data[product].keyword.split(",");
		var num = data[product].num;
		d3.select("#mostactive")
			.append("h1")
			.attr("class", "keywords")
			.attr("class", "center")
			.text(active[0]);
		d3.select("#mostactive")
			.append("p")
			.attr("class", "keywords")
			.attr('id', 'sessions')
			.attr('font-size', '12px')
			.text(active[1] + " unique sessions");
		d3.select("#numberofusers")
			.append("h1")
			.attr("class", "keywords")
			.attr("class", "center")
			.text(num)
		})
	}
    /**
     * Draws the Clickstream sunburst partition
     * @param start, start date
     * @param end, end date
     */
    function clickstream(realm, start, end) {
    	d3.select('#trail').remove();
   		d3.select('#clickstreamsvg').remove();
		var colors = {
				  "Cart": "steelblue",
				  "Item": "#74AFAD",
				  "Search": "orange",
				  "End": "#bbbbbb",
				};
		var cswidth = document.getElementById("Clickstream").offsetWidth;
		var csheight = document.getElementById("Clickstream").offsetHeight - 26;
		var rad = Math.min(cswidth,csheight) / 2;
		var totalSize = 0;
		d3.json('http://localhost:8080/clickstream/?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
			initializeBreadcrumbTrail();
			var vis = d3.select("#Clickstream").append("svg:svg")
				.attr("width", cswidth)
				.attr("height", csheight)
				.attr('id', 'clickstreamsvg')
				.append("svg:g")
				.attr("id", "container")
				.attr("transform", "translate(" + cswidth /  2 + "," + csheight / 2 + ")");
			d3.select('#clickstreamsvg').append("text")
						.attr('id', 'percentage')
						.attr('text-anchor', 'middle')
						.attr('x', cswidth / 2)
						.attr('y', csheight / 2)
						.attr('fill', '#555')
						.style('visibility', 'hidden');
			d3.select('#clickstreamsvg').append("text")
				.attr('id', 'explanation')
				.attr('text-anchor', 'middle')
				.attr('x', cswidth / 2)
				.attr('y', csheight/ 2 + 10)
				.attr('fill', '#555')
				.style('visibility', 'hidden')
			var partition = d3.partition().size([360, rad / 1.2]).padding(0);
			var root = d3.hierarchy(data.root)
		    .sum(function(d) { 			
				return d.count;
			})
			.sort(null);
			root.descendants().filter(function(d) {
				return (d.x1 - d.x0) > 2;
			});
			partition(root);
			var xScale = d3.scaleLinear()
		    	.domain([0, rad])
		    	.range([0, Math.PI * 2])
		    	.clamp(true);
			var csarc = d3.arc()
					.startAngle(function(d) {
						return xScale(d.x0);
					})
					.endAngle(function(d) {
						return xScale(d.x1);
					})
					.innerRadius(function(d) {
						return d.y0;
					})
					.outerRadius(function(d) {
						return d.y1;
					});
			vis.append("svg:circle")
				.attr("r", rad)
				.style("opacity", 0);
			
			var path = vis.selectAll("path")
				.data(root.descendants())
				.enter()
				.append("path")
				.attr("display", function(d) {
					return d.depth ? null : "none";
				})
				.attr('class', 'cs')
				.attr("d", csarc)
				.attr('stroke', '#fff')
				.attr("fill-rule", "evenodd")
				.style("fill", function(d) {
					return colors[d.data.name];
				})
				.style("opacity", 1)
				.each(function(d) { this._current = d; })
				.on("mouseover", function (d) {
					var percent = (100 * d.value / totalSize).toPrecision(3);
					var percentageString = percent + "%";
					  if (percent < 0.01) {
					    percentageString = "< 0.01%";
					  }
					  d3.select('#percentage')
					  .style("visibility", "")
				      .text(percentageString);

					  d3.select("#explanation")
				      .style("visibility", "")
				      .text('of sessions (' + d.value  + ') began with this sequence of pages');
					  var sequenceArray = reverse(d.ancestors());
					  sequenceArray.shift();
					  updateBreadcrumbs(sequenceArray, percentageString);

					  // Fade all the segments.
					  d3.selectAll(".cs")
					      .style("opacity", 0.3);
					  // Then highlight only those that are an ancestor of the current segment.
					  vis.selectAll("path")
					      .filter(function(node) {
					                return (sequenceArray.indexOf(node) >= 0);
					       })
					      .style("opacity", 1);
				});
			d3.select("#container").on("mouseleave", function (d) {
				// Hide the breadcrumb trail
				  d3.select("#trail")
				      .style("visibility", "hidden");

				  // Deactivate all segments during transition.
				  d3.selectAll(".cs").on("mouseover", null);

				  // Transition each segment to full opacity and then reactivate it.
				  d3.selectAll(".cs")
				      .transition()
				      .duration(500)
				      .style("opacity", 1)
				      .each(function() {
				              d3.select(this).on("mouseover", function(d) {
				      				var percent = (100 * d.value / totalSize).toPrecision(3);
				      				var percentageString = percent + "%";
				      				  if (percent < 0.5) {
				      				    percentageString = "< 0.5%";
				      				  }
				      				  d3.select("#percentage")
				      				  .style('visibility', "visible")
				  			          .text(percentageString);

				      			      d3.select("#explanation")
				  			          .style("visibility", "visible")
				  			          .text('of sessions (' + d.value  + ') began with this sequence of pages');
				      				  var sequenceArray = reverse(d.ancestors());
				      				  sequenceArray.shift();
				      				  updateBreadcrumbs(sequenceArray, percentageString);

				      				  // Fade all the segments.
				      				  d3.selectAll(".cs")
				      				      .style("opacity", 0.3);

				      				  // Then highlight only those that are an ancestor of the current segment.
				      				  vis.selectAll("path")
				      				      .filter(function(node) {
				      				                return (sequenceArray.indexOf(node) >= 0);
				      				       })
				      				      .style("opacity", 1);
				              });
				       });
				  d3.select("#explanation")
			      	.style("visibility", "hidden");
				  d3.select("#percentage")
			      	.style("visibility", "hidden");
			});
			totalSize = path.node().__data__.value;
		})
		function initializeBreadcrumbTrail() {
			  // Add the svg area.
			  var trail = d3.select("#Clickstream").append("svg:svg")
			      .attr("width", cswidth)
			      .attr("height", 50)
			      .attr("id", "trail");
			  // Add the label at the end, for the percentage.
			  trail.append("svg:text")
			    .attr("id", "endlabel")
			    .style("fill", "#000");
		}
		var b = {
				w: 75, h: 30, s: 3, t: 10
				// Breadcrumb dimensions: width, height, spacing, width of tip/tail.
		};
		function breadcrumbPoints(d, i) {
			  var points = [];
			  points.push("0,0");
			  points.push(b.w + ",0");
			  points.push(b.w + b.t + "," + (b.h / 2));
			  points.push(b.w + "," + b.h);
			  points.push("0," + b.h);
			  if (i > 0) { // Leftmost breadcrumb; don't include 6th vertex.
			    points.push(b.t + "," + (b.h / 2));
			  }
			  return points.join(" ");
			}
		function updateBreadcrumbs(nodeArray, percentageString) {
			  // Data join; key function combines name and depth (= position in sequence).
			  var g = d3.select("#trail")
			      .selectAll("g")
			      .data(nodeArray, function(d) {
			    	  return d.data.name + d.depth;
			      });

			  // Add breadcrumb and label for entering nodes.
			  var entering = g.enter().append("svg:g").attr("transform", function(d, i) {
				    return "translate(" + i * (b.w + b.s) + ", 0)";
				  });

			  entering.append("svg:polygon")
			      .attr("points", breadcrumbPoints)
			      .style("fill", function(d) { return colors[d.data.name]; });

			  entering.append("svg:text")
			      .attr("x", (b.w + b.t) / 2)
			      .attr("y", b.h / 2)
			      .attr("dy", "0.35em")
			      .attr("text-anchor", "middle")
			      .style('fill', 'white')
			      .text(function(d) { return d.data.name; });



			  // Remove exiting nodes.
			  g.exit().remove();

			  // Now move and update the percentage at the end.
			  d3.select("#trail").select("#endlabel")
			      .attr("x", (nodeArray.length + 0.5) * (b.w + b.s))
			      .attr("y", b.h / 2)
			      .attr("dy", "0.35em")
			      .attr("text-anchor", "middle")
			      .text(percentageString);

			  // Make the breadcrumb trail visible, if it's hidden.
			  d3.select("#trail")
			      .style("visibility", "");

			}

	}
    /**
     * Draws the Pie chart for purchases by category
     * @param start, start date
     * @param end, end date
     */
    function categorytree(product, realm, start, end) {
    	var color = d3.scaleOrdinal(d3.schemeCategory20c);
    	d3.select("#categorytree").remove();
    	var width = document.getElementById("tree").offsetWidth;
		var height = document.getElementById("tree").offsetHeight - 26;
		var rad = Math.min(width,height) / 2.5;
		var arc = d3.arc().innerRadius(0).outerRadius(rad);
		var pie = d3.pie()
		  .value(function(d) { return d.items.length; })
		  .sort(null);
		d3.json('http://localhost:8080/category/' + product + '?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
		var vis = d3.select("#tree").append("svg:svg")
			.attr("width", width)
			.attr("height", height)
			.attr('id', 'categorytree')
			.append("svg:g")
			.attr("id", "categorycontainer")
			.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
		d3.select('#categorytree').append("text")
			.attr('id', 'categorytext')
			.attr('text-anchor', 'middle')
			.attr('x', width / 2)
			.attr('y', height / 2)
			.attr('fill', '#555')
			.style('visibility', 'hidden');
		d3.select('#categorytree').append("text")
			.attr('id', 'categorycount')
			.attr('text-anchor', 'middle')
			.attr('x', width / 2)
			.attr('y', height/ 2 + 10)
			.attr('fill', '#555')
			.style('visibility', 'hidden')
		var path = vis.selectAll('path')
			.data(pie(data))
			.enter()
			.append('path')
			.attr('d', arc)
			.attr('class', 'slice')
			.attr('opacity', 0.7)
			.attr('fill', function(d, i) {
			    return color(d.data.name);
			}).on('mouseover', function(d) {
				d3.select("#categorytext").style("visibility", "visible").text(d.data.name);
				d3.select("#categorycount").style("visibility", "visible").text(d.data.items.length);
			}).on('mouseleave', function(d) {
				d3.select("#categorytext").style("visibility", "hidden")
				d3.select("#categorycount").style("visibility", "hidden")
			});
			
	  })
    }
    /**
     * Draws the line chart for user data
     * @param start, start date
     * @param end, end date
     */
    function linegraph(product, realm, start, end) {
    	var color = (product === 'spotbuy') ? ('orange') : ('steelblue')
    	d3.selectAll("#linegraph").remove();
    	var width = document.getElementById("userstime").offsetWidth;
		var height = document.getElementById("userstime").offsetHeight - 26;
    	d3.json('http://localhost:8080/user/'+product+'?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
			var svg = d3.select("#userstime").append("svg")
				.attr("height", height)
				.attr("width", width)
				.attr('id', 'linegraph')
			var x = d3.scaleTime()
				.range([0, width * 0.9]);
			var y = d3.scaleLinear()
		    	.range([height * 0.9, 0]);
			var xAxis = d3.axisBottom(x);
			var yAxis = d3.axisLeft(y);
			y.domain([0, d3.max(data[product].days, function(d) { return d.num * 1.3; })])
			x.domain(d3.extent(data[product].days, function(d) { 
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
			   .datum(data[product].days)
			   .attr("class", "line")
			   .attr("stroke", color)
			   .attr("transform", "translate(50,10)")
			   .attr("d", line);
		    var point = svg.append("g")
		    	.attr("class", "line-point")
		    	.attr("transform", "translate(50,10)");
		    point.selectAll('circle')
			    .data(data[product].days)
			    .enter().append('circle')
			    .attr("cx", function(d) { return x(d.date) })
			    .attr("cy", function(d) { return y(d.num) })
			    .attr("r", 3.5)
			    .style("fill", "white")
			    .style("stroke", color)
		    point.selectAll(".number")
		    	.data(data[product].days)
		    	.enter()
		    	.append("text")
		    	.attr("class", "number")
		    	.text(function(d) {
		    		return d.num;
		    	}) 
		    	.attr("x", function(d) {
		    		return x(d.date) + 5;
		    	})
		    	.attr("y", function(d) {
		    		return y(d.num)
		    	})
		    	.attr("font-size", "10px")
		    point.selectAll(".date")
		    	.data(data[product].days)
		    	.enter()
		    	.append("text")
		    	.attr("class", "date")
		    	.text(function(d) {
		    		return d.date.toString().substring(4,11);
		    	}) 
		    	.attr("x", function(d) {
		    		return x(d.date) + 5;
		    	})
		    	.attr("y", function(d) {
		    		return y(d.num) - 12;
		    	})
		    	.attr("font-size", "10px")
		    var curtain = svg.append('rect')
		    	.attr("transform", "translate(50,10)")
			    .attr('x', 1)
			    .attr('y', 0)
			    .attr('height', height* 0.9)
			    .attr('width', width* 0.95)
			    .attr('class', 'curtain')
			    .style('fill', '#ffffff')
			  svg.transition()
			    .duration(6000)
			    .select('.curtain')
			    .attr('x', width * 0.95)
			    .attr('width', 0);
    	})
    }
    /**
     * shows all the search stats
     * NOTE: NOT USED (see newgraph)
     * @param start, start date
     * @param end, end date
     */
    function searchstats(product, realm, start, end) {
    	var height = document.getElementById("searchstats").offsetHeight - 26;
    	var width = document.getElementById("searchstats").offsetWidth;
    	d3.json('http://localhost:8080/count/' + product + '/?realm=' + realm + '&startdate=' + start + '&enddate=' + end, function(data) {
    		dataset = []
    		var max = 0;
    		for (var propertyName in data[product].map) {
    			newobj = {}
    			newobj.label = propertyName;
    			if (parseInt(propertyName) > max) {
    				max = parseInt(propertyName);
    			}
    			newobj.count = data[product].map[propertyName];
    			dataset.push(newobj);
    		}
    		console.log(max)
    		var svg = d3.select("#searchstats").append("svg")
    			.attr("height", height)
    			.attr("width", width)
    			.attr("id", "searchstatsvg");
    		var y = d3.scaleLinear().range([height*0.6, 0]).domain([0, d3.max(dataset, function(d) {
	    		return d.count;
	    	})]);
    		var x = d3.scaleLinear()
		    	.range([0, width * 0.9])
		    	.domain([0,max])
		    	
    		var xAxis = d3.axisBottom(x);
    		var yAxis = d3.axisLeft(y);
    		svg.append("g")
		      .attr("class", "xaxis")
		      .attr("transform", "translate(50," + (height *0.6 + 50) + ")")
		      .call(xAxis);
    		svg.append("g")
		      .attr("class", "yaxis")
		      .attr("transform", "translate(50, 50)")
		      .call(yAxis)
    		svg.selectAll("rect")
    			.data(dataset)
    			.enter()
    			.append("rect")
    			.attr("transform", "translate(50,50)")
			    .attr('fill', 'orange')
			    .attr("x", function(d, i) { 
			     return i * (width * 0.9)/dataset.length + 1; 
			     })
//			    .attr("height", function(d) { return y(d.repeated); })
			    .attr("y", function(d) { return height * 0.6; })
			    .attr("width", (width * 0.9)/dataset.length -1)
			    .transition().attr("height", function(d) { return height * 0.6 - y(d.count); })
			    .attr("y", function(d) { return y(d.count); });
    		svg.append("text")
    			.text("Minimum")
    		svg.append("text")
    			.text(data[product].min)
    	})
    }
    /**
     * Find common data for before and after for keyword update
     * @param first
     * @param second
     */
	function findcommon(first, second){
		var secondSet = d3.set(); 
		second.forEach(function(d) { secondSet.add(d['keyword']); });
		var onlyFirst = first
			.filter(function(d){ return !secondSet.has(d['keyword']) })
			.map(function(d) { return {keyword: d["keyword"], repeated: 0}; });
		return d3.merge([ second, onlyFirst ])
			.sort(function(a,b) {
				return d3.ascending(a.keyword, b.keyword);
			});
	}
	/**
	 * reverse a javascript array
	 * @param array
	 */
	function reverse(array) {
		  var first = null;
		  var last = null;
		  var tmp = null;
		  var length = array.length;

		  for (first = 0, last = length - 1; first < length / 2; first++, last--) {
		    tmp = array[first];
		    array[first] = array[last];
		    array[last] = tmp;
		  }
		  return array;
	}