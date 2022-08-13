$(document).ready(function () {
  if (!localStorage.getItem("user")) {
    alert("로그인 후 이용해주세요");
    location.href = "../";
    return;
  }

  addEvents();
  getChatData();
});

function getChatData() {
  $.ajax({
    url: "http://localhost:3000/getMessage",
    success: ({ data }) => {
      let html = "";

      data.forEach(({ id, email, message }, index) => {
        html += `<div id="message-${id}" class="message" >`;
        html += `<p>${email} : ${message}</p>`;
        html += "</div>";
      });

      $(".message-box").append(html);
    },
  });
}

/**
 *
 */
function makeMessage({ email, id, message }) {
  let html = `<div id="message-${id}" class="message" >`;
  html += `<p>${email} : ${message}</p>`;
  html += "</div>";

  $(".message-box").append(html);
}

/**
 * 이벤트만 들어가는 함수
 */
function addEvents() {
  /**
   * 메시지 추가 이벤트 함수
   */
  $(".message-input > button").on("click", function (event) {
    const loginUser = JSON.parse(localStorage.getItem("user"));
    const target = $(event.target);
    const message = target.prev().val();

    if (message === "") {
      alert("메시지를 입력해주세요");
      return;
    }

    $.ajax({
      url: "http://localhost:3000/addMessage",
      data: {
        message: message,
        id: loginUser.id,
        email: loginUser.email,
      },
      success: ({ code, data }) => {
        if (code === "success") {
          makeMessage(data);
        }
      },
    });
  });
}
