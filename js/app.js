
var globeNextStudentIdentity = 0;

var Student = function(name){
    this.name = name;
    this.attendance = [];
    this.identity = globeNextStudentIdentity;
    globeNextStudentIdentity++;

};
Student.prototype.countAttendance = function(){
    var count=0;
    for (var countI = 0; countI < this.attendance.length; countI++) {
        if(this.attendance[countI])
            count++;
    };
    return count;
}

var model = {
    students: [],

    init: function(){
        this.students = [new Student("Slappy the Frog"),
            new Student("Lilly the Lizard"),
            new Student("Paulrus the Walrus"),
            new Student("Gregory the Goat"),
            new Student("Adam the Anaconda")
        ];

        for (var i = 0; i < this.students.length; i++) {
            for (var j = 0; j <= 11; j++) {
                this.students[i].attendance.push(this.getRandom());
        };};
    },

    getRandom: function getRandom() {
            return (Math.random() >= 0.5);
    },


    updateCheckbox: function(student, j, checked){
        student.attendance[j] = checked;
    }
}

var octopus = {

    init: function(){
        model.init();
        view.init();
    },

    getStudents: function(){
        return model.students;
    },

    updateCheckbox: function(student, j, checked){
        model.updateCheckbox(student, j, checked);
        view.render(model.students);
    }

};

var view = {

    init: function() {
        var students = octopus.getStudents();
        this.render(students);

    },
    render: function(students) {
        $('.data').empty();
        for (var i = 0; i < students.length; i++) {
            student = students[i];
            var htmlText = '';
            htmlText +='<tr class="student">';
            htmlText +='<td class="name-col">'+student.name+'</td>';
            for (var j = 0; j < student.attendance.length; j++) {
                //var htmlText = '';
                htmlText += '<td class="attend-col'+j+'" id="'+student.identity+'"><input class="checkbox" type="checkbox" ></td>';
                //$('.data').append(htmlText);
            };
            htmlText +='<td class="test" id="'+student.identity+'">0</td></tr>';
            $('.data').append(htmlText);
            for (var j = 0; j < student.attendance.length; j++) {
                var input = $('.attend-col'+j+'#'+student.identity+' > input');
                input.prop('checked',student.attendance[j]);
                input.click((function(copyOfStudent, copyOfJ){
                    return function(){
                        octopus.updateCheckbox(copyOfStudent, copyOfJ, $(this).prop('checked'));
                    };
                })(student,j));
            };
            var count = student.attendance.length - student.countAttendance();
            $('td.test[id='+student.identity+']' ).text(count); //???

        };
    }


};

$(octopus.init());

