/*
npm : node package(상자) manager(관리자)
-> jquery
서버 키는 방법 = > npm start
*/

// 자바스크립트
/*
  1. 탬플릿 리터럴(Template literals)
  2. 화살표 함수(arrow function expression)
  3. 매개변수 기본값(default parameter value)
  4. 스페이드 문법(Spread)
  5. 배열 디스트럭처링(Array destructuring)
  6. 자바스크립트 대표 반복문
        (map, forEach, filter, find, findindex, for of, for in)
*/

const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());

const DB = {
  user: [
    {
      id: 1,
      email: "kthkmj00@gmail.com",
      password: "12345",
    },
    {
      id: 2,
      email: "bird8696@naver.com",
      password: "123456",
    },
  ],
  chat: [],
};

app.get("/", function (req, res) {
  res.send("안녕하세요");
});

app.get("/login", function (req, res) {
  const { email, password } = req.query;

  const result = {
    code: "fail",
    msg: "입력한 값이 일치하지 않습니다.",
  };

  const userList = DB.user;

  userList.forEach((value, index) => {
    if (email === value.email && password === value.password) {
      result.code = "success";
      result.msg = "로그인 되었습니다.";
    }
  });
  res.send(result);
});

app.get("/join", function (req, res) {
  //DB => 데이터베이스 (영구적으로 데이터를 저장하는 공간)

  // 구조 분해 할당으로 변환
  const { email, password, passwordConfirm } = req.query;

  //   const email = params.email;
  //   const password = params.password;
  //   const passwordconfirm = params["password-confirm"];

  const userList = DB.user;

  const result = {
    code: "success",
    msg: "회원가입이 되었습니다.",
    data: {},
  };

  userList.forEach((value, index) => {
    if (value.email === email) {
      result.code = "fail";
      result.msg = "중복 이메일입니다.";
    }
  });

  if (result.code === "fail") {
    res.send(result);
    return;
  }

  const maxArray = [];

  // 회원 가입 시켜줌

  /**
   * 맥스 아이디 값을 가져오기 위한 반복문
   */
  userList.forEach(({ id }, index) => {
    maxArray.push(id);
  });

  let max = Math.max(...maxArray);
  const newId = max + 1;

  DB.user.push({
    id: newId,
    email: email,
    password: password,
  });

  result.data = {
    id: newId,
    email: email,
  };

  // 1. 이메일 중복되면 회원 가입 안됨
  // 2. 가입이 되면 DB.user 배열에 쌓아주면 됨
  res.send({
    code: "zzz",
  });
});

app.get("/getMessage", function (req, res) {
  res.send({
    code: "success",
    data: DB.chat,
  });
});

app.get("/addMessage", function (req, res) {
  const { message, email, id } = req.query;

  const data = {
    message: message,
    email: email,
    id: id,
  };

  DB.chat.push(data);

  res.send({
    code: "success",
    msg: "메시지 전송 완료",
    data: data,
  });
});

app.listen(3000, function () {
  console.log("Start Node.js Server !!");
});
