function Validation() {
    this.kiemTraRong = function (value, errorId, mess) {

        if (value === "") {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        } else {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }
    }

    this.kiemTraKySo = function (value, errorId, mess) {
        var letter =
            /^[0-9]+$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraEmail = function (value, errorId, mess) {
        var letter = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraMK = function (value, errorId, mess) {
        var letter = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraNgay = function (value, errorId, mess) {

        var letter = /^ (((0[1 - 9] | [12]\d| 3[01]) \/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))))$/;

        // var letter = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        // var letter = /^ (((0[13 - 9] | 1[012])[\/\-]?(0[1-9]|[12][0-9]|30)|(0[13578]|1[02])[\/\-]?31|02[\/\-]?(0[1-9]|1[0-9]|2[0-8]))[\/\-]?[0-9]{4}|02[\/\-]?29[\/\-]?([0-9]{2}(([2468][048]|[02468][48])|[13579][26])|([13579][26]|[02468][048]|0[0-9]|1[0-6])00))$/;
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraSelect = function (idSelect, errorId, mess) {
        if (getEle(idSelect).selectedIndex !== 0) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };


    this.kiemTraKyTu = function (value, errorId, mess) {
        var letter = "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$";
        if (value.match(letter)) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraDoDaiKyTu = function (value, errorId, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraGiaTri = function (value, errorId, mess, min, max) {
        if (min <= value && value <= max) {
            getEle(errorId).innerHTML = "";
            getEle(errorId).style.display = "none";
            return true;
        }

        getEle(errorId).innerHTML = mess;
        getEle(errorId).style.display = "block";
        return false;
    };

    this.kiemTraTrungUser = function (value, errorId, mess, data) {
        var exist = false;
        for (var i = 0; i < data.length; i++) {
            var nv = data[i];
            if (nv.user === value) {
                exist = true;
                break;
            }
        }

        if (exist) {
            getEle(errorId).innerHTML = mess;
            getEle(errorId).style.display = "block";
            return false;
        }

        getEle(errorId).innerHTML = "";
        getEle(errorId).style.display = "none";
        return true;
    };

}