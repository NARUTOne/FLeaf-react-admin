/*
  blood chart created base on D3JS V4 by NARUTOne
*/
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import  * as d3 from 'd3'

class Chart extends Component {
  constructor(config) {
    super();
    this.config = config;
    this.container = config.container;
    this.data = config.data;
    this.options = {
      isClickBlood: false
    };

    this.options = Object.assign(this.options, config.options);

    if(this.data.nodes.length == 0) return

    this.width = this.options.width || this.container.clientWidth || 960;
    this.height = this.options.height || this.container.clientHeight || 500;

    this.init(this.data);
  }

  init(data) {
    const _this = this;

    const {nodes, links} = data;
    const W = this.width;
    const H = this.height;
    const container = this.container;

    const nodes_num = nodes.length;
    const S_wh = W * H;
    const PI = Math.PI;

    const R = Math.ceil(Math.sqrt(S_wh / ( 6 * PI * nodes_num)));
    const maxR = R < 6 ? 6 : R;
    const minR = Math.ceil(maxR / 3);

    var p = 10,
    rDomain = d3.scaleLinear()
    .domain([1, 3])
    .range([minR, maxR]),
    X = d3.scaleLinear().domain([0, 1]).range([p,  W- p]), //(2) 定义x和y比例尺  , 网格大小
    Y = d3.scaleLinear().domain([0, 1]).range([p, H - p]);  

    const COLORS = ['#33a9dd', '#35addc', '#98de91', '#eeac2c'];
    const ACTIVE_COLOR = '#e12723'
   
    d3.select(this.container).html('');

    function zoom() {
      svg_center.attr("transform", "translate(" + d3.event.transform.x + ',' + d3.event.transform.y + ")" +  
      "scale(" + d3.event.transform.k + ")");
    }

    const zoomListener = d3.zoom()
      .scaleExtent([0.2, 3])
      .on("zoom", zoom); 

     // 布局
    let force =  d3.forceSimulation(nodes)
      .alphaDecay(0.1)
      .force("link", d3.forceLink(links).distance(maxR * 4))
      .force("charge", d3.forceManyBody().strength(- maxR * 3))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide().radius(function(d) { return d.r*2; }).iterations(2));      

