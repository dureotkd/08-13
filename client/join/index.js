/*
1. 이메일 검증
2. 비밀번호 5글자 이상인지 검증
3. 비밀번호랑 재입력이랑 같은지 확인 
검증 끝나면 => 가입하기 활성화
*/

const confirm = {
  email: false,
  password: false,
  passwordConfirm: false,
};

$(document).ready(function () {
  addEvents();
});

/*
기존 자바스립트에 있는 함수 불러오기
1. import, export => 자바스크립트할때 배울 거임
2. script 불러오기(common의 함수 정의) => html에서 스크립트 src로 불러오기
*/

/**
 * 구조분해할당
 *
 * ==== [브라우저가 다르면 공유가 안됨] ====
 * 문자열 밖에 안들어감. [배열,객체,함수]
 * 쿠키,localStorage : 웹안에 저장하는 데이터 개념 (브라우저 바뀌면 초기화)
 * 쿠키 : 시간이 유한해요 값 유효기간을 설정할수 있지만 무제한은 안된다
 * localStorage : 사라지지않음 (용량이 좀 더 높음)
 */
function autoLogin(params) {
  /**
   * JSON.stringify : 객체나 배열을 문자열로 변환
   * JSON.parse : 문자열을 객체나 배열로 반환
   */
  localStorage.setItem("user", JSON.stringify(params));
}

// 이벤트 연결 함수
function addEvents() {
  $(".ant-input").on("keyup", function (event) {
    const target = $(event.target);
    const targetName = target.attr("name");

    const email = $("input[name=email]").val();
    const password = $("input[name=password]").val();
    const passwordconfirm = $("input[name=passwordConfirm]").val();
    // 이메일 정규 표현식
    const regExp = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;

    switch (targetName) {
      // 이메일 검증
      case "email":
        if (regExp.test(email) === false) {
          makeWarning(target, "잘못된 이메일 양식입니다.");
          confirm.email = false;
        } else {
          removeWarning(target);
          confirm.email = true;
        }

        break;

      // 비밀번호 5글자 이상인지 검증
      case "password":
        if (password.length < 5) {
          makeWarning(target, "잘못된 비밀번호 양식입니다.");
          confirm.password = false;
        } else {
          removeWarning(target);
          confirm.password = true;
        }

        break;

      // 비밀번호랑 재입력이랑 같은지 확인
      case "passwordConfirm":
        if (password === passwordconfirm) {
          removeWarning(target);
          confirm.passwordconfirm = true;
        } else {
          makeWarning(target, "비밀번호와 일치 하지 않습니다.");
          confirm.passwordconfirm = false;
        }

        break;
    }
    // 검증 끝나면 => 가입하기 활성화
    if (confirm.email && confirm.password && confirm.passwordconfirm) {
      $(".join-success-btn").attr("disabled", false);
    } else {
      $(".join-success-btn").attr("disabled", true);
    }
  });

  // 가입 하기 기능 활성화(서버)
  $(".join-success-btn").on("click", function () {
    // const email = $('input[name=email]').val();
    // const password = $('input[name=password]').val();
    // const passwordconfirm = $('input[name=password-confirm]').val();

    // 위에 것이 비 효율적이라 한번에 가져오는 방법
    const params = $("#join-form").serialize();

    $.ajax({
      url: `http://localhost:3000/join?${params}`,
      // 아래 두개는 기본 값이라 입력 안해도 됨
      method: "get",
      dataType: "json",
      success: ({ code, msg, data }) => {
        /**
         * resposne
         * : code
         * : msg
         * : data
         */
        alert(msg);
        if (code === "success") {
          autoLogin(data);
        }
      },
      error: () => {},
      finally: () => {},
    });
  });
}
