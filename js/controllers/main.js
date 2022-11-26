// GLOBAL

var empList = new EmployeeList();
var validation = new Validation();


getLocalStorage();

function getEle(id) {
    return document.getElementById(id);
}

// Reset form Input khi click nút Thêm
function rsGiaoDien() {
    getEle("tknv").value = "";
    getEle("tknv").disabled = false;

    getEle("name").value = "";
    getEle("email").value = "";
    getEle("password").value = "";
    getEle("datepicker").value = "";
    getEle("luongCB").value = "";
    getEle("chucvu").value = "Chọn chức vụ";
    getEle("gioLam").value = "";

    //#btnCapNhat
    getEle("btnCapNhat").style.display = "none";
    //#btnThemNV
    getEle("btnThemNV").style.display = "inline-block";
}

/**
 * Yêu cầu: 
 * 1. In ra dsnv
 * 2. Add nhân viên
 * 3. Tạo đối tượng nhân viên
 * 4. Validation
 * 5. Tính tổng lương, dựa theo chức vụ (employee.js)
 * 6. Xếp loại nhân viên, dựa theo giờ làm (employee.js)
 * 7. Xóa nhân viên
 * 8. Cập nhật nhân viên
 * 9. Tìm kiếm nhân viên, dựa vào xếp loại.
 */

/**
 * Get Info Employee
 * - DOM tới các id
 * - Tạo đối tượng NV
 * - Sau đó trả về đối tượng
 * 
 */
function getInfo(isAdd) {
    var user = getEle("tknv").value;
    getEle("tknv").disabled = false;

    var name = getEle("name").value;
    var eMail = getEle("email").value;
    var passWord = getEle("password").value;
    var workDay = getEle("datepicker").value;
    var basicSalaries = getEle("luongCB").value;
    var positions = getEle("chucvu").value;
    var workTime = getEle("gioLam").value;
    // console.log(user, name, eMail, passWord, workDay, basicSalaries, positions, workTime);

    //flag: cờ
    var isValid = true; //hợp lệ

    //4.  Validation

    if (isAdd) {
        // User
        isValid &=
            validation.kiemTraRong(user, "tbTKNV", "(*) Vui lòng nhập Tài khoản nhân viên") &&
            validation.kiemTraKySo(user, "tbTKNV", "(*) Vui lòng nhập Tài khoản là số") &&
            validation.kiemTraDoDaiKyTu(user, "tbTKNV", "(*) Vui lòng nhập Tài khoản từ 4 đến 6 số", 4, 6) &&
            validation.kiemTraTrungUser(user, "tbTKNV", "(*) Vui lòng nhập User khác", empList.arr);

    }

    // Name
    isValid &=
        validation.kiemTraRong(name, "tbTen", "(*) Vui lòng nhập Họ và tên") &&
        validation.kiemTraKyTu(
            name,
            "tbTen",
            "(*) Vui long nhập tên đúng"
        );

    // Email
    isValid &=
        validation.kiemTraRong(eMail, "tbEmail", "(*) Vui lòng nhập Email") &&
        validation.kiemTraEmail(eMail, "tbEmail", "(*) Vui lòng nhập Email đúng định dạng");

    // Mật Khẩu
    isValid &=
        validation.kiemTraRong(passWord, "tbMatKhau", "(*) Vui lòng nhập Mật khẩu") &&
        validation.kiemTraDoDaiKyTu(passWord, "tbMatKhau", "(*) Vui lòng nhập Mật khẩu từ 6-10 ký tự", 6, 10) &&
        validation.kiemTraMK(passWord, "tbMatKhau", "(*) Mật khẩu phải có ký tự đặc biệt, số và chữ in hoa");


    // Ngày làm
    isValid &=
        validation.kiemTraRong(workDay, "tbNgay", "(*) Vui lòng nhập Ngày làm");
    //  &&
    // validation.kiemTraNgay(workDay, "tbNgay", "(*) Định dạng ngày là mm/dd/yyyy")

    // Lương cơ bản
    isValid &=
        validation.kiemTraRong(basicSalaries, "tbLuongCB", "(*) Vui lòng Lương cơ bản") &&
        validation.kiemTraGiaTri(basicSalaries, "tbLuongCB", "(*) Vui lòng nhập Lương cơ bản từ 1 000 000 đến 20 000 000", 1000000, 20000000);

    // Chọn chức vụ
    isValid &=
        validation.kiemTraSelect("chucvu", "tbChucVu", "(*) Vui lòng chọn Chức vụ của bạn");

    // Giờ làm
    isValid &=
        validation.kiemTraRong(workTime, "tbGiolam", "(*) Vui lòng nhập Giờ làm") &&
        validation.kiemTraGiaTri(workTime, "tbGiolam", "(*) Vui lòng nhập Giờ làm trong tháng 80-200", 80, 200);

    if (!isValid) return;

    // 3. Tạo đối tượng nhân viên
    var nv = new Employee(user, name, eMail, passWord, workDay, basicSalaries, positions, workTime);
    // Gọi method của đối tượng
    nv.totalSalaries();
    nv.ratings();
    // console.log(nv);
    return nv;
}

