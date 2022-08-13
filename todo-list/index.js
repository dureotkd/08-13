$(document).ready(function () {
  addEvents();
});

function deleteTodo(number) {
  $(`.todo-${number}`).remove();
}

function completeTodo(number) {
  /**
   * complete 클래스가 있으면 => 삭제
   * complete 클래스가 없으면 => complete 클래스를 넣어줌
   */
  $(`.todo-${number} > .flex-wrap`).toggleClass("complete");
}

function addEvents() {
  $("#todo-form").on("submit", function (event) {
    // 페이지 새로고침을 막는것이다.
    event.preventDefault();

    const todoValue = $("input[type=text]").val();
    const todoNumber = $(".todo-box > .todo").length + 1;

    /**
     * 클래스를 따로 안주고 구현해보세요
     * event.target 구현한번해보세요
     */
    let html = `
    <div class="todo todo-${todoNumber}">
        <div class="flex-wrap" onclick="completeTodo('${todoNumber}')">
            <span style='margin-right:5px;'>${todoNumber})</span> <span>${todoValue}</span>
        </div>
        <button type="button" class="delete" onclick="deleteTodo('${Number(
          todoNumber
        )}')">삭제</button>
    </div>`;

    $(".todo-box").append(html);
  });

  $("#clear-btn").on("click", function () {
    $(".todo").remove();
  });
}
