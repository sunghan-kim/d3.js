/**
 * 
 */

// # 1. 설치
d3.select("body").append("div").text("새로운 문장");

var data = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

// # 2. 사용법
// 돔 만들기 : selectAll(), data(), enter()
d3.select("body")		// index.html에서 선언한 body 문서 요소 선택
  .selectAll("div")		// 가상의 문서요소
  .data(data)			// 가상의 문서요소에 데이터 바인딩
  .enter()				// data 배열의 각 요소를 순회하면서 가상의 문서요소 div 10개를 만듬
  .append("div")		// 가상의 문서요소를 body 문서 하위로 추가
  // # 3. 막대 그래프
  // # 3.1 style() : 문서 요소의 스타일 속성 변경
  .style("height", function (d) {  // height : 막대 높이 설정
	  // 콜백함수 : enter()를 통해 생성된 각 문서요소를 반환하는 콜백함수
	  // 변수 d를 이용해 실제 데이터에 접근 가능
	  return d + "px";
  })
  .style("width", function (d) { // width : 막대 너비 설정
	  return "20px";
  })
  // # 3.2 attr() : 문서 요소의 속성 설정
  .attr("class", "bar-chart");

// # 4. SVG
// HTML에 그림을 그릴 때, 디비전(div)보다 SVG가 더 적합
// SVG : 이차원 벡터 이미지를 그리기 위한 웹 표준
// DIV와 달리 SVG는 x, y 좌표값을 설정
// - y : 브라우저 좌측 상단이 0,0 좌표 -> y 좌표는 값이 늘어남에 따라 브라우저 아래를 가리킴 (그래서 y 좌표  설정 시 전체 높이에서 데이터를 뺀 값 사용)
// - x : 너비는 그래프 전체 너비를 데이터 갯수로 나누고 간격을 위해 1을 뺀다.
// fill 속성을 통해 색상 설정
var w = 200, h = 100;
var svg = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h);

svg.selectAll("rect") 	// 가상의 문서요소 선택
   .data(data)			// 데이터 배열과 문서 요소 바인딩
   .enter()				// 문서요소 생성
   .append("rect")		// svg 엘레멘트 하위 요소로 가상의 문서요소 추가
   .attr("x", function (d, i) { // x 좌표 설정
	   return i * (w / data.length);
   })
   .attr("y", function(d) {		// y 좌표 설정
	   return h - d;
   })
   .attr("width", w / data.length - 1) 	// 너비 설정
   .attr("height", function (d) {		// 높이 설정
	   return d;
   })	
   .attr("fill", function (d) {			// 색상 설정
	   return "hotpink";
   });

// # 5. 레이블
// 막대 끝에 레이블 추가
svg.selectAll("text")
   .data(data)
   .enter()
   .append("text")
   .text( function (d) {
	   return d;
   })
   .attr("x", function (d, i) { // x 좌표 : 각 막대의 가운데 좌표 지정
	   return i * (w / data.length) + (w / data.length) / 2;
   })
   .attr("y", function (d) { 	// y 좌표 : 각 막대 맨 꼭대기 위치에서 10px 아래로 이동
	   return h - d + 10;
   })
   .attr("font-family", "sans-serif")
   .attr("font-size", "11px")
   .attr("fill", "black")
   .attr("text-anchor", "middle"); // 텍스트를 정확히 가운데에 위치