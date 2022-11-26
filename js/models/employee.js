function Employee(_user, _name, _eMail, _passWord, _workDay, _basicSalaries, _positions, _workTime,) {

    // property
    this.user = _user;
    this.name = _name;
    this.eMail = _eMail;
    this.passWord = _passWord;
    this.workDay = _workDay;
    this.basicSalaries = _basicSalaries;
    this.positions = _positions;
    this.workTime = _workTime;

    this.toTalSals = 0;
    this.rate = "";

    //method
    // 5. Tính tổng lương, dựa theo chức vụ (employee.js)
    this.totalSalaries = function () {
        switch (this.positions) {
            case "GD":
                this.toTalSals = (parseInt(this.basicSalaries)) * 3;
                break;
            case "TP":
                this.toTalSals = (parseInt(this.basicSalaries)) * 2;
                break;

            case "NV":
                this.toTalSals = (parseInt(this.basicSalaries)) * 1;
                break;

            default:
                break;
        }
    }

    // 6. Xếp loại nhân viên, dựa theo giờ làm (employee.js)
    this.ratings = function () {
        if (192 <= parseInt(this.workTime)) {
            this.rate = "Nhân viên xuất sắc";
            return this.rate;
        } else if (176 <= parseInt(this.workTime)) {
            this.rate = "Nhân viên giỏi";
            return this.rate;
        } else if (160 <= parseInt(this.workTime)) {
            this.rate = "Nhân viên khá";
            return this.rate;
        }
        this.rate = "Nhân viên trung bình";
    }
}