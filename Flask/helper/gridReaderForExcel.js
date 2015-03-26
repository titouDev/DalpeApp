var grid = Ext.get('employesGrid');
function getHeaders(grid){
  var width,
      name,
      headers = {},
      count=0;
  
  Ext.each(grid.dom.querySelectorAll(".x-column-header-text"), function(i){
    headers[count]={
      width : Ext.get(i.parentNode).getWidth(),
      name : i.innerHTML
    };
    count++;
  });
  return headers;
};

function getRows(grid, headers){
  var rows=[],
      row = {},
      count = 0,
      nbOfHeaders = Ext.Object.getKeys(headers).length;
  Ext.each(grid.dom.querySelectorAll(".x-grid-cell-inner"), function(i){
    row[headers[count].name] = i.innerHTML;
    count++;
    if (count === nbOfHeaders) {
      count = 0;
      rows.push(Ext.Object.merge({}, row));
    }
    
  });
  return rows;
};

var headers = getHeaders(grid);
var rows = getRows(grid, headers);
Ext.encode({headers:headers, rows:rows});