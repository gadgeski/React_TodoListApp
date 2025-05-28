import React, { useState } from "react";
import "./App.css"; // 必要に応じてCSSファイルを読み込みます

function App() {
  // ① TODOリストの状態を管理する `todos` ステート
  // 各TODOは { id: number, text: string, completed: boolean } のオブジェクト
  const [todos, setTodos] = useState([]);
  // ② 新しく入力されるTODOのテキストを管理する `newTodoText` ステート
  const [newTodoText, setNewTodoText] = useState("");

  // ③ TODOを追加する関数
  const addTodo = (e) => {
    e.preventDefault(); // フォームのデフォルトの送信動作を防ぐ
    if (newTodoText.trim() === "") {
      return; // 入力が空の場合は何もしない
    }

    const newTodo = {
      // ユニークなIDを生成（今回は簡易的にタイムスタンプを使用）
      id: Date.now(),
      text: newTodoText,
      completed: false, // 初期状態では未完了
    };

    // 既存のtodos配列に新しいTODOを追加してステートを更新
    setTodos([...todos, newTodo]);
    setNewTodoText(""); // 入力フィールドをクリア
  };

  // ④ TODOの完了状態を切り替える関数
  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // ⑤ TODOを削除する関数
  const deleteTodo = (id) => {
    // 削除したいTODO以外のものだけをフィルタリングして新しい配列を作成
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <h1>TODOリスト</h1>

      {/* TODO追加フォーム */}
      <form onSubmit={addTodo}>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)} // 入力値が変更されるたびにステートを更新
          placeholder="新しいTODOを入力"
        />
        <button type="submit">追加</button>
      </form>

      {/* TODOリストの表示 */}
      <ul>
        {/* todos配列をマップして各TODOアイテムをレンダリング */}
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
            <button onClick={() => toggleComplete(todo.id)}>
              {todo.completed ? "未完了にする" : "完了"}
            </button>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
        {todos.length === 0 && <p>TODOはありません。</p>}
      </ul>
    </div>
  );
}

export default App;