/**
 * 2. Add nhân viên
 * Lấy 
 */
getEle("btnThemNV").onclick = function () {
    var nv = getInfo(true);
    if (nv) {
        // console.log(nv);
        empList.addEmp(nv);
        // console.log(empList);
        renderTable(empList.arr);
        setLocalStorage();
    }
}

/**
 * 1. In ra dsnv
 * RenderTable
 * Đầu vào: lấy dữ liệu từ property (user, name, email, wordDay, positions), method(toTalSals, rate)
 * Xử lý: 
 *      Tạo bảng có 8 cột tương ứng vào trên HTML
 *          + Cột 8 thêm vào 2 nút Edit và Delete sử dụng trong yêu cầu 7 và 8;
 *      Tạo dòng mỗi lần bấm Add
 * Đầu ra: in bảng ra HTML
 */
function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nv = data[i];
        // Tạo 2 nút Edit và Delete
        content += `
         <tr>
            <td>${nv.user}</td>
            <td>${nv.name}</td>
            <td>${nv.eMail}</td>
            <td>${nv.workDay}</td>
            <td>${nv.positions}</td>
            <td>${nv.toTalSals}</td>
            <td>${nv.rate}</td>
            <td>
            <button class="btn btn-warning" onclick="editEmp('${nv.user}')" data-toggle="modal" data-target="#myModal">Edit</button>
            <button class="btn btn-danger" onclick="deleteEmp('${nv.user}')">Delete</button>
            </td>
        </tr>
    `;
    }
    getEle("tableDanhSach").innerHTML = content;
}

// 7. Xóa nhân viên
function deleteEmp(user) {
    // console.log(user);
    empList.deleteDeta(user);
    // console.log(empList.arr);
    renderTable(empList.arr);
    setLocalStorage();
}

//8. Cập nhật nhân viên
/** 
 * Click Edit 
 *  - Lấy thông tin của user
 *  - Dom giá trị tới các input, hiển thị các giá trị
 *  - Ẩn nút thêm người dùng, Hiện nút cập nhật
 */
function editEmp(user) {
    var nv = empList.getInfoEmp(user);
    // console.log(nv);
    if (nv) {
        getEle("tknv").value = nv.user;
        getEle("tknv").disabled = true;

        getEle("name").value = nv.name;
        getEle("email").value = nv.eMail;
        getEle("password").value = nv.passWord;
        getEle("datepicker").value = nv.workDay;
        getEle("luongCB").value = nv.basicSalaries;
        getEle("chucvu").value = nv.positions;
        getEle("gioLam").value = nv.workTime;
    };
    getEle("btnCapNhat").style.display = "inline-block";
    getEle("btnThemNV").style.display = "none";
};

/** Click Update
 * 
*/

getEle("btnCapNhat").addEventListener("click", function () {

    var nv = getInfo(false);
    // console.log(nv);
    empList.UpdateEmp(nv);

    renderTable(empList.arr);
    setLocalStorage();
    rsGiaoDien();
});

//  9. Tìm kiếm nhân viên, dựa vào xếp loại.
getEle("searchName").addEventListener("keyup", function () {
    var keyword = getEle("searchName").value;
    var search = empList.searchEmp(keyword);
    renderTable(search);
});



/**
 * Lưu các dữ liệu đã thêm
 * SetLocalStorage và getLocalStorage
 * SetLocalStorage: chuyển dữ liệu JSON thành kiểu string và lưu về LocalStorage. Set mỗi khi nhấn nút Thêm
 * GetLocalStorage: Lấy dữ liệu từ LocalStorage dạng String, và convert về JSON, sau đó render ra UX/UI. Get mỗi khi refresh web
 */
function setLocalStorage() {
    var dataString = JSON.stringify(empList.arr);
    localStorage.setItem("empList", dataString);
};
function getLocalStorage() {
    if (localStorage.getItem("empList")) {
        var dataString = localStorage.getItem("empList");
        empList.arr = JSON.parse(dataString);
        renderTable(empList.arr)
    }
};

