function EmployeeList() {
    this.arr = [];

    /**
     * addEmployee
     *  - Lấy giá trị từ input nhập vào đưa vào object > push vào mảng
     */
    this.addEmp = function (nv) {
        this.arr.push(nv);
    };


    /**
     * Tìm vị trí index khi onclick
     *  - Duyệt mảng arr, i chạy từ 0 đến length
     *  - user === user onclick > xuất ra i
     */
    this.searchIndexEmp = function (user) {
        var index = -1;

        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.user === user) {
                index = i;
                break;
            }
        }
        return index;
    };

    /**
     * Delete Employee
     *  - Lấy vị trí index
     *  - Nếu index khác -1, thì xóa giá trị mảng tại index đó.
     * 
     */
    this.deleteDeta = function (user) {
        var index = this.searchIndexEmp(user);
        if (index !== -1) {
            this.arr.splice(index, 1);
        };
    };

    /**
     * Lấy thông tin user từ vị trí index
     */
    this.getInfoEmp = function (nv) {
        var index = this.searchIndexEmp(nv);
        if (index !== -1) {
            return this.arr[index];
        }
    }

    this.UpdateEmp = function (nv) {
        // console.log(nv.user);
        var index = this.searchIndexEmp(nv.user);
        // console.log(index);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };

    this.searchEmp = function (keyword) {
        var search = [];

        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            //chuyển tenSV về chự thường
            var rateLowerCase = nv.rate.toLowerCase();
            var keywordLowerCase = keyword.toLowerCase();
            if (rateLowerCase.indexOf(keywordLowerCase) !== -1) {
                search.push(nv);
            }
        }

        return search;
    };
}