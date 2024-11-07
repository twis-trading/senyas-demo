//var dataSet = [

//];
$(document).ready(function () {
var table = $('#dt-select').DataTable({
//data: dataSet,
columns: [{
title: "Name"
},
{
title: "Gender"
},
{
title: "Address"
},
{
title: "Contact Number"
},
{
title: "Email"
},
{
title: "Status"
}
],

dom: 'Bfrtip',
select: true,
buttons: [{
text: 'Edit Details',
action: function () {
//table.rows().select();
}
},
{
text: 'Delete',
action: function () {
//table.rows().deselect();
}
}
]
});
});

//var dataSet = [

//];
$(document).ready(function () {
var table = $('#teacher-dt-select').DataTable({
//data: dataSet,
columns: [{
title: "Name"
},
{
title: "Gender"
},
{
title: "Address"
},
{
title: "Contact Number"
},
{
title: "Grade"
},
{
title: "Section"
}
],

dom: 'Bfrtip',
select: true,
buttons: [{
text: 'Edit Details',
action: function () {
//table.rows().select();
}
},
{
text: 'Delete',
action: function () {
//table.rows().deselect();
}
}
]
});
});

//var dataSet = [

//];
$(document).ready(function () {
var table = $('#student-dt-select').DataTable({
//data: dataSet,
columns: [{
title: "Name"
},
{
title: "Quiz 1"
},
{
title: "Quiz 2"
},
{
title: "Quiz 3"
},
{
title: "Quiz 4"
},
{
title: "Quiz 5"
},
{
title: "Quiz 6"
},
{
title: "Quiz 7"
},
{
title: "Quiz 8"
},
{
title: "Quiz 9"
},
{
title: "Quiz 10"
},
{
title: "Average"
}
],

dom: 'Bfrtip',
select: true,
buttons: [{
text: 'Edit Details',
action: function () {
//table.rows().select();
}
},
{
text: 'Delete',
action: function () {
//table.rows().deselect();
}
}
]
});
});
