// select employee btn
// For modal
let employee = document.getElementById("add");
let modal = document.querySelector(".new-modal");
let closeModal = document.querySelector(".close");
let from = document.getElementById("from");
let input = from.querySelectorAll("input");

employee.addEventListener("click", () => {
  modal.style.display = "block";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
});
// Modal code end

// All Global variable start
let userDate = [];
let idN = document.getElementById("idn");
let fName = document.getElementById("f-name");
let lName = document.getElementById("l-name");
let mail = document.getElementById("mail");
let code = document.getElementById("code");
let job = document.getElementById("job");
let reg = document.getElementById("reg");
let up = document.getElementById("up");
let imgUrl;
// let profile = imgUrl;

// global variable end

// Registration from code
reg.onclick = function (e) {
  e.preventDefault();
  registationData();
  localData();
  from.reset("");
  closeModal.click();
};

// data parse From local storage
if (localStorage.getItem("userData") != null) {
  userDate = JSON.parse(localStorage.getItem("userData"));
}

function registationData() {
  userDate.push({
    id: idN.value,
    firstName: fName.value,
    lastName: lName.value,
    email: mail.value,
    code: code.value,
    job: job.value,
    profile: imgUrl == undefined ? "images/profile.png" : imgUrl,
  });
  let stringData = JSON.stringify(userDate);
  localStorage.setItem("userData", stringData);
  swal("Good job!", "Registration Successful👍", "success", {
    button: "Done",
  });
}

// get data from localStorage
let tableInfo = document.getElementById("table-data");

const localData = () => {
  tableInfo.innerHTML = "";
  userDate.forEach((data, index) => {
    tableInfo.innerHTML += `
    <tr index="${index}">
    <td data-title="Sr No">${index + 1}</td>
    <td data-title="ID">${data.id}</td>
    <td data-title="Profile"><img src=${
      data.profile
    } height="30" width="30" /></td>
    <td data-title="First Name">${data.firstName}</td>
    <td data-title="Last Name">${data.lastName}</td>
    <td data-title="Email">${data.email}</td>
    <td data-title="Office Code">${data.code}</td>
    <td data-title="Job Title">${data.job}</td>
    <td data-title="Action">
      <button id="update" class="update-btn"><i class="lar la-edit"></i> Update</button>
      <button id="delete" class="del-btn"><i class="las la-trash"></i> Delete</button>
    </td>
  </tr>
  `;
  });

  // delete Table data
  let deleteData = document.querySelectorAll(".del-btn");
  for (let i = 0; i < deleteData.length; i++) {
    deleteData[i].onclick = function () {
      let del = this.parentElement.parentElement;
      let id = del.getAttribute("index");

      // Sweat Alert
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          userDate.splice(id, 1);
          localStorage.setItem("userData", JSON.stringify(userDate));
          del.remove();
          swal("Poof! Your Data has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your data is safe!");
        }
      });
    };
  }

  // update data
  let update = document.querySelectorAll(".update-btn");
  for (let i = 0; i < update.length; i++) {
    update[i].onclick = function () {
      let tr = this.parentElement.parentElement;
      let td = tr.getElementsByTagName("td");
      let index = tr.getAttribute("index");
      let getImg = td[2].getElementsByTagName("img");
      let getProfile = getImg[0].src;
      let id = td[1].innerHTML;
      let firstName = td[3].innerHTML;
      let lastName = td[4].innerHTML;
      let eMail = td[5].innerHTML;
      let codeNo = td[6].innerHTML;
      let title = td[7].innerHTML;
      idN.value = id;
      fName.value = firstName;
      lName.value = lastName;
      mail.value = eMail;
      code.value = codeNo;
      job.value = title;
      profileImg.src = getProfile;
      reg.disabled = true;
      up.disabled = false;
      employee.click();
      up.onclick = function () {
        userDate[index] = {
          id: idN.value,
          firstName: fName.value,
          lastName: lName.value,
          email: mail.value,
          code: code.value,
          job: job.value,
          profile: uploadImg.value == "" ? profileImg.src : imgUrl,
        };
        localStorage.setItem("userData", JSON.stringify(userDate));
      };
    };
  }
};
localData();

// image processing
let profileImg = document.getElementById("por-img");
let uploadImg = document.getElementById("upload-img");

uploadImg.onchange = function () {
  if (uploadImg.files[0].size < 100000) {
    let readFile = new FileReader();
    readFile.onload = function (e) {
      imgUrl = e.target.result;
      profileImg.src = imgUrl;
    };
    readFile.readAsDataURL(uploadImg.files[0]);
  } else {
    alert("File size is too long😲");
  }
};

// Search filter data
let searchFeild = document.getElementById("search");
searchFeild.oninput = function () {
  searchData();
};

function searchData() {
  let tr = tableInfo.querySelectorAll("tr");
  let filter = searchFeild.value.toLowerCase();
  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[1];
    let info = td.innerHTML;
    if (info.toLowerCase().indexOf(filter) > -1) {
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}

// clear all data
let clear = document.getElementById("filter");
let chk = document.getElementById("check");
clear.onclick = function () {
  if (chk.checked == true) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("userData");
        window.location = location.href;
        swal("Poof! Your Data has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your data is safe!");
      }
    });
  } else {
    swal("Please Check the Box", "👍", "success", {
      button: "Ok",
    });
  }
};
