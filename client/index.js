const confirm = {
  email: false,
  password: false,
};

$(document).ready(function () {
  addEvents();
});

/*
이벤트 연결 함수
 */

function addEvents() {
  $(".ant-input").on("keyup", function (event) {
    const target = $(event.target);
    const targetName = target.attr("name");

    const email = $("input[name=email]").val();
    const password = $("input[name=password]").val();
    /* 이메일 정규 표현식 */
    const regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;

    /*
    ======================================
    1. 이메일 입력을 받고 있는지 비밀번호를 받는건지 구분 해주기

    ======================================
    1. 이메일 양식 검증 @ .
    2. 비밀번호 길이가 5글자 이상인지 확인
    ======================================
    */

    switch (targetName) {
      case "email":
        /*
        targetName : 이메일이면 여기가 실행됩니다.
        */

        if (regExp.test(email) === false) {
          makeWarning(target, "잘못된 이메일 양식입니다.");
          confirm.email = false;
        } else {
          removeWarning(target);
          confirm.email = true;
        }

        break;

      case "password":
        /*
        targetName : 비밀번호이면 여기가 실행됩니다.
        */

        if (password.length < 5) {
          /*
        비밀번호 길이가 5보다 작으면 여기가 실행됩니다.
        */
          makeWarning(target, "잘못된 비밀번호 양식입니다.");
          confirm.password = false;
        } else {
          /*
        비밀번호 길이가 5보다 크면 여기가 실행됩니다.
        */
          removeWarning(target);
          confirm.password = true;
        }

        break;
    }

    // if (confirm.email && confirm.password) {
    //   $(".login-btn").attr("disabled", false);
    // } else {
    //   $(".login-btn").attr("disabled", true);
    // }
  });

  /*
  로그인 이벤트
  1. 이메일 값, 비밀번호 값 가져오기
  2. ajax를 이용해서 Node.js 서버에 데이터 보내기
  */
  $(".login-btn").on("click", function () {
    const params = $("#login-form").serialize();

    $.ajax({
        url: `http://localhost:3000/login?${params}`,
        success : ({code, msg}) => {
            alert(msg);
            if(code === 'success') {

            }
        },
        error : () => {

        },
        finally : () => {

        }
    })
    const paramsArray = $("#login-form").serializeArray();
  });
}

/*
로그인 이벤트
*/