    function dragstarted(d) {
      if (!d3.event.active) force.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    
    function dragended(d) {
      if (!d3.event.active) force.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    let svg = d3.select(this.container)
      .append("svg")
			.attr("width", W)
			.attr("height", H)
			.attr("id","force-svg");
      // .call(zoomListener).on('dblclick.zoom', null);

    // 自定义提示框
    let tip = d3.select(this.container)
      .append("div")
      .attr('class','tooltips');

    // 箭头
    const arrow_path = 'M2,2 L6,4 L2,6 L4,4 L2,2';
    let defs = svg.append('defs')
    let arrowMarker = defs.append('marker')
      .attr("id","arrow")
      .attr("markerUnits","strokeWidth")
      .attr("markerWidth","10")
      .attr("markerHeight","10")
      .attr("viewBox","0 0 12 12")
      .attr("refX","6")
      .attr("refY","4")
      .attr("orient","auto");

    arrowMarker.append('path')
      .attr('d',arrow_path)
      .attr('fill','#666');

    const svg_center = svg.append("g")
      .attr('id','svg-center')
      .attr("transform", "translate(0, 0)scale(" + 1 + ")" );

     //背景网格线
    // var grid = svg_center
    //     .selectAll('.axis')
    //     .data(X.ticks(50))
    //     .enter()
    //     .append("g")
    //     .attr("class", "x axis");

    // grid.append("line")
    //     .attr("x1", X)
    //     .attr("y1", p)
    //     .attr("x2", X)
    //     .attr("y2", H - p - 1);

    // grid.append("line")
    //     .attr("x1", p)
    //     .attr("y1", Y)
    //     .attr("x2",  W - p + 1)
    //     .attr("y2", Y);
        
     // links
    
    const g_paths = svg_center.append("g")
      .attr("class", "paths");
    
    let g_path = g_paths.selectAll('.g-path')
      .data(links)
      .enter()
      .insert('g')
      .attr('class', d=> {
        let className = 'g-path'
        return className
      })

    let line_path = g_path.insert("path")
      // .style("stroke",function(d, i) {
      //   return '#ccc'
      // })
      .attr("class", "link")
      .classed('link-hide', d => !!d.ishide)
      .attr("id", function(d,i) { return "link"+i })
      .style("stroke-width", 2 )
      // .attr("fill","transparent")
      .attr("marker-end","url(#arrow)");

    let g_line = g_path.append('g')
      .attr('class','g-line');

    var link_text = g_line.append("text")
      .attr("class","line-text")
      .attr("x", d => {
        return maxR
      })
      .attr("y",d => {
        const y = Math.abs(d.source.y - d.target.y)
        return 10
      })
      .attr("font-size", '1.2em')
      .style("fill", function(d,i) { return d.color= "#666"; });

    link_text.append("textPath")
      .attr("xlink:href",function(d,i){ return "#link"+i})
      .text(function(d){
        return d.relation;
      });     
    
    // nodes
    let g_nodes =  svg_center.append("g")
      .attr("class", "g-nodes");

    let g_node = g_nodes.selectAll('.g-node')
      .data(nodes)
      .enter()
      .insert('g')
      .attr('class', d=> {
        let className = 'g-node'
        return className
      })
      .style(
        'cursor', 'pointer'
      )
      .on('mouseover',function(d) {
        tip.html(function() {
          return d.type + ' : ' +d.name
        })
        .style("left", (d3.mouse(container)[0]+20) + "px")
        .style("top", (d3.mouse(container)[1]+20) + "px")
        .style("display","block");

        highlightConnected(d);
      })
      .on("mousemove",function(){
        tip.style("left", (d3.mouse(container)[0]+20) + "px")
          .style("top", (d3.mouse(container)[1]+20) + "px");
      })
      .on('mouseout',function() {
        tip.style("display","none");

        g_node.style('opacity', 1);
        g_path.style('opacity', 1);

      })
      .on("dblclick", function(d) {
        _this.config.onNodeClick && _this.config.onNodeClick(d);
      })
      .on("click", function(d) {
        if(!_this.options.isClickBlood) return false;
        _this.config.onBloodClick && _this.config.onBloodClick(d);
      })
      .call(d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended));

    var svg_nodes = g_node.append('circle')
      .attr("class", "node-circle")
      .attr("r", function(d){
        d.r = rDomain(1);
        switch(d.type) {
          case 'db': 
            d.r = rDomain(3);
            break;
          case 'table': 
            d.r = rDomain(2);
            break;
          default: 
            d.r = rDomain(1);
        }

        return d.r
      })
      .attr("stroke-width",2)
      .style("stroke", function(d,i) {
        if(d.isActive) return '#fff';
        
        let color = d.type == 'table' ? COLORS[1] : '#fff'
        return color
      })
      .style("fill", function(d){
        if(d.isActive){
          return ACTIVE_COLOR;
        } 

        let color = COLORS[0]
        switch(d.type) {
          case 'db': 
            color = COLORS[1];
            break;
          case 'table': 
            color = COLORS[2];
            break;
          default: 
            color = COLORS[3];
        }
        return color
      });

    var node_text =g_node.append("text")
      .style(
        "fill", "#fff"
      )
      .attr("font-size", '1.2em')
      .attr("font-family","simsun")
      .attr('font-weight', 'bold')
      .attr("stroke-width",0)
      .attr("x",function(d){
        const text_length = d.name.length;
        const text_x_length = parseInt(d.r * 2 / 8);

        const len = text_x_length < text_length ? text_x_length : text_length;

        return 1 - (len * 4)
      })
      .attr("y", 2)
      .text(function(d){
        return  _this.textShow(d, d.name)
      });

    // 运动布局
    force.on("tick", function(){  //对于每一个时间间隔
      //限制结点的边界
      nodes.forEach(function(d,i){
        d.x = d.x - d.r < 0  ? d.r : d.x ;
        d.x = d.x + d.r >  W ?  W - d.r : d.x ;
        d.y = d.y - d.r < 0 ? d.r : d.y ;
        d.y = d.y + d.r + d.r >  H ?  H - d.r - d.r : d.y ;
      });
      //②
      // 节点
      g_node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

      //连线
      line_path.attr("d", function(d){
        return linkArc(d);
      });
    });
    // 连线 path
    function linkArc(d) {
      var dx = d.target.x - d.source.x,
          dy = d.target.y - d.source.y,
          dr = Math.sqrt(dx * dx + dy * dy);
      var s_r = d.source.r
      var t_r = d.target.r
      var arrowLength = dr - (s_r + t_r);// 线长度
      var startPoint = alongPath(d.source, s_r),
          endPoint = alongPath(d.target, - t_r);
      function alongPath(from, distance) { // 对应比例
        return {
          x: from.x + dx * distance / dr,
          y: from.y + dy * distance / dr 
        }
      }

      var path = null;
     
      if(!dx) {
        path = "M" + (d.source.x + s_r) + " " + d.source.y + 
        ' A' + s_r + ' ' + (s_r * 3) +', 0, 0, 0, ' + (d.target.x - t_r) + ' ' + d.target.y; 
      }
      else {
        path = "M" + (startPoint.x) + " " + (startPoint.y) + " A" + dr + " " + dr + ", 0, 0, 1, " + (endPoint.x )+ " " + (endPoint.y);
        // path = "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
      }
    
      return path ;
    }
    
    // 连接高亮
    function highlightConnected(sd) {
      const filterNodes = getTargetNodes(sd)
      const ids = filterNodes.map(item => item.nodeId)

      g_node.style('opacity', d => {
        if(d.nodeId == sd.nodeId) return 1

        return ids.indexOf(d.nodeId) < 0 ? 0.2 : 1
      })

      g_path.style('opacity', d => {
        if(d.source.nodeId == sd.nodeId || d.target.nodeId == sd.nodeId) {
          return 1
        }
        else {
          return 0.2
        }
      })
    }

    function getTargetNodes(source) {
      const tarr = links.filter(item => {
        return item.source.nodeId == source.nodeId 
      }).map(item => item.target)
      
      const sarr = links.filter(item => {
        return item.target.nodeId == source.nodeId 
      }).map(item => item.source)

      return [].concat(tarr, sarr)
    }

  }

  // 截取字符串显示
  textShow(d, str) {
    const num = parseInt(d.r * 2 / 8)
    let len = str.length, charCode = -1, result = []
    let long = 0
    for (var i = 0; i < len; i++) {
      charCode = str.charCodeAt(i);
      if ((charCode >= 0 && charCode <= 128) || /^((?=[\x21-\x7e]+)[^A-Za-z0-9]){1}$/.test(i)) {
        result.push(str.charAt(i))
        long ++
        if(long >= num) {
          break
        }
      }
      else{
        result.push(str.charAt(i))
        long += 2
        if(long >= num) {
          break
        }
      }
    }
    return result.join('')
  }

}

Chart.PropTypes = {
  container: PropTypes.object,
  data: PropTypes.object,
  onNodeClick: PropTypes.func,
}

export default Chart
